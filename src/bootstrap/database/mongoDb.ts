import { mongoClientPromise } from ".";

export default class MongoDb {
  public async getCollection(collectionName: string) {
    return (await mongoClientPromise).db().collection(collectionName);
  }

  public async save(document: object, collectionName: string): Promise<void> {
    await (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .insertOne(document);
  }

  public async saveMany(
    documents: Array<object>,
    collectionName: string
  ): Promise<void> {
    await (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .insertMany(documents);
  }

  public async find(filter: object, collectionName: string): Promise<object[]> {
    return (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .find(filter)
      .toArray();
  }

  public async findManyByIds(
    ids: string[],
    collectionName: string
  ): Promise<object[]> {
    return (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .find({ _id: { $in: ids as never } })
      .toArray();
  }

  public async findOne(filter: object, collectionName: string): Promise<any> {
    return (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .findOne(filter);
  }

  public async updateOne(
    filter: object,
    updates: object,
    collectionName: string,
    arrayFilters?: Array<object>
  ) {
    await (
      await mongoClientPromise
    )
      .db()
      .collection(collectionName)
      .updateOne(filter, updates, { arrayFilters: arrayFilters ?? [] });
  }

  public async replace(
    filter: object,
    updates: object,
    collectionName: string
  ) {
    await (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .findOneAndUpdate(filter, { $set: updates }, { upsert: true });
  }

  public async updateMany(updates: Array<any>, collectionName: string) {
    const bulkParam = updates.map((u) => ({
      replaceOne: {
        filter: { _id: u._id },
        replacement: u,
      },
    }));
    await (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .bulkWrite(bulkParam);
  }

  public async deleteOne(
    filter: object,
    collectionName: string
  ): Promise<void> {
    await (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .findOneAndDelete(filter);
  }

  public async deleteMany(
    filter: object,
    collectionName: string
  ): Promise<void> {
    await (await mongoClientPromise)
      .db()
      .collection(collectionName)
      .deleteMany(filter);
  }
}

export const MONGO_DB = new MongoDb();
