import { createAddress } from "../../testUtils/createAddress";
import { createCarPart } from "../../testUtils/createCarPart";
import { createCompanyCustomerOrder } from "../../testUtils/createCompanyCustomerOrder";
import { createPrivateCustomer } from "../../testUtils/createPrivateCustomer";
import { createPrivateCustomerOrder } from "../../testUtils/createPrivateCustomerOrder";
import { OrderCannotBeShipped } from "../_errors/orderCannotBeShipped";
import { CarPartPrice } from "../carPart/carPartPrice";
import { Order } from "./order";

describe("Order Tests", () => {
  test("Should set the date to now and status to created when creating a new order", () => {
    const order = Order.create({
      customer: createPrivateCustomer({}),
      products: [createCarPart({})],
      address: createAddress({}),
    });

    expect(order.status).toEqual("created");
    expect(order.createdAt).toBeDefined();
  });

  describe("Get Total Price", () => {
    test("Should return the sum of all products prices when the customer is a private customer", () => {
      const order = createPrivateCustomerOrder({
        products: [
          createCarPart({ price: new CarPartPrice(10) }),
          createCarPart({ price: new CarPartPrice(20) }),
          createCarPart({ price: new CarPartPrice(70) }),
        ],
      });

      const totalPrice = order.getTotalPrice();

      expect(totalPrice).toEqual(100);
    });
    test("Should return the sum of all products prices when the customer is a non automotive company customer", () => {
      const order = createCompanyCustomerOrder({
        isAutomotive: false,
        discount: 0,
        products: [
          createCarPart({ price: new CarPartPrice(10) }),
          createCarPart({ price: new CarPartPrice(20) }),
          createCarPart({ price: new CarPartPrice(70) }),
        ],
      });

      const totalPrice = order.getTotalPrice();

      expect(totalPrice).toEqual(100);
    });
    test("Should return the sum of all products discounted prices when the customer is an automotive company customer", () => {
      const order = createCompanyCustomerOrder({
        isAutomotive: true,
        discount: 10,
        products: [
          createCarPart({ price: new CarPartPrice(10) }),
          createCarPart({ price: new CarPartPrice(20) }),
          createCarPart({ price: new CarPartPrice(70) }),
        ],
      });

      const totalPrice = order.getTotalPrice();

      expect(totalPrice).toEqual(90);
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
