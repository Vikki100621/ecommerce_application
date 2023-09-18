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

  async createCart() {
    if (!localStorage.getItem('cartId')) {
      try {
        const response = await getCart().then((responce) => responce);
        this.cart = response;
        localStorage.setItem('cartId', response.data.id);
      } catch (error) {
        console.error(error);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async handleclickonCart(event: Event) {
    console.log('я вызвалась');
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
      return response;
    } catch (error) {
      console.error(error);
      return undefined;
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
      totalprice.classList.add('total_price');
      totalprice.textContent = `${(lineItem.totalPrice.centAmount / 100).toString()}$`;
      productBox.appendChild(totalprice);
      // const totalPriceText = totalprice.textContent;
      // // if (totalPriceText) {
      // //   const totalPriceValue = parseFloat(totalPriceText.replace('$', ''));
      // //   // totalPriceValue содержит число без знака "$"
      // // }
      const trash = document.createElement('div');
      trash.classList.add('product__trash');
      productBox.appendChild(trash);

      let number = parseInt(quantity.textContent || '0', 10);

      trash.addEventListener('click', async () => {
        this.changeCartWrapper(0, id, quantity, totalprice);
        productBox.remove();
      });

      addButton.addEventListener('click', () => {
        number += 1;
        this.changeCartWrapper(number, id, quantity, totalprice);
      });

      removeButton.addEventListener('click', () => {
        number = Math.max(number - 1, 0);
        if (number === 0) {
          productBox.remove();
        }
        this.changeCartWrapper(number, id, quantity, totalprice);
      });

      this.lineItemsDivs.push(productBox);
    });
    return this.lineItemsDivs;
  }

  async getUserCart() {
    const response = await getUserCart().then((cart) => cart);
    this.cart = response;
    return response;
  }

  renderCartWithoutDiscount(price: number) {
    const cart = document.createElement('div');
    cart.classList.add('cart-wrapper');

    const totalEl = document.createElement('ul');
    const totalName = document.createElement('div');
    totalName.textContent = 'Total';
    const totalPrice = document.createElement('div');
    totalPrice.textContent = `${(price / 100).toString()}$`;
    const promoContainer = this.createInputPromo('');
    totalEl.appendChild(totalName);
    totalEl.appendChild(totalPrice);
    cart.appendChild(totalEl);
    cart.appendChild(promoContainer);
    return cart;
  }

  createInputPromo(discountId: string) {
    const promoContainer = document.createElement('div');
    promoContainer.classList.add('promo-container');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('inputContainer');

    const promoInput = document.createElement('input');
    promoInput.classList.add('promo__code-input');
    promoInput.placeholder = 'Введите промокод';

    const submitButton = document.createElement('button');
    submitButton.classList.add('promo__code-submit');

    const validPromocode = document.createElement('div');
    validPromocode.classList.add('promo__message');
    if (discountId !== '') {
      validPromocode.classList.add('promo__code-valid');
      if (discountId === '5208150e-6dd4-40f2-8511-f43423d21595') {
        validPromocode.textContent = 'YOUR PROMO IS 092023(SALE FOR PAINTINGS)';
      } else if (discountId === '456f5412-de14-429b-bfee-0ca66435b9b9') {
        validPromocode.textContent = 'YOUR PROMO IS 3422(SALE FOR ALL IF QUNITY MORE THAN 5)';
      }
      const removePromoCodeButton = document.createElement('button');
      validPromocode.appendChild(removePromoCodeButton);
      removePromoCodeButton.classList.add('promo__code-remove');

      removePromoCodeButton.addEventListener('click', async () => {
        console.log(discountId);
        const deleteActions = {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: `${discountId}`,
          },
        };
        const deleteValidPromoCode = await this.getcartById(deleteActions).then((cartdatas) => cartdatas);
        const total = deleteValidPromoCode?.data.totalPrice.centAmount;
        const cart = this.renderCartWithoutDiscount(total);
        const existingCartContainer = document.querySelector('.cart-wrapper');

        if (existingCartContainer) {
          existingCartContainer.replaceWith(cart);
        }
        const lineItems = deleteValidPromoCode?.data.lineItems;
        const cartItems = await this.renderCartItems(lineItems);
        const section = document.querySelector('.lineitems-wrapper') as HTMLDivElement;
        const wrapper = section;
        if (wrapper) wrapper.innerHTML = '';

        cartItems.forEach((item) => wrapper.appendChild(item));
      });
    }

    submitButton.addEventListener('click', async () => {
      if (discountId !== '') {
        const deleteActions = {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: `${discountId}`,
          },
        };

        const deleteValidPromoCode = await this.getcartById(deleteActions).then((cartdatas) => cartdatas);
        console.log(deleteValidPromoCode);
      }
        const promoCode = promoInput.value.toString();

        if (promoCode !== '092023' && promoCode !== '3422') {
          validPromocode.textContent = 'Invalid promo code';
        } else {
          const actions = {
            action: 'addDiscountCode',
            code: `${promoCode}`,
          };

          const cartdata = await this.getcartById(actions).then((cartdatas) => cartdatas);
          const discountid = cartdata?.data.discountCodes[0].discountCode.id;
          const grandtotal = cartdata?.data.totalPrice.centAmount;
          const lineItems: LineItem[] = cartdata?.data.lineItems;
          const products = document.querySelectorAll('.product__card');
          const ids: string[] = [];

          products.forEach((product) => {
            const buttonsBlock = product.querySelector('.buttonsBlock');
            const id = buttonsBlock?.getAttribute('id') as string;
            ids.push(id);
          });

          lineItems.forEach((lineItem) => {
            if (ids.includes(lineItem.id)) {
              const buttonsBlock = document.querySelector(`[id="${lineItem.id}"]`);
              const productBox = buttonsBlock?.parentNode;
              const totalPriceProducts = productBox?.querySelector('.total_price') as HTMLDivElement;
              const totalPriceText = totalPriceProducts?.textContent as string;
              const totalPriceValue = parseFloat(totalPriceText);
              const newPrice = totalPriceProducts as HTMLDivElement;
              const centAmount = lineItem.totalPrice.centAmount / 100;
              newPrice.textContent = `${centAmount.toString()}$`;

              if (centAmount > totalPriceValue) {
                newPrice.style.color = '#f01616';
                newPrice.style.fontWeight = '700';
              }
            }
          });

          const totalCentAmount = lineItems.reduce((total: number, lineItem: LineItem) => {
            const prices = lineItem.price.discounted?.value.centAmount || lineItem.price.value.centAmount;
            return total + prices * lineItem.quantity;
          }, 0);
          this.renderCartWithDiscount(grandtotal, totalCentAmount, discountid);
        }
    });

    inputContainer.appendChild(promoInput);
    inputContainer.appendChild(submitButton);
    promoContainer.appendChild(inputContainer);

    promoContainer.appendChild(validPromocode);
    return promoContainer;
  }

  // eslint-disable-next-line class-methods-use-this
  renderCartWithDiscount(price: number, lineitemsPrice: number, discountId: string) {
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-wrapper');
    const totalEl = document.createElement('ul');
    const totalName = document.createElement('div');
    totalName.textContent = 'Total';
    const totalPrice = document.createElement('div');
    totalPrice.textContent = `${(lineitemsPrice / 100).toString()}$`;
    totalEl.appendChild(totalName);
    totalEl.appendChild(totalPrice);
    const discountEl = document.createElement('ul');
    const discountName = document.createElement('div');
    discountName.textContent = 'Discount';
    discountName.classList.add('discountEl');
    const discountPrice = document.createElement('div');
    discountPrice.textContent = '';

    const grandTotalEl = document.createElement('ul');
    const grandTotalName = document.createElement('div');
    grandTotalName.textContent = 'Grand Total';
    const grandTotalPrice = document.createElement('div');
    grandTotalPrice.textContent = '';

    const discountValue = lineitemsPrice - price;

    discountPrice.textContent = `${(discountValue / 100).toString()}$`;
    grandTotalPrice.textContent = `${(price / 100).toString()}$`;

    discountEl.appendChild(discountName);
    discountEl.appendChild(discountPrice);

    grandTotalEl.appendChild(grandTotalName);
    grandTotalEl.appendChild(grandTotalPrice);
    const promoContainer = this.createInputPromo(discountId);

    cartContainer?.appendChild(totalEl);
    cartContainer?.appendChild(discountEl);
    cartContainer?.appendChild(grandTotalEl);
    cartContainer?.appendChild(promoContainer);

    const existingCartContainer = document.querySelector('.cart-wrapper');

    if (existingCartContainer) {
      existingCartContainer.replaceWith(cartContainer);
    }

    if (discountValue === 0) {
      discountEl.remove();
      grandTotalEl.remove();
    }

    const discountElContainer = cartContainer.querySelector('.discountEl');
    const validPromocode = promoContainer.querySelector('.promo__message');
    const prom = validPromocode;
    if (discountElContainer === null) {
      if (prom) prom.textContent = 'There are no eligible items in the cart for the promo code!';
    }
    return cartContainer;
  }

  async changeCartQunity(number: number, productId: string) {
    const actions = {
      action: 'changeLineItemQuantity',
      lineItemId: `${productId}`,
      quantity: number,
    };
    const cart = await this.getcartById(actions).then((cartdata) => cartdata);
    console.log(cart?.data);
  }

  async changeCartWrapper(number: number, id: string, quantityel: HTMLDivElement, totalPriceItem: HTMLDivElement) {
    try {
      const section = document.querySelector('.cart__section');
      await this.changeCartQunity(number, id);
      const numbersEl = quantityel;
      numbersEl.textContent = number.toString();
      const cartdata = await this.getUserCart().then((response) => response.data);

      const discountId = cartdata.discountCodes[0].discountCode.id;
      const totalprice = cartdata.totalPrice.centAmount;
      const { lineItems } = cartdata;

      const totalCentAmount = lineItems.reduce((total: number, lineItem: LineItem) => {
        const price = lineItem.price.discounted?.value.centAmount || lineItem.price.value.centAmount;
        return total + price * lineItem.quantity;
      }, 0);

      if (lineItems.length === 0) {
        if (section) section.innerHTML = '';
        const messageblock = this.messageAboutEmptyCart();
        section?.appendChild(messageblock);
      }
      const filteredLineItem = lineItems.filter((lineitem: { id: string }) => lineitem.id === id);
      if (filteredLineItem.length > 0) {
        const newPrice = filteredLineItem[0].totalPrice.centAmount;
        const total = totalPriceItem;
        total.textContent = `${(newPrice / 100).toString()}$`;
      }
      let cartBLock: HTMLDivElement;

      if (cartdata.discountCodes.length === 0) {
        cartBLock = this.renderCartWithoutDiscount(totalprice) as HTMLDivElement;
      } else {
        cartBLock = this.renderCartWithDiscount(totalprice, totalCentAmount, discountId) as HTMLDivElement;
      }

      const cartbox = document.querySelector('.cart-wrapper') as HTMLDivElement;

      if (cartbox) {
        section?.removeChild(cartbox);
      }
      if (lineItems.length > 0) {
        section?.appendChild(cartBLock);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
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
