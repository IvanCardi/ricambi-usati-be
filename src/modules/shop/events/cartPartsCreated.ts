import { EventEmitter } from "../../../shared";

export type CarPartsCreated = {
  carId: string;
  partsCreated: number;
};

const CarPartsCreatedEmitter = EventEmitter<CarPartsCreated>("CarPartsCreated");

export default CarPartsCreatedEmitter;
