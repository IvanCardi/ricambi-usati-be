import { logger } from "../../../bootstrap/logger";
import CarPartsDeletedEmitter from "../../shop/events/carPartsDeleted";
import { updateCarPartsNumber } from "../useCases/updateCarPartsNumber";

CarPartsDeletedEmitter.on((event) => {
  updateCarPartsNumber.execute({ ...event, partsCreated: 0 }).catch((err) => {
    logger.error(`Error during UpdateCarPartsNumber useCase: ${err}`);
  });
});
