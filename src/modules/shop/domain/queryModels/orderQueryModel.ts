import { OrderStatus } from "../order/orderStatus";

export type OrderQueryModel = {
  id: string;
  customer:
    | {
        id: string;
        type: "private";
        email: string;
        firstName: string;
        lastName: string;
      }
    | { id: string; type: "company"; name: string; email: string };
  address: {
    street: string;
    number: string;
    zipCode: string;
    province: string;
    city: string;
    state: string;
  };
  products: {
    id: string;
    name: string;
    photo: string;
    description: string;
    price: number;
    discountedPrice?: number;
  }[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
};
