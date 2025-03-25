import { User } from "../domain/user";

export interface IUserRepo {
  exists(email: string): Promise<boolean>;
  getByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
