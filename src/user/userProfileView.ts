import ElementBuilder from '../utils/elementBuilder';
import State from '../components/state';
import View from '../utils/view';
import { addEditAttribute, saveChanges, undoChanges } from '../utils/callBacks';
import { checkAge, checkFirstName, checkLastName, validateEmail } from '../utils/validation';

const param = {
  titleDiv: {
    tag: 'div',
    classNames: ['profile__header'],
  },
  titleParametrs: {
    tag: 'h3',
    classNames: ['profile__title'],
    textContent: 'Basic information',
  },
  editParametrs: {
    tag: 'button',
    classNames: ['profile__edit'],
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
    classNames: ['profile__infoBlock'],
  },
  firstName: {
    tag: 'div',
    classNames: ['profile__firstName'],
    textContent: `Firstname `,
  },
  firstNameValue: {
    tag: 'input',
    classNames: ['firstName', 'readonly'],
    event: 'input',
    callback: checkFirstName,
    attributes: {
      id: 'userFirstName',
      type: 'text',
      readonly: 'true',
    },
  },
  lastName: {
    tag: 'div',
    classNames: ['profile__lastName'],
    textContent: `Lastname `,
  },
  lastNameValue: {
    tag: 'input',
    classNames: ['lastName', 'readonly'],
    event: 'input',
    callback: checkLastName,
    attributes: {
      id: 'userLastName',
      type: 'text',
      readonly: 'true',
    },
  },
  dateofBirth: {
    tag: 'div',
    classNames: ['profile__dateOfBirth'],
    textContent: `Date of Birth`,
  },
  dateofBirthValue: {
    tag: 'input',
    classNames: ['dateOfBirth', 'readonly'],
    event: 'input',
    callback: checkAge,
    attributes: {
      id: 'dateOfBirth',
      type: 'date',
      readonly: 'true',
    },
  },
  email: {
    tag: 'div',
    classNames: ['profile__email'],
    textContent: `Email`,
  },
  emailValue: {
    tag: 'input',
    classNames: ['email', 'readonly'],
    event: 'input',
    callback: validateEmail,
    attributes: {
      id: 'email',
      type: 'email',
      readonly: 'true',
    },
  },

  firstNameError: {
    tag: 'span',
    classNames: ['userFirstNameError', 'errorSpan'],
    attributes: { id: 'userFirstNameError' },
  },
  lastNameError: {
    tag: 'span',
    classNames: ['userLastNameError', 'errorSpan'],
    attributes: { id: 'userLastNameError' },
  },
  dateOfBirthError: {
    tag: 'span',
    classNames: ['userDateOfBirthError', 'errorSpan'],
    attributes: { id: 'userDateOfBirthError' },
  },
  emailError: { tag: 'span', classNames: ['emailError', 'errorSpan'], attributes: { id: 'emailError' } },
};

export default class UserProfileView extends View {
  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['profile__container'],
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
    buttonsContainer.addInnerElement([save, cancel]);
    titleDiv.addInnerElement([title, edit, buttonsContainer]);

    const infoDiv = new ElementBuilder(param.infoDiv);
    const firstName = new ElementBuilder(param.firstName);
    const firstNameValue = new ElementBuilder(param.firstNameValue);
    const firstNameError = new ElementBuilder(param.firstNameError);
    const lastName = new ElementBuilder(param.lastName);
    const lastNameValue = new ElementBuilder(param.lastNameValue);
    const lastNameError = new ElementBuilder(param.lastNameError);
    const dateofBirth = new ElementBuilder(param.dateofBirth);
    const dateofBirthValue = new ElementBuilder(param.dateofBirthValue);
    const dateOfBirthError = new ElementBuilder(param.dateOfBirthError);
    const email = new ElementBuilder(param.email);
    const emailValue = new ElementBuilder(param.emailValue);
    const emailError = new ElementBuilder(param.emailError);

    const currentUser = State.getCustomer();
    if (currentUser) {
      firstNameValue.setTextContent(currentUser.firstName);
      lastNameValue.setTextContent(currentUser.lastName);
      dateofBirthValue.setTextContent(currentUser.dateOfBirth);
      emailValue.setTextContent(currentUser.email);
    }

    infoDiv.addInnerElement([
      firstName,
      firstNameValue,
      firstNameError,
      lastName,
      lastNameValue,
      lastNameError,
      dateofBirth,
      dateofBirthValue,
      dateOfBirthError,
      email,
      emailValue,
      emailError,
    ]);

    this.viewElement.addInnerElement([titleDiv, infoDiv]);
  }
}
