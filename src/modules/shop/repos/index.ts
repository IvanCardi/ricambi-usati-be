import { PaymentGateway } from "./implementations/paymentGateway";
import { CarPartRepo } from "./implementations/carPartRepo";
import { CarRepo } from "./implementations/carRepo";
import { CustomerRepo } from "./implementations/customerRepo";
import { OrderRepo } from "./implementations/orderRepo";

const carRepo = new CarRepo();
const carPartRepo = new CarPartRepo();
const customerRepo = new CustomerRepo();
const orderRepo = new OrderRepo(customerRepo, carPartRepo);
const paymentService = new PaymentGateway();

export { carRepo, carPartRepo, customerRepo, orderRepo, paymentService };
