import { Customer } from '../utils/interface';

export default class State {
  private static customer: Customer | null = null;

  private static password: string | null = null;

  private static id: string | null = null;

  public static getCustomer(): Customer | null {
    return State.customer;
  }

  public static setCustomer(data: Customer): void {
    State.customer = data;
  }

  public static clearCustomer(): void {
    State.customer = null;
  }

  public static setPassword(data: string) {
    State.password = data;
  }

  public static getPassword() {
    return State.password;
  }

  public static setId(data: string) {
    State.id = data;
  }

  public static getId() {
    return State.id;
  }
}
