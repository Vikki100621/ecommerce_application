import { validateEmail, validatePassword } from './validation';
import ElementBuilder from './elementBuilder';
import InputFieldBuilder from './inputBuilder';
import View from './view';
import togglePassword from './callBacks';

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
    classNames: ['input__container', 'email'],
    event: 'blur',
    callback: validateEmail,
    attributes: {
      type: 'email',
      placeholder: 'email',
      id: 'email',
      name: 'email',
    },
  },
  passwordParametrs: {
    tag: 'div',
    classNames: ['input__container', 'password'],
    event: 'input',
    callback: validatePassword,
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
    classNames: ['login__link', 'link_to_register'],
    textContent: 'Register now',
    attributes: {
      href: '#/register',
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
  showPasswordImgParametrs: {
    tag: 'div',
    classNames: ['closePassword'],
    event: 'click',
    callback: togglePassword,
  },
  emailError: {
    tag: 'span',
    classNames: ['emailError'],
    attributes: {
      id: 'emailError',
    },
  },
  passwordError: {
    tag: 'span',
    classNames: ['passwordError'],
    attributes: {
      id: 'passwordError',
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
    const emailErr = new ElementBuilder(param.emailError);
    const passwordInput = new InputFieldBuilder(param.passwordParametrs);
    const passwordErr = new ElementBuilder(param.passwordError);
    const eyeImg = new ElementBuilder(param.showPasswordImgParametrs);

    passwordInput.addInnerElement([eyeImg]);
    const loginBtn = new ElementBuilder(param.buttonParametrs);

    form.addInnerElement([emailInput, emailErr, passwordInput, passwordErr, loginBtn]);

    const registationLink = new ElementBuilder(param.registationLinkParametrs);

    const forgotLink = new ElementBuilder(param.forgotLinkParametrs);

    this.viewElement.addInnerElement([title, form, registationLink, forgotLink]);
  }
}
