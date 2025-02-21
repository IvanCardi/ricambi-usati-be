import { AggregateRoot } from "../../../../shared";
import { CarBrand } from "./carBrand";
import { CarDescription } from "./carDescription";
import { CarModel } from "./carModel";
import { CarSetup } from "./carSetup";
import { CarYear } from "./carYear";
import { CarPlate } from "./carPlate";
import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";
import { SoldPartsMoreThanTotalParts } from "../_errors/soldPartsMoreThanTotalParts";

export type CarProps = {
  plate: CarPlate;
  brand: CarBrand;
  model: CarModel;
  setup: CarSetup;
  year: CarYear;
  kilometers: PositiveNumber;
  description: CarDescription;
  totalParts: PositiveNumber;
  soldParts: PositiveNumber;
};

export class Car extends AggregateRoot<CarProps> {
  public constructor(props: CarProps, id?: string) {
    super(props, id);

    if (props.soldParts > props.totalParts) {
      throw new SoldPartsMoreThanTotalParts();
    }
  }

  get brand() {
    return this.props.brand;
  }

  get model() {
    return this.props.model;
  }

  get setup() {
    return this.props.setup;
  }

  get description() {
    return this.props.description;
  }

  get year() {
    return this.props.year;
  }

  get kilometers() {
    return this.props.kilometers;
  }

  get plate() {
    return this.props.plate;
  }

  get totalParts() {
    return this.props.totalParts;
  }

  get soldParts() {
    return this.props.soldParts;
  }
}
