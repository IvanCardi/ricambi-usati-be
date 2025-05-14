import { AggregateRoot } from "../../../../shared";
import { Car } from "./car";
import { CarPartCategory } from "./carPartCategory";
import { CarPartDescription } from "./carPartDescription";
import { CarPartName } from "./carPartName";
import { CarPartNumbers } from "./carPartNumbers";
import { CarPartPrice } from "./carPartPrice";
import { CarPartStatus } from "./carPartStatus";
import { CarPartWarranty } from "./carPartWarranty";
import { ShippingCosts } from "./shippingCosts";

export type CarPartProps = {
  name: CarPartName;
  numbers: CarPartNumbers;
  photos: string[];
  car: Car;
  category: CarPartCategory;
  description: CarPartDescription;
  warranty: CarPartWarranty; // in month
  price: CarPartPrice; // in €
  status: CarPartStatus; // "available", "sold"
  compatibleCars: string[];
  lastUpdated: Date; // timestamp
  adHocShippingCosts?: ShippingCosts;
};

export class CarPart extends AggregateRoot<CarPartProps> {
  static create(props: {
    name: string;
    numbers: string[];
    photos?: string[];
    car: Car;
    category: string;
    description: string;
    warranty: number; // in month
    price: number; // in €
    compatibleCars?: string[];
    adHocShippingCosts?: number;
  }): CarPart {
    return new CarPart({
      car: props.car,
      category: CarPartCategory.from(props.category),
      compatibleCars: props.compatibleCars ?? [],
      description: new CarPartDescription(props.description),
      lastUpdated: new Date(),
      name: new CarPartName(props.name),
      numbers: CarPartNumbers.from(props.numbers),
      photos: props.photos ?? [],
      price: new CarPartPrice(props.price),
      status: "available",
      warranty: new CarPartWarranty(props.warranty),
      adHocShippingCosts: props.adHocShippingCosts
        ? new ShippingCosts(props.adHocShippingCosts)
        : undefined,
    });
  }

  get name() {
    return this.props.name.toString();
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
    return this.props.description.toString();
  }

  get warranty() {
    return this.props.warranty.valueOf();
  }

  get price() {
    return this.props.price.valueOf();
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

  get adHocShippingCosts() {
    return this.props.adHocShippingCosts?.valueOf();
  }

  setToSold() {
    this.props.status = "sold";
  }

  update(info: {
    name: string;
    numbers: string[];
    category: string; // like "cat1/cat2/cat3"
    description: string;
    photos: string[];
    warranty: number; // in month
    price: number; // in €
    compatibleCars: string[];
    adHocShippingCosts?: number;
  }) {
    this.props.name = new CarPartName(info.name);
    this.props.numbers = CarPartNumbers.from(info.numbers);
    this.props.category = CarPartCategory.from(info.category);
    this.props.description = new CarPartDescription(info.description);
    this.props.photos = info.photos;
    this.props.warranty = new CarPartWarranty(info.warranty);
    this.props.price = new CarPartPrice(info.price);
    this.props.compatibleCars = info.compatibleCars;

    this.props.adHocShippingCosts = info.adHocShippingCosts
      ? new ShippingCosts(info.adHocShippingCosts)
      : undefined;

    this.props.lastUpdated = new Date();
  }
}
