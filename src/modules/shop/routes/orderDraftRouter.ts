import express from "express";
import { authentication } from "../../../middelwares/authentication";
import { createOrUpdateOrderDraft } from "../useCases/createOrUpdateOrderDraft";
import { CreateOrUpdateOrderDraftController } from "../useCases/createOrUpdateOrderDraft/createOrUpdateOrderDraftController";
import { getOrderDraft } from "../useCases/getOrderDraft";
import { GetOrderDraftController } from "../useCases/getOrderDraft/getOrderDraftController";

const orderDraftRouter = express.Router();

orderDraftRouter.post("/orderDrafts", authentication, (req, res) =>
  new CreateOrUpdateOrderDraftController(createOrUpdateOrderDraft).execute(
    req,
    res
  )
);

orderDraftRouter.get("/orderDrafts/:id", authentication, (req, res) =>
  new GetOrderDraftController(getOrderDraft).execute(
    req,
    res
  )
);

export default orderDraftRouter;
