export type CarPartQueryModel = {
  id: string;
  name: string;
  imageUrl: string | undefined;
  price: number;
  numbers: string[];
  carId: string;
  carBrand: string;
  carModel: string;
  carSetup: string;
  category: string;
  description: string;
  warranty: number;
  status: "available" | "sold";
  compatibleCars: string[];
  lastUpdated: string;
};
