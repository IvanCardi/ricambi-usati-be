import { Entity, Email } from "../../../shared";
import { Password } from "./password";

export type UserProps = {
  email: Email;
  password: Password;
  createdAt: Date;
};

export class User extends Entity<UserProps> {
  public constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static async create(email: string, password: string): Promise<User> {
    return new User({
      email: new Email(email),
      password: await Password.create(password),
      createdAt: new Date(),
    });
  }

  get email() {
    return this.props.email.toString();
  }

  get password() {
    return this.props.password.toString();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  async hasSamePassword(plainTextPassword: string): Promise<boolean> {
    return this.props.password.compare(plainTextPassword);
  }
}
