import { Entity } from "../../../../shared";
import { EmptyProducts } from "../_errors/emptyProducts";
import { CarPart } from "../carPart/carPart";
import { CompanyCustomer } from "../customer/companyCustomer/companyCustomer";
import { Customer } from "../customer/customer";
import { ShippingAddress } from "../shippingAddress/shippingAddress";

export type OrderDraftProps = {
  customer?: Customer;
  products: CarPart[];
};

export class OrderDraft extends Entity<OrderDraftProps> {
  public constructor(props: OrderDraftProps, id?: string) {
    super(props, id);
  }

  static create({
    products,
    customer,
  }: {
    products: CarPart[];
    customer?: Customer;
  }): OrderDraft {
    if (products.length === 0) {
      throw new EmptyProducts();
    }

    return new OrderDraft({ products, customer });
  }

  get products() {
    return this.props.products;
  }

  get customer() {
    return this.props.customer;
  }

  setProducts(products: CarPart[]) {
    if (products.length === 0) {
      throw new EmptyProducts();
    }

    this.props.products = products;
  }

  setCustomer(customer: Customer) {
    this.props.customer = customer;
  }

  getTotalPrice(): number {
    const totalPrice = this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);

    if (
      this.customer instanceof CompanyCustomer &&
      this.customer.isAutomotive
    ) {
      return totalPrice - (totalPrice * this.customer.discount) / 100;
    }

    return totalPrice;
  }
}
