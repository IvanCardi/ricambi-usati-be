import { Error } from "../../../../shared";

export class EmptyProducts extends Error<"EmptyProducts"> {
  constructor() {
    super("EmptyProducts");
  }
}
