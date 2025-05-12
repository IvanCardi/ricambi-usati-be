import { PaymentGateway } from "./implementations/paymentGateway";
import { CarPartRepo } from "./implementations/carPartRepo";
import { CarRepo } from "./implementations/carRepo";
import { CustomerRepo } from "./implementations/customerRepo";
import { OrderRepo } from "./implementations/orderRepo";
import { OrderDraftRepo } from "./implementations/orderDraftRepo";

const carRepo = new CarRepo();
const carPartRepo = new CarPartRepo();
const customerRepo = new CustomerRepo();
const orderRepo = new OrderRepo(customerRepo, carPartRepo);
const paymentService = new PaymentGateway();
const orderDraftRepo = new OrderDraftRepo(customerRepo, carPartRepo);

export { carRepo, carPartRepo, customerRepo, orderRepo, paymentService, orderDraftRepo };
