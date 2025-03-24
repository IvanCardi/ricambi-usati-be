import { MONGO_DB } from "../../../../bootstrap/database/mongoDb";
import { User } from "../../domain/user";
import { userMap } from "../../mappers";
import { IUserRepo } from "../userRepo";

export class UserRepo implements IUserRepo {
  private collection = "users";
  private mongoDb = MONGO_DB;

  async exists(email: string): Promise<boolean> {
    return !!(await this.mongoDb.findOne({ email }, this.collection));
  }

  async save(user: User): Promise<void> {
    const raw = userMap.toPersistance(user);

    if (await this.exists(user.email)) {
      await this.mongoDb.replace({ _id: user.id }, raw, this.collection);
    } else {
      await this.mongoDb.save(raw, this.collection);
    }
  }
}
