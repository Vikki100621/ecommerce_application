import ElementBuilder from './elementBuilder';
import InputFieldBuilder from './inputBuilder';
import View from './view';

const param = {
  titleParametrs: {
    tag: 'h3',
    classNames: ['login__title'],
    textContent: 'Login',
  },
  formParametrs: {
    tag: 'form',
    classNames: ['login__form'],
  },
  emailParametrs: {
    tag: 'div',
    classNames: ['input__container'],
    attributes: {
      type: 'email',
      placeholder: 'email',
      id: 'email',
      name: 'email',
    },
  },
  passwordParametrs: {
    tag: 'div',
    classNames: ['input__container'],
    attributes: {
      type: 'password',
      placeholder: 'password',
      id: 'password',
      name: 'password',
    },
  },
  buttonParametrs: {
    tag: 'button',
    classNames: ['login__button'],
    textContent: 'Sign in',
    attributes: {
      type: 'submit',
    },
  },
  registationLinkParametrs: {
    tag: 'a',
    classNames: ['login__link'],
    textContent: 'Register now',
    attributes: {
      href: 'какая то линка',
    },
  },
  forgotLinkParametrs: {
    tag: 'a',
    classNames: ['login__link'],
    textContent: "I don't remember the password",
    attributes: {
      href: 'какая то линка',
    },
  },
};

export default class LoginView extends View {
  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['login__section'],
    };
    super(parametrs);
    this.configureView();
  }

  configureView() {
    const title = new ElementBuilder(param.titleParametrs);

    const form = new ElementBuilder(param.formParametrs);

    const emailInput = new InputFieldBuilder(param.emailParametrs);
    const passwordInput = new InputFieldBuilder(param.passwordParametrs);
    const loginBtn = new ElementBuilder(param.buttonParametrs);

    form.addInnerElement([emailInput, passwordInput, loginBtn]);

    const registationLink = new ElementBuilder(param.registationLinkParametrs);

    const forgotLink = new ElementBuilder(param.forgotLinkParametrs);

    this.viewElement.addInnerElement([title, form, registationLink, forgotLink]);
  }
}
