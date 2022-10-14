import { AP } from 'activitypub-core-types';
import { ActivityEntity } from './Activity';
import { ActorEntity } from './Actor';
import { CollectionEntity } from './Collection';
import { CollectionPageEntity } from './CollectionPage';
import { LinkEntity } from './Link';
import { ObjectEntity } from './Object';
import { OrderedCollectionEntity } from './OrderedCollection';
import { OrderedCollectionPageEntity } from './OrderedCollectionPage';
import React from 'react';
import { Sidebar } from '../HomePage/Sidebar';

export function EntityPage({
  entity,
  actor,
}: {
  entity: AP.Entity;
  actor?: AP.Actor;
}) {

  return (
    <html>
      <head>
        <link rel="stylesheet" href="/home.css" />
      </head>
      <body>
        <div className="root">
          <Sidebar actor={actor} />
          <Entity actor={actor} headingLevel={1} entity={entity}></Entity>
          <details>
            <summary>
              Raw
            </summary>
            <textarea defaultValue={JSON.stringify(entity)}></textarea>
          </details>
        </div>
      </body>
    </html>
  );
}

function Entity({ entity, actor, headingLevel }: { entity: AP.Entity, actor: AP.Actor; headingLevel: number; }) {
  if (entity.type === AP.CollectionTypes.COLLECTION) {
    return <CollectionEntity actor={actor} headingLevel={1} collection={entity as AP.Collection}></CollectionEntity>;
  }

  if (entity.type === AP.CollectionTypes.ORDERED_COLLECTION) {
    return <OrderedCollectionEntity headingLevel={1} collection={entity as AP.OrderedCollection}></OrderedCollectionEntity>;
  }

  if (entity.type === AP.CollectionPageTypes.COLLECTION_PAGE) {
    return <CollectionPageEntity collectionPage={entity as AP.CollectionPage}></CollectionPageEntity>;
  }

  if (entity.type === AP.CollectionPageTypes.ORDERED_COLLECTION_PAGE) {
    return <OrderedCollectionPageEntity orderedCollectionPage={entity as AP.OrderedCollectionPage}></OrderedCollectionPageEntity>;
  }

  for (const type of Object.values(AP.ActivityTypes)) {
    if (entity.type === type) {
      return <ActivityEntity headingLevel={1} activity={entity as AP.Activity}></ActivityEntity>;
    }
  }

  for (const type of Object.values(AP.ActorTypes)) {
    if (entity.type === type) {
      return <ActorEntity headingLevel={1} actor={entity as AP.Actor}></ActorEntity>
    }
  }

  for (const type of Object.values(AP.ExtendedObjectTypes)) {
    if (entity.type === type) {
      return <ObjectEntity headingLevel={1} object={entity as AP.ExtendedObject}></ObjectEntity>
    }
  }

  for (const type of Object.values(AP.LinkTypes)) {
    if (entity.type === type) {
      return <LinkEntity link={entity as AP.Link}></LinkEntity>
    }
  }

  return <>
    TODO.
  </>;
}