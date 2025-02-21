import { Error } from "../../../../shared";

export class InvalidCompanySdi extends Error<"InvalidCompanySdi"> {
  constructor() {
    super("InvalidCompanySdi");
  }
}
