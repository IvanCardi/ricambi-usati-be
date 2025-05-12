//utils
import { FlowUtils } from "./utils/FlowUtils";
import { NonEmptyString } from "./utils/NonEmptyString";
import { PositiveNumber } from "./utils/PositiveNumber";
import { Email } from "./utils/common-classes/Email";
import { FirstName } from "./utils/common-classes/FirstName";
import { LastName } from "./utils/common-classes/LastName";
import { Address } from "./utils/common-classes/address/Address";
import { TextUtils } from "./utils/TextUtils";

import { createAddress } from "./utils/creation-functions/createAddress";

export { FlowUtils };

//infra
import { BaseController } from "./infra/BaseController";
import { Mapper } from "./infra/Mapper";

export { BaseController, Mapper };

//core
import { Error } from "./core/Error";
import { Guard } from "./core/Guard";
import { UseCase } from "./core/UseCase";

export { Error, Guard, UseCase };
//core
import { AggregateRoot } from "./domain/AggregateRoot";
import { Entity } from "./domain/Entity";
import { EventEmitterBuilder as EventEmitter } from "./domain/EventEmitter";
import { ValueObject } from "./domain/ValueObject";
import { WatchedList } from "./domain/WatchedList";

export {
  AggregateRoot,
  Entity,
  EventEmitter,
  ValueObject,
  WatchedList,
  NonEmptyString,
  PositiveNumber,
  Email,
  TextUtils,
  FirstName,
  LastName,
  Address,
  createAddress,
};
