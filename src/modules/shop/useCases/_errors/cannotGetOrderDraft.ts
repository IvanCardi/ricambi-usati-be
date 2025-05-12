import { Error } from "../../../../shared";

export class CannotGetOrderDraft extends Error<"CannotGetOrderDraft"> {
  constructor() {
    super("CannotGetOrderDraft");
  }
}
