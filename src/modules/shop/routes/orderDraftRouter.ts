import express from "express";
import { CreateOrUpdateOrderDraftController } from "../useCases/createOrUpdateOrderDraft/createOrUpdateOrderDraftController";
import { createOrUpdateOrderDraft } from "../useCases/createOrUpdateOrderDraft";
import { authentication } from "../../../middelwares/authentication";

const orderDraftRouter = express.Router();

orderDraftRouter.post("/orderDrafts", authentication, (req, res) =>
  new CreateOrUpdateOrderDraftController(createOrUpdateOrderDraft).execute(
    req,
    res
  )
);

export default orderDraftRouter;
