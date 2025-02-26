import { Entity, ValueObject } from "../../../../shared";

export type CarProps = {
  carId: string;
  brand: string;
  model: string;
  setup: string;
  year: number;
};

export class Car extends ValueObject<CarProps> {
  public constructor(props: CarProps, id?: string) {
    super(props);
  }

  get carId() {
    return this.props.carId;
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

  get year() {
    return this.props.year;
  }
}
