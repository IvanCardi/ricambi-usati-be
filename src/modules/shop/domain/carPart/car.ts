import { Entity } from "../../../../shared";

export type CarProps = {
  brand: string;
  model: string;
  setup: string;
  year: string;
};

export class Car extends Entity<CarProps> {
  public constructor(props: CarProps, id?: string) {
    super(props, id);
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
