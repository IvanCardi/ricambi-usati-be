import { NonEmptyString } from "../NonEmptyString";

export class LastName extends NonEmptyString<"AgentLastName"> {
  constructor(value: string) {
    super(value, "AgentLastName");
  }
}
