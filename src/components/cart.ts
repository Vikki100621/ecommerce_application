/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { deleteCartbyId, getCart, getCartbyId, getUserCart } from './api/api';
import { LineItem, LineItemAction } from './api/interfaces';
import emptyCart from '../assets/img/empty-cart.png';

export default class Cart {
  lineItems: LineItem[];

  lineItemsDivs: HTMLDivElement[];

  cart = {};

  version: number;

  cartId: string;

  constructor() {
    this.cart = {};
    this.lineItems = [];
    this.lineItemsDivs = [];
    this.version = 1;
    this.cartId = '';
  }

  changeVersion(number: number) {
    this.version = number;
    return this.version;
  }

  getcartId() {
    return this.cartId;
  }

  setCartId(id: string) {
    this.cartId = id;
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

  async handleclickonAddButton(id: string) {
    if (localStorage.getItem('cartId')) {
      const actions = {
        action: 'addLineItem',
        productId: `${id}` as string,
        quantity: 1,
      };
      this.getcartById(actions);
    } else {
      try {
        const response = await getCart();
        localStorage.setItem('cartId', response.data.id);
      } catch (error) {
        console.error(error);
      }

      if (localStorage.getItem('cartId')) {
        const actions = {
          action: 'addLineItem',
          productId: `${id}` as string,
          quantity: 1,
        };
        this.getcartById(actions);
      }
    }
  }

  async handleclickonRemoveButton(id: string) {
    const actions = {
      action: 'removeLineItem',
      lineItemId: `${id}` as string,
    };
    this.getcartById(actions);
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

      const discountedPriceLineItem = lineItem.discountedPrice?.value.centAmount;

      const priceBlock = document.createElement('div');
      priceBlock.classList.add('product__price');

      const discountedPriceElement = document.createElement('div');
      const discountedPrice = lineItem.price.discounted?.value.centAmount;
      const price = document.createElement('div');
      const discounted = lineItem.price.discounted?.value.centAmount;
      const currPrice = lineItem.price.value.centAmount;

      if (discountedPriceLineItem) {
        if (discountedPrice) {
          discountedPriceElement.textContent = `${(discountedPriceLineItem / 100).toString()}$`;
          discountedPriceElement.classList.add('discounted__price');
          if (discounted) price.textContent = `${(discounted / 100).toString()}$`;
          price.classList.remove('current__price');
          price.classList.add('previous__price');
          priceBlock.appendChild(discountedPriceElement);
        } else {
          discountedPriceElement.textContent = `${(discountedPriceLineItem / 100).toString()}$`;
          discountedPriceElement.classList.add('discounted__price');
          price.textContent = `${(currPrice / 100).toString()}$`;
          price.classList.remove('current__price');
          price.classList.add('previous__price');
        }
      } else {
        if (discountedPrice) {
          if (discounted) discountedPriceElement.textContent = `${(discounted / 100).toString()}$`;
          discountedPriceElement.classList.add('discounted__price');
          price.textContent = `${(currPrice / 100).toString()}$`;
          price.classList.add('previous__price');
        } else {
          price.textContent = `${(currPrice / 100).toString()}$`;
          price.classList.remove('previous__price');
          price.classList.add('current__price');
        }
      }
      priceBlock.appendChild(price);
      priceBlock.appendChild(discountedPriceElement);
      productBox.appendChild(priceBlock);

      const totalprice = document.createElement('div');
      totalprice.classList.add('total_price');
      totalprice.textContent = `${(lineItem.totalPrice.centAmount / 100).toString()}$`;
      productBox.appendChild(totalprice);
      if (lineItem.discountedPrice) {
        totalprice.classList.add('new_price');
      }

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

        if (discountedPrice) {
          this.changeCartWrapper(number, id, quantity, totalprice);
        } else {
          this.changeCartWrapper(number, id, quantity, totalprice);
        }
      });

      removeButton.addEventListener('click', () => {
        number = Math.max(number - 1, 0);
        if (number === 0) {
          productBox.remove();
        }

        if (discountedPrice) {
          this.changeCartWrapper(number, id, quantity, totalprice);
        } else {
          this.changeCartWrapper(number, id, quantity, totalprice);
        }
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


  createDeleteButton() {
    const deleteCart = document.createElement('ul');
    deleteCart.classList.add('delete__cart');
    const deleteCartText = document.createElement('div');
    const deleteCartButton = document.createElement('button');
    deleteCartText.textContent = 'Clear the cart';

    const modalWindow = document.getElementById('mymodal') as HTMLDivElement;
  

    const yesbutton = document.getElementById('confirmYes');
    const nobutton = document.getElementById('confirmNo');
    const closebutton = document.getElementById('close');

    deleteCartButton.addEventListener('click', async () => {
      modalWindow.classList.add('active');
      console.log('раота');
    });

    yesbutton?.addEventListener('click', async () => {
      modalWindow.classList.remove('active');
      let versionnumber = Number(localStorage.getItem('cartVersion'));
      if (versionnumber === 0 || !versionnumber) {
        versionnumber = 1;
      }
      const cartId = localStorage.getItem('cartId') as string;
      try {
        const response = await deleteCartbyId(cartId, versionnumber);
        localStorage.removeItem('cartId');
        localStorage.removeItem('cartVersion');
        const section = document.querySelector('.cart__section') as HTMLDivElement;
        const message = this.messageAboutEmptyCart();
        if (section) section.innerHTML = '';
        section.appendChild(message);
        return response;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    });

    nobutton?.addEventListener('click', async () => {
      modalWindow.classList.remove('active');
    });

    closebutton?.addEventListener('click', async () => {
      modalWindow.classList.remove('active');
    });

    deleteCart.appendChild(deleteCartText);
    deleteCart.appendChild(deleteCartButton);
    return deleteCart;
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
    promoInput.placeholder = 'Enter promo code';

    const submitButton = document.createElement('button');
    submitButton.classList.add('promo__code-submit');

    const validPromocode = document.createElement('div');
    validPromocode.classList.add('promo__message');
    if (discountId !== '') {
      validPromocode.classList.add('promo__code-valid');
      if (discountId === '5208150e-6dd4-40f2-8511-f43423d21595') {
        validPromocode.textContent = 'YOUR PROMO CODE IS 092023(SALE FOR PAINTINGS)';
      } else if (discountId === '456f5412-de14-429b-bfee-0ca66435b9b9') {
        validPromocode.textContent = 'YOUR PROMO CODE IS 3422(SALE FOR ALL IF QUNITY MORE THAN 5)';
      }
      const removePromoCodeButton = document.createElement('button');
      validPromocode.appendChild(removePromoCodeButton);
      removePromoCodeButton.classList.add('promo__code-remove');

      removePromoCodeButton.addEventListener('click', async () => {
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
            const priceBlock = productBox?.querySelector('.product__price');
            const totalPriceProducts = productBox?.querySelector('.total_price') as HTMLDivElement;
            const newPrice = totalPriceProducts as HTMLDivElement;
            const centAmount = lineItem.totalPrice.centAmount / 100;
            newPrice.textContent = `${centAmount.toString()}$`;

            if (lineItem.discountedPrice) {
              newPrice.classList.add('new_price');
            } else {
              newPrice.classList.remove('new_price');
            }

            const newPriceContainer = this.renderPrices(lineItem);
            if (priceBlock) {
              priceBlock.replaceWith(newPriceContainer);
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
    console.log(cart);
  }

  async changeCartWrapper(
    number: number,
    id: string,
    quantityel: HTMLDivElement,
    totalPriceItem: HTMLDivElement
    // priceelement: HTMLDivElement,
    // discountedelement?: HTMLDivElement
  ) {
    try {
      const section = document.querySelector('.cart__section');
      await this.changeCartQunity(number, id);
      const numbersEl = quantityel;
      numbersEl.textContent = number.toString();
      const cartdata = await this.getUserCart().then((response) => response.data);
      console.log(cartdata);

      const discountId = cartdata.discountCodes[0]?.discountCode.id;
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
      let cartBLock: HTMLDivElement;

      if (filteredLineItem.length === 0) {
        if (cartdata.discountCodes.length === 0) {
          cartBLock = this.renderCartWithoutDiscount(totalprice) as HTMLDivElement;
        } else {
          cartBLock = this.renderCartWithDiscount(totalprice, totalCentAmount, discountId) as HTMLDivElement;
        }
      }

      if (filteredLineItem.length > 0) {
        const newPrice = filteredLineItem[0].totalPrice.centAmount;
        const total = totalPriceItem;
        total.textContent = `${(newPrice / 100).toString()}$`;

        if (cartdata.discountCodes.length === 0) {
          cartBLock = this.renderCartWithoutDiscount(totalprice) as HTMLDivElement;
        } else {
          cartBLock = this.renderCartWithDiscount(totalprice, totalCentAmount, discountId) as HTMLDivElement;
        }
        const idFilteredProduct = filteredLineItem[0].id;
        const idElement = document.querySelector(`[id="${idFilteredProduct}"]`);
        const productBox = idElement?.parentNode;
        const existingPriceContainer = productBox?.querySelector('.product__price');

        const newPriceContainer = this.renderPrices(filteredLineItem[0]);
        if (existingPriceContainer) {
          existingPriceContainer.replaceWith(newPriceContainer);
        }

        if (filteredLineItem[0].discountedPrice) {
          total.classList.add('new_price');
        } else {
          total.classList.remove('new_price');
        }

        const cartbox = document.querySelector('.cart-wrapper') as HTMLDivElement;

        if (cartbox) {
          section?.removeChild(cartbox);
        }

        if (lineItems.length > 0) {
          section?.appendChild(cartBLock);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  renderPrices(lineItem: LineItem) {
    const discountedPriceLineItem = lineItem.discountedPrice?.value.centAmount;
    const discountedPriceElement = document.createElement('div');
    const discountedPrice = lineItem.price.discounted?.value.centAmount;
    const price = document.createElement('div');
    const discounted = lineItem.price.discounted?.value.centAmount;
    const currPrice = lineItem.price.value.centAmount;

    if (discountedPriceLineItem) {
      if (discountedPrice) {
        discountedPriceElement.textContent = `${(discountedPriceLineItem / 100).toString()}$`;
        discountedPriceElement.classList.add('discounted__price');
        if (discounted) price.textContent = `${(discounted / 100).toString()}$`;
        price.classList.add('previous__price');
      } else {
        discountedPriceElement.textContent = `${(discountedPriceLineItem / 100).toString()}$`;
        discountedPriceElement.classList.add('discounted__price');
        price.textContent = `${(currPrice / 100).toString()}$`;
        price.classList.add('previous__price');
      }
    } else {
      if (discountedPrice) {
        if (discounted) discountedPriceElement.textContent = `${(discounted / 100).toString()}$`;
        discountedPriceElement.classList.add('discounted__price');
        price.textContent = `${(currPrice / 100).toString()}$`;
        price.classList.add('previous__price');
      } else {
        price.textContent = `${(currPrice / 100).toString()}$`;
        price.classList.remove('previous__price');
        price.classList.add('current__price');
      }
    }
    const priceBlock = document.createElement('div');
    priceBlock.appendChild(price);
    priceBlock.appendChild(discountedPriceElement);
    priceBlock.classList.add('product__price');
    return priceBlock;
  }

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
