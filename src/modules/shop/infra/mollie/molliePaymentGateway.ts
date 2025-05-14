import createMollieClient from "@mollie/api-client";
import { mollieSecretKey } from "../../../../config";

export const mollie = createMollieClient({
  apiKey: mollieSecretKey,
});
