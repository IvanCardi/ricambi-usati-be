import { UseCase } from "../../../../shared";
import { CarPart } from "../../domain/carPart/carPart";
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
    adHocShippingCosts?: number;
    technicalDetails: { label: string; value: string }[];
  }[];
};

export class CreateCarParts implements UseCase<CreateCarPartsInput, void> {
  constructor(private carRepo: ICarRepo, private carPartRepo: ICarPartRepo) {}
  async execute({ carId, parts }: CreateCarPartsInput): Promise<void> {
    const car = await this.carRepo.getById(carId);

    if (!car) {
      throw new CarNotFound();
    }

    const carParts = parts.map((p) =>
      CarPart.create({
        car,
        category: p.category,
        compatibleCars: p.compatibleCars,
        description: p.description,
        name: p.name,
        numbers: p.numbers,
        photos: p.photos,
        price: p.price,
        warranty: p.warranty,
        adHocShippingCosts: p.adHocShippingCosts,
        technicalDetails: p.technicalDetails
      })
    );

    await this.carPartRepo.saveAll(carParts);

    CarPartsCreatedEmitter.emit({
      carId,
      partsCreated: carParts.length,
    });
  }
}
