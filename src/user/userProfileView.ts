import ElementBuilder from '../utils/elementBuilder';
// import State from '../components/state';
import View from '../utils/view';
import { enableEditMode } from '../utils/callBacks';
import { checkAge, checkFirstName, checkLastName, validateEmail } from '../utils/validation';
import { saveChanges } from '../utils/saveFunctions';
import { undoProfileChanges } from '../utils/undoFunctions';
import { getCustomer } from '../components/api/api';

const param = {
  header: {
    tag: 'div',
    classNames: ['profile__header'],
  },
  title: {
    tag: 'h3',
    classNames: ['profile__title'],
    textContent: 'Basic information',
  },
  editButton: {
    tag: 'button',
    classNames: ['profile__editButton'],
    textContent: '🖉 Edit',
    event: 'click',
    callback: enableEditMode,
    attributes: {
      'data-info': 'infoWrapper',
      'data-section': 'profile__',
    },
  },
  buttonsContainer: {
    tag: 'div',
    classNames: ['profile__buttonsContainer', 'hidden'],
  },
  saveButton: {
    tag: 'button',
    classNames: ['profile__saveButton'],
    textContent: 'Save',
    event: 'click',
    callback: saveChanges,
    attributes: {
      'data-saveid': `profile`,
    },
  },
  cancelButton: {
    tag: 'button',
    classNames: ['profile__cancelButton'],
    textContent: 'Cancel',
    event: 'click',
    callback: undoProfileChanges,
  },
  infoWrapper: {
    tag: 'div',
    classNames: ['profile__infoWrapper'],
  },
  firstName: {
    tag: 'label',
    classNames: ['profile__firstName'],
    textContent: `Firstname:`,
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
    tag: 'label',
    classNames: ['profile__lastName'],
    textContent: `Lastname:`,
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
  date: {
    tag: 'label',
    classNames: ['profile__date'],
    textContent: `Date of Birth:`,
  },
  dateValue: {
    tag: 'input',
    classNames: ['date', 'readonly'],
    event: 'input',
    callback: checkAge,
    attributes: {
      id: 'userDate',
      type: 'date',
      readonly: 'true',
    },
  },
  email: {
    tag: 'label',
    classNames: ['profile__email'],
    textContent: `Email:`,
  },
  emailValue: {
    tag: 'input',
    classNames: ['email', 'readonly'],
    event: 'input',
    callback: validateEmail,
    attributes: {
      id: 'userEmail',
      type: 'email',
      readonly: 'true',
    },
  },

  firstNameError: {
    tag: 'span',
    classNames: ['errorSpan'],
    attributes: { id: 'userFirstNameError' },
  },
  lastNameError: {
    tag: 'span',
    classNames: ['errorSpan'],
    attributes: { id: 'userLastNameError' },
  },
  dateError: {
    tag: 'span',
    classNames: ['errorSpan'],
    attributes: { id: 'userDateOfBirthError' },
  },
  emailError: { tag: 'span', classNames: ['errorSpan'], attributes: { id: 'userEmailError' } },
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

  async configureView() {
    const header = new ElementBuilder(param.header);
    const title = new ElementBuilder(param.title);
    const editButton = new ElementBuilder(param.editButton);

    const buttonsContainer = new ElementBuilder(param.buttonsContainer);
    const saveButton = new ElementBuilder(param.saveButton);
    const cancelButton = new ElementBuilder(param.cancelButton);

    buttonsContainer.addInnerElement([saveButton, cancelButton]);
    header.addInnerElement([title, editButton, buttonsContainer]);

    const infoWrapper = new ElementBuilder(param.infoWrapper);
    const firstName = new ElementBuilder(param.firstName);
    const firstNameValue = new ElementBuilder(param.firstNameValue);
    firstName.addInnerElement([firstNameValue]);
    const firstNameError = new ElementBuilder(param.firstNameError);
    const lastName = new ElementBuilder(param.lastName);
    const lastNameValue = new ElementBuilder(param.lastNameValue);
    lastName.addInnerElement([lastNameValue]);
    const lastNameError = new ElementBuilder(param.lastNameError);
    const date = new ElementBuilder(param.date);
    const dateValue = new ElementBuilder(param.dateValue);
    date.addInnerElement([dateValue]);
    const dateError = new ElementBuilder(param.dateError);
    const email = new ElementBuilder(param.email);
    const emailValue = new ElementBuilder(param.emailValue);
    email.addInnerElement([emailValue]);
    const emailError = new ElementBuilder(param.emailError);

    // const currentId = localStorage.getItem('customerID') as string;
    const currentUser = await getCustomer().then((responce) => responce.data);

    if (currentUser) {
      firstNameValue.setTextContent(currentUser.firstName);
      lastNameValue.setTextContent(currentUser.lastName);
      dateValue.setTextContent(currentUser.dateOfBirth);
      emailValue.setTextContent(currentUser.email);
    }

    infoWrapper.addInnerElement([
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      date,
      dateError,
      email,
      emailError,
    ]);

    this.viewElement.addInnerElement([header, infoWrapper]);
  }
}
