import { AP, Plugin } from 'activitypub-core-types';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Database, Auth } from 'activitypub-core-types';
import { getActor } from './getActor';
import { saveActivity } from './saveActivity';
import { parseBody } from './parseBody';
import { runSideEffects } from './runSideEffects';
import { handleAccept } from './sideEffects/accept';
import { handleAnnounce } from './sideEffects/announce';
import { handleFollow } from './sideEffects/follow';
import { handleLike } from './sideEffects/like';
import { handleCreate } from './sideEffects/create';
import { shouldForwardActivity } from './shouldForwardActivity';
import { broadcastActivity } from './broadcastActivity';
import { stringify } from 'activitypub-core-utilities';
import { DeliveryAdapter } from 'activitypub-core-delivery';

export class InboxPostEndpoint {
  req: IncomingMessage;
  res: ServerResponse;
  adapters: {
    authentication: Auth,
    database: Database,
    delivery: DeliveryAdapter
  };
  plugins?: Plugin[];

  actor: AP.Actor | null = null;
  activity: AP.Entity | null = null;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    adapters: {
      authentication: Auth,
      database: Database,
      delivery: DeliveryAdapter,
    },
    plugins?: Plugin[]
  ) {
    this.req = req;
    this.res = res;
    this.adapters = adapters;
    this.plugins = plugins;
  }

  protected getActor = getActor;
  protected runSideEffects = runSideEffects;
  protected parseBody = parseBody;
  protected saveActivity = saveActivity;
  protected broadcastActivity = broadcastActivity;
  protected shouldForwardActivity = shouldForwardActivity;

  protected handleCreate = handleCreate;
  protected handleAccept = handleAccept;
  protected handleAnnounce = handleAnnounce;
  protected handleFollow = handleFollow;
  protected handleLike = handleLike;

  public async respond() {
    try {
      await this.getActor();
      await this.parseBody();
      await this.runSideEffects();
      await this.saveActivity();
      await this.broadcastActivity();

      this.res.statusCode = 200;
      this.res.write(stringify(this.activity));
      this.res.end();
    } catch (error: unknown) {
      console.log(error);

      this.res.statusCode = 500;
      this.res.write(String(error));
      this.res.end();
    }
  }
}
