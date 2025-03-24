import { Entity, Email } from "../../../shared";
import { Password } from "./password";

export type UserProps = {
  email: Email;
  password: Password;
};

export class User extends Entity<UserProps> {
  public constructor(props: UserProps, id?: string) {
    super(props, id);
  }
}
