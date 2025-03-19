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
    return this.props.brand.toString();
  }

  get model() {
    return this.props.model.toString();
  }

  get setup() {
    return this.props.setup.toString();
  }

  get description() {
    return this.props.description.toString();
  }

  get year() {
    return this.props.year.valueOf();
  }

  get kilometers() {
    return this.props.kilometers.valueOf();
  }

  get plate() {
    return this.props.plate.toString();
  }

  get totalParts() {
    return this.props.totalParts.valueOf();
  }

  get soldParts() {
    return this.props.soldParts.valueOf();
  }

  updateTotalParts(partsCreated: number, partsRemoved: number) {
    this.props.totalParts = new CarTotalParts(
      this.props.totalParts.valueOf() + partsCreated - partsRemoved
    );
  }
}
