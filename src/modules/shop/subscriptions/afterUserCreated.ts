import { logger } from "../../../bootstrap/logger";
import UserCreatedEmitter from "../../user/events/userCreated";
import { createCustomer } from "../useCases/createCustomer";

UserCreatedEmitter.on((event) => {
  let type: "private" | "company";

  if (event["firstName"]) {
    type = "private";
  } else {
    type = "company";
  }

  createCustomer.execute({ ...event, type } as any).catch((err) => {
    logger.error(`Error during CreateCustomer useCase: ${err.toString()}`);
  });
});
