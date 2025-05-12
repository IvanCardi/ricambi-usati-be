import { orderDraftRepo } from "../../repos";
import { GetOrderDraft } from "./getOrderDraft";

const getOrderDraft = new GetOrderDraft(orderDraftRepo);

export { getOrderDraft };
