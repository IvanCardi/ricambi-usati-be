import { ValueObject } from "../../../../shared";

export type CarPartCategoryProps = {
  name: string;
  child?: CarPartCategory;
};

export class CarPartCategory extends ValueObject<CarPartCategoryProps> {
  public constructor(props: CarPartCategoryProps) {
    super(props);
  }
}
