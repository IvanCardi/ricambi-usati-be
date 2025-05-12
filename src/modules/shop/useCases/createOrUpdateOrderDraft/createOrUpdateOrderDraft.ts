import { UseCase } from "../../../../shared";
import { OrderDraft } from "../../domain/orderDraft/orderDraft";
import { ICarPartRepo } from "../../repos/carPartRepo";
import { ICustomerRepo } from "../../repos/customerRepo";
import { IOrderDraftRepo } from "../../repos/orderDraftRepo";
import { CustomerNotFound } from "../_errors/customerNotFound";

export type CreateOrUpdateOrderDraftInput = {
  orderId?: string;
  products: string[];
  userId?: string;
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
    } else {
      orderDraft = OrderDraft.create({ products, customer });
    }

    await this.orderDraftRepo.save(orderDraft);

    return orderDraft;
  }
}
