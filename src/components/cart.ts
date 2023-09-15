import { getCart, getCartbyId, getUserCart } from './api/api';
import { LineItem, LineItemAction } from './api/interfaces';
import emptyCart from '../assets/img/empty-cart.png';

export default class Cart {
  lineItems: LineItem[];

  lineItemsDivs: HTMLDivElement[];

  cart = {};

  constructor() {
    this.cart = {};
    this.lineItems = [];
    this.lineItemsDivs = [];
  }

  // eslint-disable-next-line class-methods-use-this
  changeVersion(number: number) {
    const version = number;
    return version;
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
      this.getcartById(actions);
    } else {
      try {
        const response = await getCart();
        localStorage.setItem('cartId', response.data.id);
        localStorage.setItem('anonymousId', response.data.anonymousId);
      } catch (error) {
        console.error(error);
      }
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
        this.getcartById(actions);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getcartById(actions: LineItemAction) {
    let versionnumber = Number(localStorage.getItem('cartVersion'));
    if (versionnumber === 0 || !versionnumber) {
      versionnumber = 1;
    }
    const cartId = localStorage.getItem('cartId') as string;
    try {
      const response = await getCartbyId(cartId, actions, versionnumber);
      localStorage.setItem('cartVersion', response.data.version);
    } catch (error) {
      console.error(error);
    }
  }

  async renderCartItems(lineItems: LineItem[]) {
    if (lineItems) this.lineItemsDivs = [];

    lineItems.forEach((lineItem) => {
      const { id } = lineItem;

      const productBox = document.createElement('div');
      productBox.classList.add('product__card');
      const img = document.createElement('img');
      img.classList.add('product__img');
      img.src = lineItem.variant.images[0].url;
      img.alt = lineItem.name['en-US'];

      productBox.appendChild(img);

      const title = document.createElement('p');
      title.classList.add('product__title');
      title.textContent = lineItem.name['en-US'];
      productBox.appendChild(title);

      const buttonsBlock = document.createElement('div');
      buttonsBlock.classList.add('buttonsBlock');
      buttonsBlock.id = id;
      const addButton = document.createElement('button');
      const removeButton = document.createElement('button');
      const quantity = document.createElement('div');

      removeButton.classList.add('remove__button');
      removeButton.textContent = '-';
      buttonsBlock.appendChild(removeButton);

      quantity.classList.add('quantity');
      quantity.textContent = lineItem.quantity.toString();
      buttonsBlock.appendChild(quantity);

      addButton.classList.add('add__button');
      addButton.textContent = '+';
      buttonsBlock.appendChild(addButton);

      productBox.appendChild(buttonsBlock);

      const priceBlock = document.createElement('div');
      priceBlock.classList.add('product__price');
      const price = document.createElement('p');

      const priseValue = lineItem.price.value.centAmount;
      const formattedNumber = (priseValue / 100).toString();
      price.textContent = `${formattedNumber}$`;
      priceBlock.appendChild(price);
      price.classList.add('current__price');

      const discountedPrice = lineItem.price.discounted?.value.centAmount;
      if (discountedPrice) {
        const formateddiscountedPrice = (discountedPrice / 100).toString();
        const discountedPriceElement = document.createElement('p');
        discountedPriceElement.classList.add('discounted__price');
        price.classList.add('previous__price');
        discountedPriceElement.textContent = `${formateddiscountedPrice}$`;
        priceBlock.appendChild(discountedPriceElement);
      }

      productBox.appendChild(priceBlock);

      const totalprice = document.createElement('div');
      totalprice.textContent = `${(lineItem.totalPrice.centAmount / 100).toString()}$`;
      productBox.appendChild(totalprice);

      const trash = document.createElement('div');
      trash.classList.add('product__trash');
      productBox.appendChild(trash);

      let number = parseInt(quantity.textContent || '0', 10);

      trash.addEventListener('click', async () => {
        this.changeCartQunity(0, id);
        productBox.remove();
        this.changeCartWrapper(0, id, quantity, totalprice);
      });

      addButton.addEventListener('click', () => {
        number += 1;
        this.changeCartWrapper(number, id, quantity, totalprice);
      });
      removeButton.addEventListener('click', () => {
        number = Math.max(number - 1, 0);
        this.changeCartQunity(number, id);
        if (number === 0) {
          productBox.remove();
        }
        this.changeCartWrapper(number, id, quantity, totalprice);
      });

      this.lineItemsDivs.push(productBox);
    });
    return this.lineItemsDivs;
  }

  async getUserCartItems() {
    const response = await getUserCart().then((cart) => cart);
    this.lineItems = response.data.lineItems;
    return response.data.lineItems;
  }

  async getQuantity(): Promise<number> {
    const lineitems = await this.getUserCartItems().then((response) => response);
    const totalQuantity = lineitems.reduce((total: number, item: LineItem) => total + item.quantity, 0);
    return totalQuantity;
  }

  async getUserCart() {
    const response = await getUserCart().then((cart) => cart);
    this.cart = response;
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  renderCart(prices: number[]) {
    const cart = document.createElement('div');
    cart.classList.add('cart-wrapper');

    const itemsNames = ['Total', 'Discount', 'Grand Total', 'Promo Code'];

    itemsNames.forEach((item) => {
      const itemEl = document.createElement('ul');
      const itemName = document.createElement('div');
      itemName.textContent = item;
      const itemPrice = document.createElement('div');
      prices.forEach((cartprice) => {
        itemPrice.textContent = `${(cartprice / 100).toString()}$`;
      });

      itemEl.appendChild(itemName);
      itemEl.appendChild(itemPrice);
      cart.appendChild(itemEl);
    });
    return cart;
  }

  async changeCartQunity(number: number, productId: string) {
    const actions = {
      action: 'changeLineItemQuantity',
      lineItemId: `${productId}`,
      quantity: number,
    };
    const responce = await this.getcartById(actions).then((respo) => console.log(respo));
    console.log(responce);
  }

  async changeCartWrapper(number: number, id: string, quantityel: HTMLDivElement, totalPriceItem: HTMLDivElement) {
    const section = document.querySelector('.cart__section');
    await this.changeCartQunity(number, id);
    const numbersEl = quantityel;
    numbersEl.textContent = number.toString();

    const cartdata = await this.getUserCart().then((response) => response.data);
    const totalprice = cartdata.totalPrice.centAmount;
    const { lineItems } = cartdata;
    if (lineItems.length === 0) {
      if (section) section.innerHTML = '';
      const messageblock = this.messageAboutEmptyCart();
      section?.appendChild(messageblock);
    }
    const filteredLineItem = lineItems.filter((lineitem: { id: string }) => lineitem.id === id);
    if (filteredLineItem > 0) {
      const newPrice = filteredLineItem[0].totalPrice.centAmount;
      const total = totalPriceItem;
      total.textContent = `${(newPrice / 100).toString()}$`;
    }
    const cartwrapper = this.renderCart([totalprice, totalprice, totalprice, totalprice]);
    const cartbox = document.querySelector('.cart-wrapper') as HTMLDivElement;

    if (cartbox) {
      section?.removeChild(cartbox);
    }
    if (lineItems.length > 0) {
      section?.appendChild(cartwrapper);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  messageAboutEmptyCart() {
    const messageblock = document.createElement('div');
    const img = document.createElement('img');
    img.src = emptyCart;
    const message = document.createElement('div');
    message.textContent = 'Your cart is empty!';
    const link = document.createElement('a');
    link.textContent = 'Continue shopping';
    link.href = '#/catalog';
    messageblock.classList.add('empty-cart');
    messageblock.appendChild(img);
    messageblock.appendChild(message);
    messageblock.appendChild(link);
    return messageblock;
  }
}
