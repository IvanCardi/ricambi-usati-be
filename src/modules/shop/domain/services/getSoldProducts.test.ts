import { createCarPart } from "../../testUtils/createCarPart";
import { GetSoldProducts } from "./getSoldProducts";

test("Should get all sold products", () => {
  const availableProductOne = createCarPart({ status: "available" });
  const availableProductTwo = createCarPart({ status: "available" });
  const soldProductOne = createCarPart({ status: "sold" });
  const soldProductTwo = createCarPart({ status: "sold" });

  const soldProducts = new GetSoldProducts([
    availableProductOne,
    soldProductOne,
    availableProductTwo,
    soldProductTwo,
  ]).execute();

  expect(soldProducts).toHaveLength(2);
  expect(soldProducts).toContain(soldProductOne);
  expect(soldProducts).toContain(soldProductTwo);
});
