import { BrandModelSetupRepo } from "./implementations/brandModelSetupRepo";
import { CarRepo } from "./implementations/carRepo";

const carRepo = new CarRepo();
const brandModelSetupRepo = new BrandModelSetupRepo();

export { carRepo, brandModelSetupRepo };
