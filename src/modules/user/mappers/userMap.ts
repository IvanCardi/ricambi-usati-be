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
}
