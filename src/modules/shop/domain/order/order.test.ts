import { createCarPart } from "../../testUtils/createCarPart";
import { createOrderDraft } from "../../testUtils/createOrderDraft";
import { createPrivateCustomer } from "../../testUtils/createPrivateCustomer";
import { createPrivateCustomerOrder } from "../../testUtils/createPrivateCustomerOrder";
import { createShippingAddress } from "../../testUtils/createShippingAddress";
import createShippingInfo from "../../testUtils/createShippingInfo";
import { OrderCannotBeShipped } from "../_errors/orderCannotBeShipped";
import { CarPartPrice } from "../carPart/carPartPrice";
import { ShippingCosts } from "../carPart/shippingCosts";
import { Order } from "./order";

describe("Order Tests", () => {
  describe("Create Order", () => {
    const product = createCarPart({
      adHocShippingCosts: new ShippingCosts(5),
    });
    const info = createShippingInfo({
      address: createShippingAddress({
        country: "Italia"
      })
    });
    const customer = createPrivateCustomer({});
    const orderDraft = createOrderDraft({
      customer,
      info,
      products: [product],
    });

    const order = Order.create({
      orderDraft,
      deliveryOption: "delivery",
      paymentMethod: "online",
    });

    test("Should set the product, info and customer to the ones in order draft", () => {
      expect(order.customer).toEqual(customer);
      expect(order.info).toEqual(info);
      expect(order.products).toHaveLength(1);
      expect(order.products).toContain(product);
    });

    test("Should set the delivery option and payment method to the ones passed", () => {
      expect(order.deliveryOption).toEqual("delivery");
      expect(order.paymentMethod).toEqual("online");
    });

    test("Should set the status to in payment", () => {
      expect(order.status).toEqual("in payment");
    });

    test("Should set the createdAt date as now", () => {
      expect(order.createdAt).toBeDefined();
    });

    test("Should set the total amount equals to the one from order draft", () => {
      expect(order.productsAmount).toEqual(orderDraft.getTotalPrice());
    });

    test("Should set the shipping costs from the order draft", () => {
      expect(order.shippingCosts).toEqual(5);
    });
  });

  describe("Mark as shipped", () => {
    test("Should change status to shipped if the order is in paid status", () => {
      const order = createPrivateCustomerOrder({
        products: [createCarPart({ price: new CarPartPrice(10) })],
        status: "paid",
      });

      order.markAsShipped();

      expect(order.status).toEqual("shipped");
    });
    test("Should throw error if order is not in paid status", () => {
      const order = createPrivateCustomerOrder({
        products: [createCarPart({ price: new CarPartPrice(10) })],
      });

      expect(() => {
        order.markAsShipped();
      }).toThrow(OrderCannotBeShipped);
    });
  });
});
