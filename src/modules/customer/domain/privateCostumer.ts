import { Entity } from "../../../shared";
import { FirstName } from "./firstName";
import { LastName } from "./lastName";

export type PrivateCostumerProps = {
  firstName: FirstName;
  lastName: LastName;
};

export class PrivateCostumer extends Entity<PrivateCostumerProps> {
  public constructor(props: PrivateCostumerProps, id?: string) {
    super(props, id);
  }
}
