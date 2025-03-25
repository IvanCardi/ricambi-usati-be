import { Email } from "../../../shared";
import { Password } from "../domain/password";
import { User } from "../domain/user";

export class UserMap {
  toPersistance(user: User) {
    return {
      _id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt.toISOString(),
    };
  }

  toDomain(raw: ReturnType<typeof this.toPersistance>): User {
    return new User(
      {
        email: new Email(raw.email),
        password: new Password(raw.password),
        createdAt: new Date(raw.createdAt),
      },
      raw._id
    );
  }
}
