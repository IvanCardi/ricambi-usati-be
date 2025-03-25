import express from "express";
import { login } from "../useCases/login";
import { LoginController } from "../useCases/login/loginController";
import { register } from "../useCases/register";
import { RegisterController } from "../useCases/register/registerController";
import { RefreshController } from "../useCases/refresh/refreshController";
import { refresh } from "../useCases/refresh";

const userRouter = express.Router();

userRouter.post("/register", (req, res) =>
  new RegisterController(register).execute(req, res)
);

userRouter.post("/login", (req, res) =>
  new LoginController(login).execute(req, res)
);

userRouter.post("/refresh", (req, res) =>
  new RefreshController(refresh).execute(req, res)
);

export default userRouter;
