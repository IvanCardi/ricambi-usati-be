import { createCarPart } from "../../testUtils/createCarPart";
import { createCompanyCustomer } from "../../testUtils/createCompanyCustomer";
import { createShippingAddress } from "../../testUtils/createShippingAddress";
import { EmptyProducts } from "../_errors/emptyProducts";
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
});
