import { Error } from "../../../../shared";

export class SetupForModelNotFound extends Error<"SetupForModelNotFound"> {
  constructor() {
    super("SetupForModelNotFound");
  }
}
