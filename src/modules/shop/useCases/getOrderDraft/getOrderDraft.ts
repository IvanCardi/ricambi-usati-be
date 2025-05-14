import { UseCase } from "../../../../shared";
import {
  GetOrderDraftQueryModel,
  mapGetOrderDraftQueryModelProducts,
} from "../../domain/queryModels/getOrderDraftQueryModel";
import { ShippingCostsCalculator } from "../../domain/services/shippingCostsCalculator";
import { IOrderDraftRepo } from "../../repos/orderDraftRepo";
import { CannotGetOrderDraft } from "../_errors/cannotGetOrderDraft";
import { OrderDraftNotFound } from "../_errors/orderDraftNotFound";

export type GetOrderDraftInput = {
  orderId: string;
  userId?: string;
};

export class GetOrderDraft
  implements UseCase<GetOrderDraftInput, GetOrderDraftQueryModel>
{
  constructor(private orderDraftRepo: IOrderDraftRepo) {}

  async execute(input: GetOrderDraftInput): Promise<GetOrderDraftQueryModel> {
    const orderDraft = await this.orderDraftRepo.getById(input.orderId);

    if (!orderDraft) {
      throw new OrderDraftNotFound();
    }

    if (orderDraft.customer && orderDraft.customer.userId !== input.userId) {
      throw new CannotGetOrderDraft();
    }

    return {
      id: orderDraft.id,
      products: mapGetOrderDraftQueryModelProducts(
        orderDraft.products,
        orderDraft.customer
      ),
      totalProductsPrice: orderDraft.getTotalPrice(),
      shippingCosts: new ShippingCostsCalculator(orderDraft).calculate(),
      info: orderDraft.info
        ? {
            firstName: orderDraft.info.firstName,
            lastName: orderDraft.info.lastName,
            email: orderDraft.info.email,
            details: orderDraft.info.details,
            address: {
              country: orderDraft.info.address.country,
              streetName: orderDraft.info.address.streetName,
              administrativeArea: orderDraft.info.address.administrativeArea,
              city: orderDraft.info.address.city,
              dependentLocality: orderDraft.info.address.dependentLocality,
              postalCode: orderDraft.info.address.postalCode,
              province: orderDraft.info.address.province,
              streetName2: orderDraft.info.address.streetName2,
            },
          }
        : undefined,
    };
  }
}
