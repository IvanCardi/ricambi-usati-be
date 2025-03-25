import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { access } from "../config";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1] ?? "";

  if (!token) {
    next();
  } else {
    try {
      const jwt = verify(token, access.secret);
      req.body.userId = (jwt as JwtPayload)["userId"];
      req.body.email = (jwt as JwtPayload)["email"];
      next();
    } catch (e) {
      next();
    }
  }
}
