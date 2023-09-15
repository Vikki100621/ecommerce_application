import State from '../components/state';
import { enableEditMode } from '../utils/callBacks';
import ElementBuilder from '../utils/elementBuilder';
import InputBuilder from '../utils/inputBuilder';
import { savePasswordChanges } from '../utils/saveFunctions';
import { undoPasswordChanges } from '../utils/undoFunctions';
import { validatePassword } from '../utils/validation';
import View from '../utils/view';

const param = {
  header: {
    tag: 'div',
    classNames: ['password__header'],
  },
  title: {
    tag: 'h3',
    classNames: ['password__title'],
    textContent: 'Password information',
  },
  editButton: {
    tag: 'button',
    classNames: ['password__editButton'],
    textContent: '🖉 Edit',
    event: 'click',
    callback: enableEditMode,
    attributes: {
      'data-info': 'infoWrapper',
      'data-section': 'password__',
    },
  },
  buttonsContainer: {
    tag: 'div',
    classNames: ['password__buttonsContainer', 'hidden'],
  },
  saveButton: {
    tag: 'button',
    classNames: ['password__saveButton'],
    textContent: 'Save',
    event: 'click',
    callback: savePasswordChanges,
  },
  cancelButton: {
    tag: 'button',
    classNames: ['password__cancelButton'],
    textContent: 'Cancel',
    event: 'click',
    callback: undoPasswordChanges,
  },
  infoWrapper: {
    tag: 'div',
    classNames: ['password__infoWrapper'],
  },
  password: {
    tag: 'label',
    classNames: ['password__password'],
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
      readonly: 'true',
    },
  },

  passwordError: { tag: 'span', classNames: ['passwordError', 'errorSpan'], attributes: { id: 'passwordError' } },
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
    const header = new ElementBuilder(param.header).getElement();
    const title = new ElementBuilder(param.title).getElement();
    const editButton = new ElementBuilder(param.editButton).getElement();
    const buttonsContainer = new ElementBuilder(param.buttonsContainer).getElement();
    const saveButton = new ElementBuilder(param.saveButton).getElement();
    const cancelButton = new ElementBuilder(param.cancelButton).getElement();
    buttonsContainer.append(saveButton, cancelButton);
    header.append(title, editButton, buttonsContainer);

    const infoWrapper = new ElementBuilder(param.infoWrapper);
    const password = new ElementBuilder(param.password).getElement();
    const passwordValue = new InputBuilder(param.passwordValue);
    const passwordError = new ElementBuilder(param.passwordError).getElement();

    const currentUser = State.getCustomer();
    if (currentUser) {
      passwordValue.setTextContent(currentUser.password);
    }

    infoWrapper.addInnerElement([password, passwordValue, passwordError]);

    this.viewElement.addInnerElement([header, infoWrapper]);
  }
}
