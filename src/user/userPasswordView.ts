import State from "../components/state";
import { addEditAttribute, saveChanges, undoChanges } from "../utils/callBacks";
import ElementBuilder from "../utils/elementBuilder";
import {validatePassword } from "../utils/validation";
import View from "../utils/view";

const param = {
  titleDiv: {
    tag: 'div',
    classNames: ['password__header'],
  },
  titleParametrs: {
    tag: 'h3',
    classNames: ['password__title'],
    textContent: 'Password information',
  },
  editParametrs: {
    tag: 'button',
    classNames: ['password__edit'],
    textContent: '🖉 Edit',
    event: 'click',
    callback: addEditAttribute,
  },
  buttonsContainer: {
    tag: 'div',
    classNames: ['buttonsContainer', 'hidden'],
  },
  saveParametrs: {
    tag: 'button',
    classNames: ['saveButton'],
    textContent: 'Save',
    event: 'click',
    callback: saveChanges,
  },
   cancelParametrs: {
    tag: 'button',
    classNames: ['addresses__edit'],
    textContent: 'Cancel',
    event: 'click',
    callback: undoChanges,
  },
  infoDiv: {
    tag: 'div',
    classNames: ['password__infoBlock'],
  },
  password: {
    tag: 'div',
    classNames: ['passwordLabel'],
    textContent: `Password `,
  },
  passwordValue: {
    tag: 'input',
    classNames: ['password', 'readonly'],
    event: 'input',
    callback: validatePassword,
    attributes: {
      id: 'password',
      type: 'password',
      readonly: 'true'
    }
  },
  newPassword: {
    tag: 'div',
    classNames: ['newPasswordLabel', 'hidden'],
    textContent: `New password `,
  },
  newPasswordValue: {
    tag: 'input',
    classNames: ['newPassword', 'readonly', 'hidden'],
    event: 'input',
    callback: validatePassword,
    attributes: {
      id: 'newPassword',
      type: 'password',
      readonly: 'true'
    }
  },
  

  passwordError: {tag: 'span', classNames: ['passwordError', 'errorSpan'], attributes: {id: 'passwordError'}},
  newPasswordError: {tag: 'span', classNames: ['newPasswordError', 'errorSpan', 'hidden'], attributes: {id: 'newPasswordError'}}
};
export default class UserPasswordView extends View {
  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['password__container'],
    };
    super(parametrs);


    this.configureView();
  }

  configureView() {
    const titleDiv = new ElementBuilder(param.titleDiv);
    const title = new ElementBuilder(param.titleParametrs);
    const edit = new ElementBuilder(param.editParametrs);
    const buttonsContainer = new ElementBuilder(param.buttonsContainer);
    const save = new ElementBuilder(param.saveParametrs);
    const cancel = new ElementBuilder(param.cancelParametrs);
    buttonsContainer.addInnerElement([save, cancel])
    titleDiv.addInnerElement([title, edit, buttonsContainer]);


    const infoDiv = new ElementBuilder(param.infoDiv);
    const password = new ElementBuilder(param.password);
    const passwordValue = new ElementBuilder(param.passwordValue);
    const passwordError = new ElementBuilder(param.passwordError)
    const newPassword = new ElementBuilder(param.newPassword);
    const newPasswordValue = new ElementBuilder(param.newPasswordValue);
    const newPasswordError = new ElementBuilder(param.newPasswordError)

    const currentUser = State.getCustomer();
    if (currentUser) {
      passwordValue.setTextContent(currentUser.password);

    }

    infoDiv.addInnerElement([password,passwordValue,passwordError, newPassword, newPasswordValue, newPasswordError]);

    this.viewElement.addInnerElement([titleDiv, infoDiv])
 }
}