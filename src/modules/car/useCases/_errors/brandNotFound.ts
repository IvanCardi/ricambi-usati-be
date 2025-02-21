import { Error } from "../../../../shared";

export class BrandNotFound extends Error<"BrandNotFound"> {
  constructor() {
    super("BrandNotFound");
  }
}
