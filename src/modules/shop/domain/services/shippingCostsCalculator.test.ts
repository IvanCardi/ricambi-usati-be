import { createCarPart } from "../../testUtils/createCarPart";
import { createOrderDraft } from "../../testUtils/createOrderDraft";
import { createShippingAddress } from "../../testUtils/createShippingAddress";
import createShippingInfo from "../../testUtils/createShippingInfo";
import { ShippingCosts } from "../carPart/shippingCosts";
import { ShippingInfo } from "../shippingInfo/shippingInfo";
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
  test("Should add 15 if address is set and country is not italy", () => {
    const orderDraft = createOrderDraft({
      products: [
        createCarPart({ adHocShippingCosts: new ShippingCosts(50) }),
        createCarPart({ adHocShippingCosts: new ShippingCosts(10) }),
      ],
      info: createShippingInfo({
        address: createShippingAddress({ country: "France" }),
      }),
    });

    const shippingCosts = new ShippingCostsCalculator(orderDraft).calculate();

    expect(shippingCosts).toEqual(65);
  });
});
