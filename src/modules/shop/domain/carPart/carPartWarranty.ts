import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";

export class CarPartWarranty extends PositiveNumber<"CarPartWarranty"> {
  constructor(warranty: number) {
    super(warranty, "CarPartWarranty");
  }
}
