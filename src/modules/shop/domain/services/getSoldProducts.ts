import { CarPart } from "../carPart/carPart";

export class GetSoldProducts {
  constructor(private products: CarPart[]) {}

  execute(): CarPart[] {
    return this.products.filter((p) => p.status === "sold");
  }
}
