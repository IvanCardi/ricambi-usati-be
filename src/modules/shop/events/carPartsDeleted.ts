import { EventEmitter } from "../../../shared";

export type CarPartsDeleted = {
  carId: string;
  partsDeleted: number;
};

const CarPartsDeletedEmitter = EventEmitter<CarPartsDeleted>("CarPartsDeleted");

export default CarPartsDeletedEmitter;
