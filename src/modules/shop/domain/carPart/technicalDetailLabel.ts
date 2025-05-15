import { NonEmptyString } from "../../../../shared";

export class TechnicalDetailLabel extends NonEmptyString<"TechnicalDetailLabel"> {
  constructor(value: string) {
    super(value, "TechnicalDetailLabel");
  }
}
