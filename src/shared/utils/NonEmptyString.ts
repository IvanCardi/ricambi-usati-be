import { Guard } from "../core/Guard";
import { ValueObject } from "../domain/ValueObject";

export type NonEmptyStringProps = {
  value: string;
};

export class NonEmptyString<T> extends ValueObject<NonEmptyStringProps> {
  private type: T | undefined;

  public constructor(props: NonEmptyStringProps) {
    super(props);

    if (!Guard.againstInvalidStringValue(props.value).succeeded) {
      throw new Error("value is empty string");
    }
  }
}
