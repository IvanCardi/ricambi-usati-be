import * as uuid from "uuid";

export class EntityId {
  private _value: string;
  constructor(id?: string) {
    this._value = id ? id : uuid.v4();
  }

  toString() {
    return this._value;
  }
}
