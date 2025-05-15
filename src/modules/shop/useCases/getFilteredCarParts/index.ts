import { carPartRepo, customerRepo } from "../../repos";
import { GetFilteredCarParts } from "./getFilteredCarParts";

const getFilteredCarParts = new GetFilteredCarParts(carPartRepo, customerRepo);

export { getFilteredCarParts };
