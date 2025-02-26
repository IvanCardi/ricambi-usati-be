import { AggregateRoot } from "../../../../shared";
import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";
import { Car } from "./car";
import { CarPartCategory } from "./carPartCategory";
import { CarPartDescription } from "./carPartDescription";
import { CarPartName } from "./carPartName";
import { CarPartNumbers } from "./carPartNumbers";
import { CarPartStatus } from "./carPartStatus";

export type CarPartProps = {
  name: CarPartName;
  numbers: CarPartNumbers;
  photos: string[];
  car: Car;
  category: CarPartCategory;
  description: CarPartDescription;
  warranty: PositiveNumber; // in month
  price: PositiveNumber; // in €
  status: CarPartStatus; // "available", "pending payment", "sold"
  compatibleCars: string[];
  lastUpdated?: Date; // timestamp
};

export class CarPart extends AggregateRoot<CarPartProps> {
  public constructor(props: CarPartProps, id?: string) {
    super(props, id);

    this.props.photos = props.photos ?? [];
    this.props.compatibleCars = props.compatibleCars ?? [];
    this.props.lastUpdated = props.lastUpdated ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get car() {
    return this.props.car;
  }

  get numbers() {
    return this.props.numbers;
  }

  get photos() {
    return this.props.photos;
  }

  get category() {
    return this.props.category;
  }

  get description() {
    return this.props.description;
  }

  get warranty() {
    return this.props.warranty;
  }

  get price() {
    return this.props.price;
  }

  get status() {
    return this.props.status;
  }

  get compatibleCars() {
    return this.props.compatibleCars;
  }

  get lastUpdated() {
    return this.props.lastUpdated;
  }
}
