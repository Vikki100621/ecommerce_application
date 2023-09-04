import content from './content';
import basketImageSrc from '../assets/img/shopping-cart.png';
import basketImageSrcBlack from '../assets/img/shopping-cart-black.png';
import LoginView from './login';
import Registration from './registration';
import NewCollection from '../assets/img/new-collection.jpg';
import Special from '../assets/img/special-offer.jpg';
import Instagram from '../assets/img/instagram.png';
import Clock from '../assets/img/clock.png';
import Products from './product';
import Sorting from './sort';
import ProductPage from './productPage/productPage';
import { getProduct } from './api/api';
import UserView from './user';

export default class App {
  public header: HTMLElement;

  public footer: HTMLElement;

  public main: HTMLElement;

  public body: HTMLBodyElement | null;

  public templates: { [key: string]: () => void } = {};

  private registration: Registration;

  public sorting: Sorting;

  public products: Products;

  public productContainer: HTMLElement;

  constructor() {
    this.body = document.querySelector('body');
    this.header = this.createHeader();
    this.main = this.createMain();
    this.footer = this.createFooter();
    this.productContainer = document.createElement('div');
    this.productContainer.classList.add('product__container');
    this.products = new Products();
    this.sorting = new Sorting();
    this.registration = new Registration();
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
    const div = document.querySelector('.item-basket div') as HTMLElement;

    img.src = basketImageSrc;
    div.style.border = '2px solid #e4d4be';

    this.main.innerHTML = '';
    this.header.style.color = '#e4d4be';
    const backgroundClasses = ['img-background', 'dark-background', 'light-background', 'dark-background'];
    const sectionClasses = [
      'welcome__section',
      'new-collection__section',
      'special-offer__section',
      'contact__section',
    ];
    const sectionTexts = [
      `${content.welcome}`,
      `${content.collection}`,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim tortor in hac id imperdiet adipiscing. Pellentesque nisi, mi sit non sit sed fermentum. Felis adipiscing morbi sodales ac. Mauris dictumst risus pulvinar blandit elit. Vestibulum quam ultrices nascetur et viverra suscipit. Proin vitae aliquet leo aliquam amet rutrum. Lectus auctor purus ultrices enim ultrices. Augue fringilla tellus tortor orci ultrices sed. Viverra cras sapien, pellentesque viverra malesuada. Tellus dolor, eget vitae dignissim molestie eget sit duis. Vitae dui vel pretium euismod diam. Pellentesque amet, lacus, amet, quis risus. Pellentesque scelerisque nunc, orci aliquam quis.',
    ];

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
        offerText.textContent = sectionTexts[i];
        offerDiv.appendChild(offerText);
        const offerImage = document.createElement('img');
        offerImage.classList.add('special-offer__img');
        offerImage.src = Special;
        offerDiv.appendChild(offerImage);
        section.appendChild(offerDiv);
      }
      this.main.appendChild(background);
    }
  }

  // здесь будет отрисовываться страница о магазине
  showAboutPage() {
    this.clearMain();
    const section = document.createElement('section');
    section.innerText = 'Not completed yet';
    this.main.appendChild(section);
  }

  async showCatalogPage() {
    this.clearMain();
    const section = document.createElement('section');
    section.classList.add('product__section');

    const productsInstance = this.products;
    const productDivs = await productsInstance.createProducts();
    const sort = this.sorting;
    const { sortBlock } = sort;
    const rightContent = sort.rightsideSortBlock;
   
    rightContent?.appendChild(this.productContainer);

    productDivs.forEach((productDiv) => {
  
        this.productContainer.appendChild(productDiv);
      })


    if (sortBlock) {
      section.appendChild(sortBlock);
    }

    this.main.appendChild(section);
  }


  async showProductPage(id: string | null) {
    if (id) {
      this.clearMain();
      const responseData = await getProduct(id);
      const productData = responseData.data;
      const productPage = new ProductPage(productData);
      productPage.draw();
      productPage.addSlider();
      productPage.addPrice();
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
    const basketImage = document.createElement('img');
    const numbersOfProducts = document.createElement('div');
    numbersOfProducts.classList.add('products__numbres');
    numbersOfProducts.innerHTML = '0';
    basketImage.src = basketImageSrc;
    basketLi.appendChild(basketImage);
    basketLi.appendChild(numbersOfProducts);
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
    const div = document.querySelector('.item-basket div') as HTMLElement;

    img.src = basketImageSrcBlack;
    div.style.border = '2px solid rgb(16, 14, 14)';
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
