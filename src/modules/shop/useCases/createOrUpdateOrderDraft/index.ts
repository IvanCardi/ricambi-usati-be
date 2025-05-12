import { carPartRepo, customerRepo, orderDraftRepo } from "../../repos";
import { CreateOrUpdateOrderDraft } from "./createOrUpdateOrderDraft";

const createOrUpdateOrderDraft = new CreateOrUpdateOrderDraft(
  orderDraftRepo,
  carPartRepo,
  customerRepo
);

export { createOrUpdateOrderDraft };
