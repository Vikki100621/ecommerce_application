import ElementBuilder from '../utils/elementBuilder';
import State from '../components/state';
import View from '../utils/view';
import { Addresses, Customer } from '../utils/interface';
import drawAddress from '../utils/drawAddress';
import drawNewAddress from '../utils/renderNewAddress';

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
  private customer: Customer | null;

  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['addresses__container'],
    };
    super(parametrs);
    this.customer = State.getCustomer();
    this.configureView();
  }

  configureView() {
    const header = new ElementBuilder(param.header).getElement();
    const title = new ElementBuilder(param.title).getElement();
    const addButton = new ElementBuilder(param.addButton).getElement();
    header.append(title, addButton);

    const roster = new ElementBuilder(param.roster).getElement();
    this.drawAddresses(roster);

    this.viewElement.addInnerElement([header, roster]);
  }

  drawAddresses(addressesDiv: HTMLElement) {
    if (this.customer) {
      const addressArr = this.customer.addresses;
      addressArr.forEach((address: Addresses) => {
        const container = drawAddress(address);
        addressesDiv.append(container.getElement());
      });
    }
  }
}
