import { createCarPart } from "../../testUtils/createCarPart";
import { createCompanyCustomer } from "../../testUtils/createCompanyCustomer";
import { createCompanyCustomerOrder } from "../../testUtils/createCompanyCustomerOrder";
import { createPrivateCustomerOrder } from "../../testUtils/createPrivateCustomerOrder";
import { createShippingAddress } from "../../testUtils/createShippingAddress";
import { EmptyProducts } from "../_errors/emptyProducts";
import { CarPartPrice } from "../carPart/carPartPrice";
import { OrderDraft } from "./orderDraft";

describe("Order Draft Tests", () => {
  describe("Create order draft", () => {
    test("Should create an order draft with a product without customer and address", () => {
      const carPart = createCarPart({});
      const orderDraft = OrderDraft.create({
        products: [carPart],
      });

      expect(orderDraft.products).toContain(carPart);
    });

    test("Should create an order draft with a product, a customer and an address", () => {
      const carPart = createCarPart({});
      const customer = createCompanyCustomer({});

      const orderDraft = OrderDraft.create({
        products: [carPart],
        customer,
      });

      expect(orderDraft.products).toContain(carPart);
      expect(orderDraft.customer).toEqual(customer);
    });

    test("Should throw error with zero products", () => {
      expect(() => OrderDraft.create({ products: [] })).toThrow(EmptyProducts);
    });
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
});
