import { NonEmptyString } from "../../../../shared";

export class TechnicalDetailValue extends NonEmptyString<"TechnicalDetailValue"> {
  constructor(value: string) {
    super(value, "TechnicalDetailValue");
  }
}
