import { Error } from "../../../../shared";

export class CustomerNotFound extends Error<"CustomerNotFound"> {
  constructor() {
    super("CustomerNotFound");
  }
}
