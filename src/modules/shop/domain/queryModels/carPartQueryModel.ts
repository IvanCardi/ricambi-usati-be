type CarPartBase = {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  discountedPrice?: number;
};

export type CarPartQueryModelMinimal = CarPartBase;

export type CarPartQueryModel = CarPartBase & {
  numbers: string[];
  carId: string;
  carBrand: string;
  carModel: string;
  carSetup: string;
  carYear: string;
  category: string;
  description: string;
  warranty: number;
  status: "available" | "sold";
  compatibleCars: string[];
  lastUpdated: string;
  photos: string[];
  adHocShippingCosts?: number;
};
