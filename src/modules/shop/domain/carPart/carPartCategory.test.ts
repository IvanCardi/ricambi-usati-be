import { EmptyCarPartCategory } from "../_errors/emptyCarPartCategory";
import { CarPartCategory } from "./carPartCategory";

describe("Car Part Category Tests", () => {
  test("Should create a category from a category path", () => {
    const category = CarPartCategory.from("cat_1/cat_2/cat_3");

    expect(category.name).toEqual("cat_1");
    expect(category.child?.name).toEqual("cat_2");
    expect(category.child?.child?.name).toEqual("cat_3");
    expect(category.child?.child?.child).toBeUndefined();
  });
  test("Should throw error when passing an empty string", () => {
    expect(() => CarPartCategory.from("")).toThrow(EmptyCarPartCategory);
  });
  test("Should return the path", () => {
    const category = CarPartCategory.from("cat_1/cat_2/cat_3");

    expect(category.toPath()).toEqual("cat_1/cat_2/cat_3");
  });
});
