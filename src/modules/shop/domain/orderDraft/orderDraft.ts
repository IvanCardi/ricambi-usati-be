import { Entity } from "../../../../shared";
import { EmptyProducts } from "../_errors/emptyProducts";
import { CarPart } from "../carPart/carPart";
import { CompanyCustomer } from "../customer/companyCustomer/companyCustomer";
import { Customer } from "../customer/customer";
import { ShippingInfo } from "../shippingInfo/shippingInfo";

export type OrderDraftProps = {
  customer?: Customer;
  products: CarPart[];
  info?: ShippingInfo;
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

  get info() {
    return this.props.info;
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

  setInfo(info: ShippingInfo) {
    this.props.info = info;
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
