import { Email, FirstName, LastName, UseCase } from "../../../../shared";
import { OrderDraft } from "../../domain/orderDraft/orderDraft";
import { GetSoldProducts } from "../../domain/services/getSoldProducts";
import { ShippingAddress } from "../../domain/shippingInfo/shippingAddress";
import { ShippingInfo } from "../../domain/shippingInfo/shippingInfo";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { IOrderDraftRepo } from "../../repos/orderDraftRepo";
import { CustomerNotFound } from "../_errors/customerNotFound";

export type CreateOrUpdateOrderDraftInput = {
  orderId?: string;
  products: string[];
  userId?: string;
  info?: {
    firstName: string;
    lastName: string;
    email: string;
    streetName: string;
    streetName2: string | undefined;
    city: string | undefined;
    country: string;
    province: string | undefined;
    administrativeArea: string | undefined;
    dependentLocality: string | undefined;
    postalCode: string | undefined;
    details: string | undefined;
  };
};

export class CreateOrUpdateOrderDraft
  implements UseCase<CreateOrUpdateOrderDraftInput, OrderDraft>
{
  constructor(
    private orderDraftRepo: IOrderDraftRepo,
    private carPartRepo: ICarPartRepo,
    private customerRepo: ICustomerRepo
  ) {}

  async execute(input: CreateOrUpdateOrderDraftInput): Promise<OrderDraft> {
    const products = await this.carPartRepo.getByIds(input.products);

    const customer = input.userId
      ? await this.customerRepo.getByUserId(input.userId)
      : undefined;

    if (input.userId && !customer) {
      throw new CustomerNotFound();
    }

    const foundOrderDraft = input.orderId
      ? await this.orderDraftRepo.getById(input.orderId)
      : undefined;

    let orderDraft: OrderDraft;

    if (foundOrderDraft) {
      orderDraft = foundOrderDraft;

      orderDraft.setProducts(products);

      if (customer) {
        orderDraft.setCustomer(customer);
      }

      if (input.info) {
        const info = new ShippingInfo({
          firstName: new FirstName(input.info.firstName),
          lastName: new LastName(input.info.lastName),
          email: new Email(input.info.email),
          address: new ShippingAddress(input.info),
        });

        orderDraft.setInfo(info);
      }
    } else {
      orderDraft = OrderDraft.create({ products, customer });
    }

    await this.orderDraftRepo.save(orderDraft);

    return orderDraft;
  }
}
