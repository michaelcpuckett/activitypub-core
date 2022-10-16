/// <reference types="node" />
import { AP } from 'activitypub-core-types';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Database, Auth } from 'activitypub-core-types';
import { DeliveryService } from 'activitypub-core-delivery';
export declare function inboxHandler(req: IncomingMessage, res: ServerResponse, authenticationService: Auth, databaseService: Database, deliveryService: DeliveryService): Promise<{
    props?: {
        entity?: AP.OrderedCollection | import("activitypub-core-types/lib/activitypub/Core/Link").BaseLink | import("activitypub-core-types/lib/activitypub/Core").Mention | AP.Article | AP.Event | AP.Note | AP.Page | AP.Place | AP.Relationship | AP.Tombstone | AP.Profile | AP.Document | AP.Application | AP.Service | AP.Group | AP.Organization | AP.Person | AP.Accept | AP.Follow | AP.Delete | AP.Create | AP.Arrive | AP.Add | AP.Offer | AP.Like | AP.Leave | AP.Ignore | AP.Join | AP.Reject | AP.View | AP.Update | AP.Undo | AP.Remove | AP.Read | AP.Listen | AP.Move | AP.Travel | AP.Announce | AP.Flag | AP.Dislike | AP.Question | AP.Collection | AP.CollectionPage | AP.OrderedCollectionPage;
        actor?: AP.Actor;
    };
} | {
    props: {};
}>;