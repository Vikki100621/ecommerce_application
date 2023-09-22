import content from './content';
import basketImageSrc from '../assets/img/shopping-cart.png';
import basketImageSrcBlack from '../assets/img/shopping-cart-black.png';
import LoginView from './login';
import Registration from './registration';
import NewCollection from '../assets/img/new-collection.jpg';
import Instagram from '../assets/img/instagram.png';
import Clock from '../assets/img/clock.png';
import Products from './product';
import Sorting from './sort';
import ProductPage from './productPage/productPage';
import { getProduct } from './api/api';
import UserView from './user';
import Cart from './cart';
import AboutView from './about/aboutView';
import team from './about/teamInformation';
import { LineItem } from './api/interfaces';
import returnElement from './common/returnElem';

export default class App {
  public header: HTMLElement;

  public footer: HTMLElement;

  public main: HTMLElement;

  public body: HTMLBodyElement | null;

  public modal: HTMLDivElement;

  public templates: { [key: string]: () => void } = {};

  private registration: Registration;

  public sorting: Sorting;

  public products: Products;

  public productContainer: HTMLElement;

  public lineItemsWrapper: HTMLElement;

  public cart: Cart;

  public cartItems: HTMLDivElement[];

  constructor() {
    this.body = document.querySelector('body');
    this.header = this.createHeader();
    this.main = this.createMain();
    this.footer = this.createFooter();
    this.modal = this.showModal();
    this.productContainer = document.createElement('div');
    this.lineItemsWrapper = document.createElement('div');
    this.productContainer.classList.add('product__container');
    this.products = new Products();
    this.sorting = new Sorting();
    this.registration = new Registration();
    this.cart = new Cart();
    this.cartItems = [];
  }

  registerTemplate(name: string, templateFunction: () => void) {
    this.templates[name] = templateFunction;
  }

  getTemplateFunction(name: string) {
    const templateFunction = this.templates[name];
    if (!templateFunction) {
      throw new Error(`Template function for "${name}" not found.`);
    }
    return templateFunction;
  }

  // рисуем домашнюю страницу
  showHomePage() {
    const element = document.querySelector('.burger__menu-icon');
    element?.classList.remove('dark__color');

    const img = document.querySelector('.item-basket img') as HTMLImageElement;
    // const div = document.querySelector('.item-basket div') as HTMLElement;

    img.src = basketImageSrc;
    // div.style.border = '2px solid #e4d4be';

    this.main.innerHTML = '';
    this.header.style.color = '#e4d4be';
    const backgroundClasses = ['img-background', 'dark-background', 'light-background', 'dark-background'];
    const sectionClasses = [
      'welcome__section',
      'new-collection__section',
      'special-offer__section',
      'contact__section',
    ];
    const sectionTexts = [`${content.welcome}`, `${content.collection}`];

    for (let i = 0; i < 4; i += 1) {
      const background = document.createElement('div');
      background.classList.add('background', backgroundClasses[i]);

      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      background.appendChild(wrapper);

      const section = document.createElement('section');
      section.classList.add('section', sectionClasses[i]);
      wrapper.appendChild(section);

      if (section.classList.contains('welcome__section')) {
        const welcomeText = document.createElement('p');
        welcomeText.textContent = sectionTexts[i];

        section.appendChild(welcomeText);
      }

      if (section.classList.contains('new-collection__section')) {
        const newCollectionDiv = document.createElement('div');
        newCollectionDiv.classList.add('newCollection__content');
        const newCollectionImage = document.createElement('img');
        newCollectionImage.classList.add('newCollectionDiv__img');
        newCollectionImage.src = NewCollection;
        newCollectionDiv.appendChild(newCollectionImage);
        const newCollectionRigth = document.createElement('div');
        newCollectionRigth.classList.add('newCollection_rigth_content');
        const newCollctionText = document.createElement('p');
        newCollctionText.textContent = sectionTexts[i];
        const el = document.createElement('div');
        const title = document.createElement('div');
        title.textContent = 'TO BUY OUR PRODUCTS';
        el.classList.add('buy__block');
        const btnBlock = document.createElement('btn__block');
        btnBlock.classList.add('btn__block');
        const logBtn = document.createElement('button');
        logBtn.classList.add('login_btn');
        logBtn.textContent = 'LOGIN';
        logBtn.onclick = () => {
          if (!(localStorage.getItem('isLoggedIn') === 'true') || !localStorage.getItem('isLoggedIn')) {
            window.location.hash = '/login';
          } else {
            window.location.hash = '/';
          }
        };
        const regBtn = document.createElement('button');
        regBtn.classList.add('reg_btn');
        regBtn.textContent = 'REGISTER';
        if (localStorage.getItem('isLoggedIn') === 'true') {
          regBtn.disabled = true;
        } else {
          regBtn.onclick = () => {
            window.location.hash = '/register';
          };
        }
        btnBlock.appendChild(regBtn);
        btnBlock.appendChild(logBtn);
        el.appendChild(title);
        el.appendChild(btnBlock);
        newCollectionRigth.appendChild(newCollctionText);
        newCollectionRigth.appendChild(el);
        newCollectionDiv.appendChild(newCollectionRigth);

        section.appendChild(newCollectionDiv);
      }

      if (section.classList.contains('special-offer__section')) {
        const offerTitle = document.createElement('h2');
        offerTitle.textContent = 'Special Offer';
        section.appendChild(offerTitle);
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('special-offer__content');
        const offerText = document.createElement('p');
        offerText.textContent = "USE PROMO CODE '092023' FOR A 50% DISCOUNT ON ALL PAINTINGS!";
        offerText.addEventListener('click', () => {
          window.location.hash = '/cart';
        });
        const offerTextTwo = document.createElement('p');
        offerTextTwo.textContent =
          "USE PROMO CODE '3422' FOR A 30% DISCOUNT ON ALL PRODUCTS WHEN YOU PURCHASE 5 OR MORE OF THE SAME ITEM.";
        offerTextTwo.addEventListener('click', () => {
          window.location.hash = '/cart';
        });
        offerDiv.appendChild(offerTextTwo);
        offerDiv.appendChild(offerText);
        section.appendChild(offerDiv);
      }
      this.main.appendChild(background);
    }
  }

  showAboutPage() {
    this.clearMain();
    const section = new AboutView(team).getHtmlElement();
    this.main.appendChild(section);
  }

  async showCatalogPage() {
    this.clearMain();

    const section = returnElement({ tag: 'section', classes: ['product__section'] });

    const productsInstance = this.products;
    const productDivs = await productsInstance
      .createProducts()
      .then((response) => this.products.renderProducts(response));
    if (localStorage.getItem('cartId')) {
      productDivs.forEach(async (product) => {
        const productId = product.id;
        const isProductInCart = await this.products.checkProduct(productId);
        const addToCartButton = product.querySelector('.cart__button') as HTMLButtonElement;
        if (isProductInCart) {
          addToCartButton.disabled = true;
          addToCartButton.textContent = 'Added to cart';
        } else {
          addToCartButton.disabled = false;
        }
      });
    }

    const sort = this.sorting;
    const { sortBlock } = sort;
    const rightContent: HTMLDivElement = <HTMLDivElement>sort.rightsideSortBlock;
    const paginationOptions = returnElement({ tag: 'div', classes: ['pagination'] });
    const itemsPerPageSelect: HTMLSelectElement = <HTMLSelectElement>(
      returnElement({ tag: 'select', classes: ['pagination__choose-items'], id: 'pagination-select' })
    );
    const labelItemsPagination = returnElement({
      tag: 'label',
      classes: ['pagination__choose-label'],
      textContent: 'Items per page: ',
      attrib: [{ name: 'for', value: 'pagination-select' }],
    });
    const items4 = returnElement({
      tag: 'option',
      classes: ['pagination__num-items'],
      textContent: '4',
      attrib: [{ name: 'selected', value: 'true' }],
    });
    const items8 = returnElement({ tag: 'option', classes: ['pagination__num-items'], textContent: '8' });
    const items12 = returnElement({ tag: 'option', classes: ['pagination__num-items'], textContent: '12' });
    const paginationNumPagesWrapper = returnElement({ tag: 'div', classes: ['pagination__num-pages-wrap'] });
    const paginationNumPagesTitle = returnElement({
      tag: 'div',
      classes: ['pagination__num-pages-title'],
      textContent: 'Page: ',
    });
    const paginationNumPagesList = returnElement({ tag: 'div', classes: ['pagination__num-pages-pages'] });
    paginationNumPagesWrapper.append(paginationNumPagesTitle, paginationNumPagesList);
    itemsPerPageSelect.append(items4, items8, items12);
    paginationOptions.append(labelItemsPagination);
    paginationOptions.append(itemsPerPageSelect);

    const productsWrapper = this.productContainer;

    let currentPage = 0;
    const numPages: HTMLElement[] = [];

    function returnElemPageNum(num: string) {
      const elemPageNum = returnElement({ tag: 'div', classes: ['pagination__num-pages-page'], textContent: num });
      return elemPageNum;
    }

    function selectCurrentPage() {
      numPages[currentPage].classList.add('pagination__num-pages-page_active');
    }

    function drawNumPages(num: number) {
      paginationNumPagesList.innerHTML = '';
      numPages.length = 0;
      for (let i = 1; i <= num; i += 1) {
        const pageItem = returnElemPageNum(String(i));
        numPages.push(pageItem);
        paginationNumPagesList.append(pageItem);
      }
      selectCurrentPage();
    }

    function deSelectCurrentPage() {
      numPages[currentPage].classList.remove('pagination__num-pages-page_active');
    }

    function drawItems() {
      const numOfItems = Number(itemsPerPageSelect.value);
      const numOfPages = Math.ceil(productDivs.length / numOfItems);

      if (currentPage > numOfPages - 1) {
        deSelectCurrentPage();
        currentPage = 0;
        selectCurrentPage();
      }

      const offset = currentPage * numOfItems;

      drawNumPages(numOfPages);
      productsWrapper.innerHTML = '';

      for (let i = 0 + offset; i < numOfItems + offset; i += 1) {
        if (productDivs[i]) {
          productsWrapper.append(productDivs[i]);
        }
      }
    }

    drawItems();

    function choosePage(evt: Event) {
      const pageNumDiv: HTMLDivElement = <HTMLDivElement>evt.target;
      if (pageNumDiv.classList.contains('pagination__num-pages-page')) {
        const pageNum: string = <string>pageNumDiv.textContent;
        deSelectCurrentPage();
        currentPage = +pageNum - 1;
        selectCurrentPage();
        drawItems();
      }
    }

    if (sortBlock) {
      section.appendChild(sortBlock);
    }

    this.main.appendChild(section);

    if (document.getElementById('pagination-select') === null) {
      rightContent.append(paginationOptions);
      rightContent.append(paginationNumPagesWrapper);
      rightContent.append(this.productContainer);
      itemsPerPageSelect.addEventListener('change', drawItems);
      paginationNumPagesList.addEventListener('click', choosePage);
    }
  }

  async showProductPage(id: string | null) {
    if (id) {
      this.clearMain();
      const responseData = await getProduct(id);
      const productData = responseData.data;
      const productPage = new ProductPage(productData);
      productPage.draw();
      productPage.addBasketButtons();
      productPage.addSlider();
      productPage.addPrice();
    }
  }

  // здесь будет отрисовываться инфо о доставке
  showDeliveryPage() {
    this.clearMain();
    const section = document.createElement('section');
    section.innerText = 'Not completed yet';
    this.main.appendChild(section);
  }

  // здесь будет отрисовываться инфо с контактами
  showContactsPage() {
    this.clearMain();
    const section = document.createElement('section');
    section.innerText = 'Not completed yet';
    this.main.appendChild(section);
  }

  // Использовать в работе Валере для реализации входа
  showSignInPage() {
    this.clearMain();
    const loginPage = new LoginView().getHtmlElement();
    this.main.appendChild(loginPage);
  }

  // Использовать в работе Леше (сначала нарисовать, можно взять стили из section__login)
  showRegisterPage() {
    this.clearMain();
    this.registration.draw();
    this.registration.checkForm();
    this.registration.addAddressListener();
  }

  show404Page() {
    this.clearMain();
    const errorSection = document.createElement('section');
    errorSection.classList.add('section__error');
    const notFoundContent = `
    <h1>4<img src="${Clock}" alt="Clock" width="100">4</h1>
    <p>The page you're looking for could not be found.</p>
    <a href="#/">Return to Main Page</a>
  `;
    errorSection.innerHTML = notFoundContent;
    this.main.appendChild(errorSection);
  }

  showUserPage() {
    this.clearMain();
    const userPage = new UserView();
    this.main.appendChild(userPage.getHtmlElement());
  }

  showModal() {
    const modal = document.createElement('div');
    modal.id = 'mymodal';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeBtn = document.createElement('div');
    closeBtn.id = 'close';
    closeBtn.innerHTML = '&times;';

    const question = document.createElement('p');
    question.textContent = 'Are you sure you want to clear the cart?';

    const yesBtn = document.createElement('button');
    yesBtn.id = 'confirmYes';
    yesBtn.textContent = 'YES';

    const noBtn = document.createElement('button');
    noBtn.id = 'confirmNo';
    noBtn.textContent = 'NO';

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(question);
    modalContent.appendChild(yesBtn);
    modalContent.appendChild(noBtn);
    modal.appendChild(modalContent);
    this.body?.appendChild(modal)
    return this.modal;
  }
  
  async showCartPage() {
    this.clearMain();
    const section = document.createElement('section');
    section.classList.add('cart__section');
    if (!localStorage.getItem('cartId')) {
      try {
        console.log('я создала корзину');
        this.cart.createCart().then((responce) => responce);
        const message = this.cart.messageAboutEmptyCart();
        section.appendChild(message);
        this.main.appendChild(section);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.lineItemsWrapper.classList.add('lineitems-wrapper');
      this.lineItemsWrapper.innerHTML = '';
      const cartInstance = this.cart;
      const cart = await cartInstance.getUserCart().then((cartdata) => cartdata);
      console.log(cart.data);
      const { lineItems } = cart.data;
      if (lineItems.length > 0) {
        const render = await this.cart.renderCartItems(lineItems);
        this.cartItems = [...lineItems];
        render.forEach((line) => this.lineItemsWrapper.appendChild(line));
        const deleteCart = this.cart.createDeleteButton();
        this.lineItemsWrapper.appendChild(deleteCart);
        section.appendChild(this.lineItemsWrapper);

        const totalCentAmount = lineItems.reduce((total: number, lineItem: LineItem) => {
          const price = lineItem.price.discounted?.value.centAmount || lineItem.price.value.centAmount;
          return total + price * lineItem.quantity;
        }, 0);

        const totalPrice = cart.data.totalPrice.centAmount;

        const discountId = cart.data.discountCodes[0]?.discountCode.id;

        if (cart.data.discountCodes.length === 0) {
          const cartBLock = cartInstance.renderCartWithoutDiscount(totalPrice) as HTMLDivElement;
          section.appendChild(cartBLock);
        } else {
          const cartBLock = cartInstance.renderCartWithDiscount(
            totalPrice,
            totalCentAmount,
            discountId
          ) as HTMLDivElement;
          section.appendChild(cartBLock);
        }

        this.main.appendChild(section);
      } else {
        const message = this.cart.messageAboutEmptyCart();
        section.appendChild(message);
        this.main.appendChild(section);
      }
    }
  }

  createHeader() {
    this.header = document.createElement('header');
    this.header.id = 'header';
    this.body?.appendChild(this.header);
    const background = document.createElement('div');
    background.classList.add('background');
    background.classList.add('img-background');
    this.header.appendChild(background);
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.classList.add('header-wrapper');
    background.appendChild(wrapper);

    const leftContent = document.createElement('div');
    leftContent.classList.add('left-content');
    leftContent.textContent = content.title;
    wrapper.appendChild(leftContent);
    const rightContent = document.createElement('div');
    rightContent.classList.add('right-content');
    wrapper.appendChild(rightContent);
    const burgerMenu = document.createElement('div');
    burgerMenu.classList.add('burger__menu');
    const burgerIcon = document.createElement('div');
    burgerIcon.classList.add('burger__menu-icon');
    const burgerLine = document.createElement('span');
    burgerLine.classList.add('burger__menu-line');
    const nav = document.createElement('nav');
    nav.classList.add('menu');
    const ul = document.createElement('ul');
    ul.classList.add('menu-list');
    const menuItems = content.menuItems as string[];

    menuItems.forEach((itemText) => {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      li.textContent = itemText;
      ul.appendChild(li);
    });

    const clientLi = document.createElement('li');
    clientLi.classList.add('item-client');
    clientLi.classList.add('menu-item');
    const signIn = document.createElement('div');
    const separator = document.createElement('div');
    const register = document.createElement('div');
    signIn.classList.add('login');
    register.classList.add('register');

    if (!(localStorage.getItem('isLoggedIn') === 'true')) {
      signIn.textContent = content.login;
      register.textContent = content.register;
    } else {
      signIn.textContent = content.profile;
      register.textContent = content.logout;
    }
    separator.textContent = '|';
    clientLi.appendChild(signIn);
    clientLi.appendChild(separator);
    clientLi.appendChild(register);
    ul.appendChild(clientLi);

    const basketLi = document.createElement('li');
    basketLi.classList.add('item-basket');
    basketLi.classList.add('menu-item');
    const basketImage = document.createElement('img');
    // const numbersOfProducts = document.createElement('div');
    // numbersOfProducts.classList.add('products__numbres');

    // numbersOfProducts.textContent = `${quantity}`;
    basketImage.src = basketImageSrc;
    basketLi.appendChild(basketImage);
    // basketLi.appendChild(numbersOfProducts);
    ul.appendChild(basketLi);

    const overLay = document.createElement('div');
    overLay.classList.add('burger__menu-overlay');

    nav.appendChild(ul);
    burgerIcon.appendChild(burgerLine);
    burgerMenu.appendChild(burgerIcon);
    burgerMenu.appendChild(nav);
    rightContent.appendChild(burgerMenu);
    rightContent.appendChild(overLay);
    return this.header;
  }

  // создаем main(он пустой, так как будет меняться)
  createMain() {
    this.main = document.createElement('main');
    this.main.id = 'main';
    this.body?.appendChild(this.main);
    return this.main;
  }

  clearMain() {
    this.main.innerHTML = '';
    this.main.classList.add('light-background');
    this.header.style.color = '#100e0e';

    const element = document.querySelector('.burger__menu-icon');
    element?.classList.add('dark__color');

    const img = document.querySelector('.item-basket img') as HTMLImageElement;
    // const div = document.querySelector('.item-basket div') as HTMLElement;

    img.src = basketImageSrcBlack;
    // div.style.border = '2px solid rgb(16, 14, 14)';
  }

  // создаем footer(он не будет меняться больше)
  createFooter() {
    this.footer = document.createElement('footer');
    this.footer.id = 'footer';
    this.body?.appendChild(this.footer);

    const background = document.createElement('div');
    background.classList.add('background', 'dark-background');
    this.footer.appendChild(background);

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.classList.add('footer-wrapper');
    background.appendChild(wrapper);

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('footer__contact');
    const contactInfoTitle = document.createElement('div');
    contactInfoTitle.innerText = content.footer.contactInfo.contactTitle;
    contactInfo.appendChild(contactInfoTitle);
    const contactInfoText = document.createElement('div');
    contactInfo.innerText = content.footer.contactInfo.contactContent;
    contactInfo.appendChild(contactInfoText);

    const socialInfo = document.createElement('div');
    socialInfo.classList.add('footer__social');
    const socialInfoTitle = document.createElement('div');
    socialInfoTitle.innerText = content.footer.socialInfo.socialTitle;
    const link = document.createElement('a');
    link.href = 'https://www.instagram.com/your_favorite_antique_shop/?igshid=OGQ5ZDc2ODk2ZA%3D%3D';
    const img = document.createElement('img');
    img.src = Instagram;
    link.appendChild(img);
    socialInfo.appendChild(socialInfoTitle);
    socialInfo.appendChild(link);

    const questions = document.createElement('div');
    questions.classList.add('footer__questions');
    const questionsTitle = document.createElement('div');
    questionsTitle.innerText = content.footer.questions.questionstitle;

    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:kruckovaviktoria421@gmail.com';
    emailLink.textContent = 'kruckovaviktoria421@gmail.com';
    questions.appendChild(questionsTitle);
    questions.appendChild(emailLink);
    wrapper.appendChild(socialInfo);
    wrapper.appendChild(contactInfo);
    wrapper.appendChild(questions);

    return this.footer;
  }
}
