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
  car: Car;
  category: CarPartCategory;
  description: CarPartDescription;
  warranty: PositiveNumber; // in month
  price: PositiveNumber; // in €
  status: CarPartStatus; // "available", "pending payment", "sold"
  compatibleCars: string[];
  lastUpdated: string; // timestamp
};

export class CarPart extends AggregateRoot<CarPartProps> {
  public constructor(props: CarPartProps, id?: string) {
    super(props, id);
  }
}
