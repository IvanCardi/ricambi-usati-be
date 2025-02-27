import { AggregateRoot } from "../../../../shared";
import { SoldPartsMoreThanTotalParts } from "../_errors/soldPartsMoreThanTotalParts";
import { CarBrand } from "./carBrand";
import { CarDescription } from "./carDescription";
import { CarKilometers } from "./carKilometers";
import { CarModel } from "./carModel";
import { CarPlate } from "./carPlate";
import { CarSetup } from "./carSetup";
import { CarSoldParts } from "./carSoldParts";
import { CarTotalParts } from "./carTotalParts";
import { CarYear } from "./carYear";

export type CarProps = {
  plate: CarPlate;
  brand: CarBrand;
  model: CarModel;
  setup: CarSetup;
  year: CarYear;
  kilometers: CarKilometers;
  description: CarDescription;
  totalParts: CarTotalParts;
  soldParts: CarSoldParts;
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
