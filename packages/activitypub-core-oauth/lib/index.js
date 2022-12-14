"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcRouteHandler = void 0;
const oidc_provider_1 = require("oidc-provider");
const activitypub_core_utilities_1 = require("activitypub-core-utilities");
const get_body_1 = require("get-body");
const oidcRouteHandler = ({ client_id, client_secret, redirect_uris, adapters }) => {
    const client = {
        client_id,
        client_secret,
        redirect_uris,
        response_types: ['id_token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'none',
    };
    const configuration = {
        clients: [
            client,
        ],
        pkce: {
            methods: [
                'S256',
            ],
            required: () => false,
        },
        claims: {
            openid: ['sub'],
            email: ['email', 'email_verified'],
        },
        interactions: {
            url(ctx, interaction) {
                return `/interaction/${interaction.uid}`;
            },
        },
        features: {
            devInteractions: { enabled: false },
        },
        async findAccount(ctx, id) {
            const actor = await adapters.db.getActorByUserId(id);
            if (!actor) {
                return undefined;
            }
            const email = await adapters.db.findStringValueById('account', id);
            if (!email) {
                return undefined;
            }
            return {
                accountId: id,
                async claims() {
                    return {
                        sub: id,
                        email,
                        email_verified: true,
                    };
                },
            };
        },
    };
    const oidc = new oidc_provider_1.Provider(activitypub_core_utilities_1.LOCAL_DOMAIN, configuration);
    return {
        oidc: oidc.callback(),
        interaction: async (req, res) => {
            try {
                const details = await oidc.interactionDetails(req, res);
                const { uid, prompt, } = details;
                if (prompt.name === 'login') {
                    res.statusCode = 200;
                    res.setHeader('Accept', 'text/html');
                    res.write(`
            <!doctype html>
            <html>
              <body>
                <h1>Sign In</h1>
                <textarea>${JSON.stringify(prompt.details)}</textarea>
                <form method="POST" action="/interaction/${uid}/login">
                  <label>
                    <span>
                      Email
                    </span>
                    <input type="email" name="email" />
                  </label>
                  <label>
                    <span>
                      Password
                    </span>
                    <input type="password" name="password" />
                  </label>
                  <button type="submit">
                    Submit
                  </button>
                </form>
              </body>
            </html>
          `);
                    res.end();
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Accept', 'text/html');
                res.write(`
          <!doctype html>
          <html>
            <body>
              <h1>Authorize</h1>
              <form autocomplete="off" action="/interaction/${uid}/confirm" method="post">
                <button autofocus type="submit">
                  Continue
                </button>
              </form>
            </body>
          </html>
        `);
                res.end();
            }
            catch (err) {
                res.statusCode = 500;
                res.setHeader('Accept', 'text/html');
                res.write(JSON.stringify(err));
                res.end();
            }
        },
        abort: async (req, res) => {
            try {
                const result = {
                    error: 'access_denied',
                    error_description: 'End-User aborted interaction',
                };
                await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
            }
            catch (err) {
                res.statusCode = 500;
                res.setHeader('Accept', 'text/html');
                res.write(JSON.stringify(err));
                res.end();
            }
        },
        confirm: async (req, res) => {
            try {
                const interactionDetails = await oidc.interactionDetails(req, res);
                const params = interactionDetails.params;
                const details = interactionDetails.prompt.details;
                const accountId = interactionDetails.session?.accountId;
                const clientId = params.clientId;
                let { grantId } = interactionDetails;
                let grant;
                if (grantId) {
                    grant = await oidc.Grant.find(grantId);
                }
                else {
                    grant = new oidc.Grant({
                        accountId,
                        clientId,
                    });
                }
                if (details.missingOIDCScope) {
                    grant.addOIDCScope(Object.values(details.missingOIDCScope).join(' '));
                }
                if (details.missingOIDCClaims) {
                    grant.addOIDCClaims(details.missingOIDCClaims);
                }
                if (details.missingResourceScopes) {
                    for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
                        grant.addResourceScope(indicator, scopes.joi(' '));
                    }
                }
                grantId = await grant.save();
                const consent = {};
                if (!interactionDetails.grantId) {
                    consent.grantId = grantId;
                }
                const result = { consent };
                await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
            }
            catch (err) {
                res.statusCode = 500;
                res.setHeader('Accept', 'text/html');
                res.write(JSON.stringify(err));
                res.end();
            }
        },
        login: async (req, res) => {
            console.log('LOGIN!');
            try {
                const body = await (0, get_body_1.parse)(req, req.headers);
                console.log('body', body);
                const details = await oidc.interactionDetails(req, res);
                console.log(details);
                const { uid, prompt } = await oidc.interactionDetails(req, res);
                console.log('uid', uid);
                const authenticate = async function authenticate(email, password) {
                    try {
                        const id = await adapters.db.findStringIdByValue('account', email);
                        const isAuthenticated = await adapters.auth.authenticatePassword(email, password);
                        if (!isAuthenticated) {
                            return undefined;
                        }
                        console.log('id', id);
                        return id;
                    }
                    catch (err) {
                        return undefined;
                    }
                };
                const accountId = await authenticate(body.email, body.password);
                if (!accountId) {
                    res.statusCode = 200;
                    res.setHeader('Accept', 'text/html');
                    res.write(`
            <!doctype html>
            <html>
              <body>
                <h1>Sign In</h1>
                <p>Invalid email or password!</p>
                <textarea>${JSON.stringify(prompt.details)}</textarea>
                <form method="post" action="/interaction/${uid}/login">
                  <label>
                    <span>
                      Email
                    </span>
                    <input type="email" name="email" value="${body.email}" />
                  </label>
                  <label>
                    <span>
                      Password
                    </span>
                    <input type="password" name="password" />
                  </label>
                  <button type="submit">
                    Submit
                  </button>
                </form>
              </body>
            </html>
          `);
                    res.end();
                    return;
                }
                const result = {
                    login: { accountId },
                };
                await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
            }
            catch (err) {
                console.log('failure');
                res.statusCode = 500;
                res.setHeader('Accept', 'text/html');
                res.write(JSON.stringify(err));
                res.end();
            }
        }
    };
};
exports.oidcRouteHandler = oidcRouteHandler;
//# sourceMappingURL=index.js.map