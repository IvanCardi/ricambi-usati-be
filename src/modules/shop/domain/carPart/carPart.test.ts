import { createCar } from "../../testUtils/createCar";
import { createCarPart } from "../../testUtils/createCarPart";
import { CarPart } from "./carPart";

describe("Car Part Tests", () => {
  describe("Create", () => {
    const part = CarPart.create({
      car: createCar(),
      name: "partName",
      category: "partCategory",
      description: "partDescription",
      numbers: ["partNumber"],
      price: 1000,
      warranty: 5,
    });

    test("Should create the car part with the given info", () => {
      expect(part.name).toEqual("partName");
      expect(part.description).toEqual("partDescription");
      expect(part.numbers).toHaveLength(1);
      expect(part.numbers[0].toString()).toEqual("partNumber");
      expect(part.price).toEqual(1000);
      expect(part.warranty).toEqual(5);
      expect(part.category.name).toEqual("partCategory");
    });

    test("Should set the compatible cars to empty if not passed", () => {
      expect(part.compatibleCars).toEqual([]);
    });

    test("Should set the photos to empty if not passed", () => {
      expect(part.photos).toEqual([]);
    });

    test("Should set the status to available", () => {
      expect(part.status).toEqual("available");
    });

    test("Should set the lastUpdated date to now", () => {
      expect(part.lastUpdated).toBeDefined();
    });

    test("Should set adHocShippingCosts to undefined if not specified", () => {
      expect(part.adHocShippingCosts).toBeUndefined();
    });
  });
  describe("Update", () => {
    const part = createCarPart({
      lastUpdated: new Date("2025-03-14T11:26:30.887Z"),
    });

    part.update({
      name: "newName",
      category: "newCategory",
      compatibleCars: ["car1"],
      description: "newDescr",
      numbers: ["newNumber"],
      photos: ["photoUrl"],
      price: 1000,
      warranty: 100,
      adHocShippingCosts: 50,
    });

    test("Should update the car part", () => {
      expect(part.name).toEqual("newName");
      expect(part.compatibleCars).toEqual(["car1"]);
      expect(part.description).toEqual("newDescr");
      expect(part.numbers).toHaveLength(1);
      expect(part.numbers[0].toString()).toEqual("newNumber");
      expect(part.photos).toEqual(["photoUrl"]);
      expect(part.price).toEqual(1000);
      expect(part.warranty).toEqual(100);
      expect(part.category.name).toEqual("newCategory");
      expect(part.adHocShippingCosts).toEqual(50);
    });

    test("Should set the lastUpdated date to now", () => {
      expect(part.lastUpdated).toBeDefined();
      expect(part.lastUpdated.toISOString()).not.toEqual(
        "2025-03-14T11:26:30.887Z"
      );
    });
  });
});
