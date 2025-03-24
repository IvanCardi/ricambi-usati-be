import express from "express";
import { RegisterController } from "../useCases/register/registerController";
import { register } from "../useCases/register";

const userRouter = express.Router();

userRouter.post("/register", (req, res) =>
  new RegisterController(register).execute(req, res)
);

export default userRouter;
