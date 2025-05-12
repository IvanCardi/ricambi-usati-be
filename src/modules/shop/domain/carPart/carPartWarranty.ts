import { PositiveNumber } from "../../../../shared";

export class CarPartWarranty extends PositiveNumber<"CarPartWarranty"> {
  constructor(warranty: number) {
    super(warranty, "CarPartWarranty");
  }
}
