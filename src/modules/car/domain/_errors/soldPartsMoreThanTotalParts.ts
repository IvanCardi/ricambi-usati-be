import { Error } from "../../../../shared";

export class SoldPartsMoreThanTotalParts extends Error<"SoldPartsMoreThanTotalParts"> {
  constructor() {
    super("SoldPartsMoreThanTotalParts");
  }
}
