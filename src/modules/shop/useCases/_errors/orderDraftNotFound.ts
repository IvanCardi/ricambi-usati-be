import { Error } from "../../../../shared";

export class OrderDraftNotFound extends Error<"OrderDraftNotFound"> {
  constructor() {
    super("OrderDraftNotFound");
  }
}
