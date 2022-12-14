import { MongoDbAdapter } from '.';
import { AP } from 'activitypub-core-types';

export async function getPrivateKey(this: MongoDbAdapter, actor: AP.Actor) {
  if (!actor.preferredUsername) {
    throw new Error('Actor has no `preferredUsername`.');
  }

  const userId = await this.findStringIdByValue(
    'username',
    actor.preferredUsername,
  );

  const privateKey = await this.findStringValueById(
    'private-key',
    userId,
  );

  if (!privateKey) {
    throw new Error('Private key not found for this Actor.');
  }

  return privateKey;
}
