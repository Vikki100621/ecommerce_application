import translations from './translations';
import basketImageSrc from '../assets/img/shopping-cart.png';
import basketImageSrcBlack from '../assets/img/shopping-cart-black.png';
import LoginView from '../utils/loginView';
import Registration from './registration';

export default class App {
  public header: HTMLElement;

  public footer: HTMLElement;

  public main: HTMLElement;

  public body: HTMLBodyElement | null;

  public templates: { [key: string]: () => void } = {};

  private registration: Registration;

  constructor(public language: 'en' | 'ru') {
    this.language = language;
    this.body = document.querySelector('body');
    this.header = this.createHeader();
    this.main = this.createMain();
    this.footer = this.createFooter();
    this.registration = new Registration();
  }

  // создаем header(он не будет меняться больше)
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
    leftContent.textContent = translations[this.language].title;
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
    const menuItems = translations[this.language].menuItems as string[];

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
    signIn.textContent = translations[this.language].login;
    register.textContent = translations[this.language].register;
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
    contactInfoTitle.innerText = translations[this.language].footer.contactInfo.contactTitle;
    contactInfo.appendChild(contactInfoTitle);
    const contactInfoText = document.createElement('div');
    contactInfo.innerText = translations[this.language].footer.contactInfo.contactContent;
    contactInfo.appendChild(contactInfoText);

    const socialInfo = document.createElement('div');
    socialInfo.classList.add('footer__social');
    const socialInfoTitle = document.createElement('div');
    socialInfo.innerText = translations[this.language].footer.socialInfo.socialTitle;
    contactInfo.appendChild(socialInfoTitle);
    const socialInfoText = document.createElement('div');
    socialInfoText.innerText = translations[this.language].footer.socialInfo.socialContent;
    contactInfo.appendChild(socialInfoText);

    const languages = document.createElement('div');
    languages.classList.add('footer__languages');
    const languagesInfoTitle = document.createElement('div');
    languagesInfoTitle.innerText = translations[this.language].footer.langauges;
    languages.appendChild(languagesInfoTitle);
    const buttons = document.createElement('div');
    buttons.classList.add('buttons__block');
    const enBtn = document.createElement('button');
    enBtn.classList.add('language__button');
    enBtn.setAttribute('data-language', 'en');
    enBtn.innerText = 'EN';
    const ruBtn = document.createElement('button');
    ruBtn.setAttribute('data-language', 'ru');
    ruBtn.classList.add('language__button');
    ruBtn.innerText = 'RU';
    buttons.appendChild(enBtn);
    buttons.appendChild(ruBtn);
    languages.appendChild(buttons);
    wrapper.appendChild(socialInfo);
    wrapper.appendChild(contactInfo);
    wrapper.appendChild(languages);

    return this.footer;
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
      `${translations[this.language].welcome}`,
      `${translations[this.language].collection}`,
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
        const newCollectionImage = document.createElement('div');
        newCollectionImage.classList.add('newCollectionDiv__img');
        newCollectionDiv.appendChild(newCollectionImage);

        const newCollctionText = document.createElement('p');
        newCollctionText.textContent = sectionTexts[i];
        newCollectionDiv.appendChild(newCollctionText);

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
        const offerImage = document.createElement('div');
        offerImage.classList.add('special-offer__img');
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

  // здесь будет отрисовываться каталог
  showCatalogPage() {
    this.clearMain();
    const section = document.createElement('section');
    section.innerText = 'Not completed yet';
    this.main.appendChild(section);
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
    this.registration.checkInput();
    this.registration.addAddressListener();
  }
}
