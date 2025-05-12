import { NonEmptyString } from "../NonEmptyString";

export class FirstName extends NonEmptyString<"AgentFirstName"> {
  constructor(value: string) {
    super(value, "AgentFirstName");
  }
}
