import { AP, assertIsApActivity, assertIsArray } from 'activitypub-core-types';
import type { AuthAdapter, DbAdapter, Plugin } from 'activitypub-core-types';
import type { IncomingMessage, ServerResponse } from 'http';
import { DeliveryAdapter } from 'activitypub-core-delivery';
import { runSideEffects } from './runSideEffects';
import { authenticateActor } from './authenticateActor';
import { wrapInActivity } from './wrapInActivity';
import { saveActivity } from './saveActivity';
import { parseBody } from './parseBody';
import { getActor } from './getActor';
import { respond } from './respond';
import { handleDelete } from './sideEffects/delete';
import { handleCreate } from './sideEffects/create';
import { handleUpdate } from './sideEffects/update';
import { handleLike } from './sideEffects/like';
import { handleAnnounce } from './sideEffects/announce';
import { handleAccept } from './sideEffects/accept';
import { handleBlock } from './sideEffects/block';
import { handleAdd } from './sideEffects/add';
import { handleUndo } from './sideEffects/undo';
import { handleRemove } from './sideEffects/remove';
import { handleUndoBlock } from './sideEffects/undo/undoBlock';
import { handleUndoFollow } from './sideEffects/undo/undoFollow';
import { handleUndoAccept } from './sideEffects/undo/undoAccept';
import { handleUndoLike } from './sideEffects/undo/undoLike';
import { handleUndoAnnounce } from './sideEffects/undo/undoAnnounce';

export class OutboxPostEndpoint {
  req: IncomingMessage;
  res: ServerResponse;
  adapters: {
    auth: AuthAdapter;
    db: DbAdapter;
    delivery: DeliveryAdapter;
  };
  plugins?: Plugin[];

  actor: AP.Actor | null = null;
  activity: AP.Entity | null = null;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    adapters: {
      auth: AuthAdapter;
      db: DbAdapter;
      delivery: DeliveryAdapter;
    },
    plugins?: Plugin[],
  ) {
    this.req = req;
    this.res = res;
    this.adapters = adapters;
    this.plugins = plugins;
  }

  protected authenticateActor = authenticateActor;
  protected getActor = getActor;
  protected runSideEffects = runSideEffects;
  protected saveActivity = saveActivity;
  protected wrapInActivity = wrapInActivity;
  protected parseBody = parseBody;
  public respond = respond;

  protected handleAdd = handleAdd;
  protected handleAnnounce = handleAnnounce;
  protected handleAccept = handleAccept;
  protected handleBlock = handleBlock;
  protected handleCreate = handleCreate;
  protected handleDelete = handleDelete;
  protected handleLike = handleLike;
  protected handleRemove = handleRemove;
  protected handleUpdate = handleUpdate;

  protected handleUndo = handleUndo;
  protected handleUndoLike = handleUndoLike;
  protected handleUndoFollow = handleUndoFollow;
  protected handleUndoAccept = handleUndoAccept;
  protected handleUndoAnnounce = handleUndoAnnounce;
  protected handleUndoBlock = handleUndoBlock;
}
