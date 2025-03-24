import { UseCase } from "../../../../shared";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repos/userRepo";
import { DuplicatedUser } from "../_errors/duplicatedUser";

export type RegisterInput = {
  email: string;
  password: string;
  info: any;
};

export class Register implements UseCase<RegisterInput, void> {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: RegisterInput): Promise<void> {
    if (await this.userRepo.exists(input.email)) {
      throw new DuplicatedUser();
    }

    const user = await User.create(input.email, input.password);

    await this.userRepo.save(user);
  }
}
