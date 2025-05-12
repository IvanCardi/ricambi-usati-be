import { createCarPart } from "../../testUtils/createCarPart";
import { createOrderDraft } from "../../testUtils/createOrderDraft";
import { ShippingCosts } from "../carPart/shippingCosts";
import { ShippingCostsCalculator } from "./shippingCostsCalculator";

describe("Calculate Shipping Costs", () => {
  test("Should return the maximum shipping cost of the order products", () => {
    const orderDraft = createOrderDraft({
      products: [
        createCarPart({ adHocShippingCosts: new ShippingCosts(50) }),
        createCarPart({ adHocShippingCosts: new ShippingCosts(10) }),
      ],
    });

    const shippingCosts = new ShippingCostsCalculator(orderDraft).calculate();

    expect(shippingCosts).toEqual(50);
  });
});
