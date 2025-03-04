import { logger } from "../../../bootstrap/logger";
import CarPartsCreatedEmitter from "../../shop/events/cartPartsCreated";
import { updateCarPartsNumber } from "../useCases/updateCarPartsNumber";

CarPartsCreatedEmitter.on((event) => {
  updateCarPartsNumber.execute(event).catch((err) => {
    logger.error(`Error during UpdateCarPartsNumber useCase: ${err}`);
  });
});
