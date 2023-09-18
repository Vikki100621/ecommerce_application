import ElementBuilder from '../utils/elementBuilder';
import View from '../utils/view';
import { Addresses } from '../utils/interface';
import drawAddress from '../utils/drawAddress';
import drawNewAddress from '../utils/renderNewAddress';
import { getCustomer } from '../components/api/api';

const param = {
  header: {
    tag: 'div',
    classNames: ['addresses__header'],
  },
  title: {
    tag: 'h3',
    classNames: ['addresses__title'],
    textContent: 'Addresses',
  },
  roster: {
    tag: 'div',
    classNames: ['addresses__roster'],
  },
  addButton: {
    tag: 'button',
    classNames: ['addresses__addButton'],
    textContent: 'New address',
    event: 'click',
    callback: drawNewAddress,
  },
};

export default class UserAddressesView extends View {
  roster: HTMLElement;

  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['addresses__container'],
    };
    super(parametrs);
    this.roster = new ElementBuilder(param.roster).getElement();
    this.configureView();
  }

  configureView() {
    const header = new ElementBuilder(param.header).getElement();
    const title = new ElementBuilder(param.title).getElement();
    const addButton = new ElementBuilder(param.addButton).getElement();
    header.append(title, addButton);

    this.drawAddresses();

    this.viewElement.addInnerElement([header, this.roster]);
  }

  async drawAddresses() {
    // const currentId = localStorage.getItem('customerID') as string;
    const currentUser = await getCustomer().then((responce) => responce.data);
    if (currentUser) {
      const addressArr = currentUser.addresses;
      addressArr.forEach((address: Addresses) => {
        const container = drawAddress(address);
        this.roster.append(container.getElement());
      });
    }
  }
}
