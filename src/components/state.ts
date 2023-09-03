import { Customer } from "../utils/interface";

export default class State {
  public static customer: Customer | null = null;

  public static getCustomer(): Customer | null {
    return State.customer;
  }

  public static setCustomer(data: Customer): void {
    State.customer = data;
  }

  public static getFN() {
    return State.customer?.firstName ?? 'МАРИНА'
  }

  public static clearCustomer(): void {
    State.customer = null;
  }
}
