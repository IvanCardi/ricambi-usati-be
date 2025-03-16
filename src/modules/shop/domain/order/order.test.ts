import { createCarPart } from "../../testUtils/createCarPart";
import { createCompanyCustomerOrder } from "../../testUtils/createCompanyCustomerOrder";
import { createPrivateCustomerOrder } from "../../testUtils/createPrivateCustomerOrder";
import { CarPartPrice } from "../carPart/carPartPrice";

describe("Order Tests", () => {
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
