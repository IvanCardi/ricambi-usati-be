import { userRepo } from "../../repos";
import { Login } from "./login";

const login = new Login(userRepo);

export { login };
