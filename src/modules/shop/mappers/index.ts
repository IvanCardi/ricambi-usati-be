import { CarMap } from "./carMap";
import { CarPartMap } from "./carPartMap";
import { CustomerMap } from "./customerMap";
import { OrderMap } from "./orderMap";

const carPartMap = new CarPartMap();
const carMap = new CarMap();
const customerMap = new CustomerMap();
const orderMap = new OrderMap();

export { carPartMap, carMap, customerMap, orderMap };
