import { Error } from "../../../../shared";

export class CarPartNotFound extends Error<"CarPartNotFound"> {
  constructor() {
    super("CarPartNotFound");
  }
}
