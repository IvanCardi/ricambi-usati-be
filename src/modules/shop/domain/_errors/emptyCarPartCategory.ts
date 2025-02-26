import { Error } from "../../../../shared";

export class EmptyCarPartCategory extends Error<"EmptyCarPartCategory"> {
  constructor() {
    super("EmptyCarPartCategory");
  }
}
