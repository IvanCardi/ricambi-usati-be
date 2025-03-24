import { userRepo } from "../../repos";
import { Register } from "./register";

const register = new Register(userRepo);

export { register };
