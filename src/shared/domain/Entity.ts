import { EntityId } from "./EntityId";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export class Entity<T> {
  private readonly _props: T;
  private _id: EntityId;

  constructor(props: T, id?: string) {
    this._id = id ? new EntityId(id) : new EntityId();
    this._props = props;
  }

  get id(): string {
    return this._id.toString();
  }
  get props() {
    return this._props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}
