export * as AP from './activitypub';

export type Auth = {
  createUser: Function;
  getUserIdByToken: Function;
};

export type Database = {
  expandCollection: Function;
  expandEntity: Function;
  fetchEntityById: Function;
  findAll: Function;
  findEntityById: Function;
  findOne: Function;
  findStringIdByValue: Function;
  findStringValueById: Function;
  getActorByUserId: Function;
  getCollectionItems: Function;
  insertItem: Function;
  removeItem: Function;
  insertOrderedItem: Function;
  removeOrderedItem: Function;
  queryById: Function;
  saveEntity: Function;
  saveString: Function;
};

export interface DatabaseService {
  connect(config?: { [key: string]: unknown }): Promise<Database>;
}