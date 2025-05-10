import { OrderStatus } from "../order/orderStatus";
import { ShippingAddress } from "../shippingAddress/shippingAddress";

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
    firstName: string;
    lastName: string;
    streetName: string;
    streetName2?: string;
    city?: string;
    country: string;
    province?: string;
    administrativeArea?: string;
    dependentLocality?: string;
    postalCode?: string;
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
