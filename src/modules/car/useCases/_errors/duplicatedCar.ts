import { Error } from "../../../../shared";

export class DuplicatedCar extends Error<"DuplicatedCar"> {
  constructor() {
    super("DuplicatedCar");
  }
}
