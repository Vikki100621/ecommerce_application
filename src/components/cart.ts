// import { CartType } from './api/interfaces';
import { getCart, getCartbyId } from './api/api';

export default class Cart {
  cart: object;

  constructor() {
    this.cart = {};
  }

  // eslint-disable-next-line class-methods-use-this
  changeVersion(number: number) {
    const version = number;
    return version;
  }

  async getCart() {
    const cart: object = await getCart().then((response) => response);
    this.cart = cart;
  }

  // eslint-disable-next-line class-methods-use-this
  async handleclickonCart(event: Event) {
    const clickedElement = event.target as HTMLElement;
    let parentID;
    if (clickedElement.parentElement && clickedElement.parentElement.id) {
      parentID = clickedElement.parentElement.id;
    }
    clickedElement.setAttribute('disabled', 'true');
    if (localStorage.getItem('cartId')) {
      const actions = {
        action: 'addLineItem',
        productId: parentID as string,
        quantity: 1,
      };
      try {
        const response = await getCartbyId(actions);
        localStorage.setItem('cartVersion', response.data.version);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await getCart();
        console.log(response.data.id);
        localStorage.setItem('cartId', response.data.id);
        console.log(localStorage.getItem('cartId'));
      } catch (error) {
        console.error(error);
      }
    }
  }
}
