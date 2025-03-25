/* eslint-disable @typescript-eslint/no-misused-promises */
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import * as config from "../../config";
import { logger } from "../logger";
import { healthRouter } from "./health";
import authentication from "./middlewares/authentication";
import carRouter from "../../modules/car/routes/carRouter";
import carPartRouter from "../../modules/shop/routes/carPartRouter";
import mediaRouter from "../../modules/media/routes/carPartRouter";
import customerRouter from "../../modules/shop/routes/customerRouter";
import orderRouter from "../../modules/shop/routes/orderRouter";
import userRouter from "../../modules/user/routes/userRouter";

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "http://localhost:3001",
  credentials: true,
};

export const app = express();

const { port } = config.server;

export const server = http.createServer(app).listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

app.use(cors(origin));

app.use(express.static("public"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(helmet());
app.use(morgan("combined"));
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: false,
  })
);

app.use(healthRouter);
app.use(carRouter);
app.use(carPartRouter);
app.use(mediaRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(userRouter);

if (config.isProduction) {
  app.use(authentication);
}
