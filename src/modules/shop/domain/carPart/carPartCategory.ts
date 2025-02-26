import { ValueObject } from "../../../../shared";
import { EmptyCarPartCategory } from "../_errors/emptyCarPartCategory";

export type CarPartCategoryProps = {
  name: string;
  child?: CarPartCategory;
};

export class CarPartCategory extends ValueObject<CarPartCategoryProps> {
  static from(path: string): CarPartCategory {
    if (path === null || path === undefined || path.length === 0) {
      throw new EmptyCarPartCategory();
    }
    const parts = path.split("/");

    const name = parts.shift()!;

    return new CarPartCategory({
      name,
      child: parts.length > 0 ? this.from(parts.join("/")) : undefined,
    });
  }

  get name() {
    return this.props.name;
  }

  get child() {
    return this.props.child;
  }

  toPath(): string {
    return this.name + (this.child ? `/${this.child.toPath()}` : "");
  }
}
