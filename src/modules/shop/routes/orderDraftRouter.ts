import express from "express";
import { CreateOrUpdateOrderDraftController } from "../useCases/createOrUpdateOrderDraft/createOrUpdateOrderDraftController";
import { createOrUpdateOrderDraft } from "../useCases/createOrUpdateOrderDraft";

const orderDraftRouter = express.Router();

orderDraftRouter.post("/orderDrafts", (req, res) =>
  new CreateOrUpdateOrderDraftController(createOrUpdateOrderDraft).execute(
    req,
    res
  )
);

export default orderDraftRouter;
