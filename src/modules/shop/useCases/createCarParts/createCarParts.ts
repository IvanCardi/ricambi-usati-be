import { NonEmptyString, UseCase } from "../../../../shared";
import { PositiveNumber } from "../../../../shared/utils/PositiveNumber";
import { CarPart } from "../../domain/carPart/carPart";
import { CarPartCategory } from "../../domain/carPart/carPartCategory";
import { CarPartDescription } from "../../domain/carPart/carPartDescription";
import { CarPartName } from "../../domain/carPart/carPartName";
import { CarPartNumber } from "../../domain/carPart/carPartNumber";
import { CarPartNumbers } from "../../domain/carPart/carPartNumbers";
import { CarPartPrice } from "../../domain/carPart/carPartPrice";
import { CarPartWarranty } from "../../domain/carPart/carPartWarranty";
import CarPartsCreatedEmitter from "../../events/cartPartsCreated";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICarRepo } from "../../repos/carRepo";
import { CarNotFound } from "../_errors/carNotFound";

export type CreateCarPartsInput = {
  carId: string;
  parts: {
    name: string;
    numbers: string[];
    category: string; // like "cat1/cat2/cat3"
    description: string;
    photos: string[];
    warranty: number; // in month
    price: number; // in €
    compatibleCars: string[];
  }[];
};

export class CreateCarParts implements UseCase<CreateCarPartsInput, void> {
  constructor(private carRepo: ICarRepo, private carPartRepo: ICarPartRepo) {}
  async execute({ carId, parts }: CreateCarPartsInput): Promise<void> {
    const car = await this.carRepo.getById(carId);

    if (!car) {
      throw new CarNotFound();
    }

    const carParts = parts.map(
      (p) =>
        new CarPart({
          car,
          category: CarPartCategory.from(p.category),
          compatibleCars: p.compatibleCars,
          description: new CarPartDescription(p.description),
          name: new CarPartName(p.name),
          numbers: new CarPartNumbers(
            ...p.numbers.map((n) => new CarPartNumber(n))
          ),
          photos: p.photos,
          price: new CarPartPrice(p.price),
          status: "available",
          warranty: new CarPartWarranty(p.warranty),
        })
    );

    await this.carPartRepo.saveAll(carParts);

    CarPartsCreatedEmitter.emit({
      carId,
      partsCreated: carParts.length,
    });
  }
}
