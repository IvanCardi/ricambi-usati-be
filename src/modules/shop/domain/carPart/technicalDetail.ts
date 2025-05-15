import { ValueObject } from "../../../../shared";
import { TechnicalDetailLabel } from "./technicalDetailLabel";
import { TechnicalDetailValue } from "./technicalDetailValue";

export type TechnicalDetailProps = {
  label: TechnicalDetailLabel;
  value: TechnicalDetailValue;
};

export class TechnicalDetail extends ValueObject<TechnicalDetailProps> {
  public constructor(props: TechnicalDetailProps) {
    super(props);
  }

  get label() {
    return this.props.label.toString();
  }

  get value() {
    return this.props.value.toString();
  }
}
