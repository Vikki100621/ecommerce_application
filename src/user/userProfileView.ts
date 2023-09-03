import ElementBuilder from "../utils/elementBuilder";
import State from "../components/state";
import View from "../utils/view";

const param = {
  titleDiv: {
    tag: 'div',
    classNames: ['profile__header']
  },
  titleParametrs: {
    tag: 'h3',
    classNames: ['profile__title'],
    textContent: 'Basic information',
  },
  editParametrs: {
    tag: 'div',
    classNames: ['profile__edit'],
    textContent: '🖉 Edit',
  },
  infoDiv: {
    tag: 'div',
    classNames: ['profile__infoBlock']
  },
  firstName: {
    tag: 'div',
    classNames: ['profile__firstName'],
    textContent: `Firstname `,
  },
  firstNameValue: {
    tag: 'div',
    classNames: ['profile__firstNameValue'],
  },
  lastName: {
    tag: 'div',
    classNames: ['profile__lastName'],
    textContent: `Lastname `,
  },
  lastNameValue: {
    tag: 'div',
    classNames: ['profile__lastNameValue'],
  },
  dateofBirth: {
    tag: 'div',
    classNames: ['profile__dateOfBirth'],
    textContent: `Date of Birth`,
  },
  dateofBirthValue: {
    tag: 'div',
    classNames: ['profile__dateOfBirthValue'],
  },


}


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
    const edit = new ElementBuilder(param.editParametrs)
    titleDiv.addInnerElement([title, edit])

    const infoDiv = new ElementBuilder(param.infoDiv);
    const firstName = new ElementBuilder(param.firstName);
    const firstNameValue = new ElementBuilder(param.firstNameValue);
    const lastName = new ElementBuilder(param.lastName);
    const lastNameValue = new ElementBuilder(param.lastNameValue);
    const dateofBirth = new ElementBuilder(param.dateofBirth);
    const dateofBirthValue = new ElementBuilder(param.dateofBirthValue);

    const currentUser = State.getCustomer()
  if (currentUser) {
    firstNameValue.setTextContent(currentUser.firstName)
    lastNameValue.setTextContent(currentUser.lastName)
    dateofBirthValue.setTextContent(currentUser.dateOfBirth)
}
 
    infoDiv.addInnerElement([firstName, firstNameValue, lastName, lastNameValue, dateofBirth, dateofBirthValue])

    this.viewElement.addInnerElement([titleDiv, infoDiv])
  }
}