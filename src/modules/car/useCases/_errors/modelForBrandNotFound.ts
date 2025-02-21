import { Error } from "../../../../shared";

export class ModelForBrandNotFound extends Error<"ModelForBrandNotFound"> {
  constructor() {
    super("ModelForBrandNotFound");
  }
}
