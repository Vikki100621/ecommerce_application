import ElementBuilder from '../utils/elementBuilder';
import State from '../components/state';
import View from '../utils/view';
import { Addresses, Customer } from '../utils/interface';
import { enableEditMode } from '../utils/callBacks';

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
  editButton: {
    tag: 'button',
    classNames: ['addresses__editButton'],
    textContent: '🖉 Edit',
    event: 'click',
    callback: enableEditMode,
    attributes: {
      'data-info': 'infoWrapper',
    },
  },
  roster: {
    tag: 'div',
    classNames: ['addresses__roster'],
  },
  initHeader: {
    tag: 'div',
    classNames: ['addresses__initHeader'],
  },


  initTitle: {
    tag: 'div',
    classNames: ['addresses__initTitle'],
    textContent: 'Address',
  },
  buttonsContainer: {
    tag: 'div',
    classNames: ['addresses__buttonsContainer', 'hidden'],
  },
  saveButton: {
    tag: 'button',
    classNames: ['addresses__saveButton'],
    textContent: 'Save',
    event: 'click',
    // callback: addEditAttribute,
  },
  cancelButton: {
    tag: 'button',
    classNames: ['addresses__cancelButton'],
    textContent: 'Cancel',
    event: 'click',
    // callback: addEditAttribute,
  },
  infoWrapper: {
    tag: 'div',
    classNames: ['addresses__infoWrapper'],
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
    const header = new ElementBuilder(param.header);
    const title = new ElementBuilder(param.title);
    header.addInnerElement([title]);

    const roster = new ElementBuilder(param.roster);
    this.getAddresses(roster);

    this.viewElement.addInnerElement([header, roster]);
  }

  getAddresses(addressesDiv: ElementBuilder) {
    if (this.customer) {
      this.customer.addresses.forEach((address: Addresses) => {
        const container = new ElementBuilder({
          tag: 'div',
          classNames: ['address__wrapper'],
          attributes: { id: address.id },
        });

        const initHeader = new ElementBuilder(param.initHeader);
        const initTitle = new ElementBuilder(param.initTitle);
        const editButton = new ElementBuilder(param.editButton);
        const buttonsContainer = new ElementBuilder(param.buttonsContainer);
        const saveButton = new ElementBuilder(param.saveButton);
        const cancelButton = new ElementBuilder(param.cancelButton);
        const infoWrapper = new ElementBuilder(param.infoWrapper);
        buttonsContainer.addInnerElement([saveButton, cancelButton]);
        initHeader.addInnerElement([initTitle, editButton, buttonsContainer]);
        container.addInnerElement([initHeader, infoWrapper]);

        if (address.id === this.customer?.defaultBillingAddressId) {
          const defaultBilling = new ElementBuilder({ tag: 'div', textContent: 'Default billing address' });
          const attemptImg = new ElementBuilder({ tag: 'div', textContent: '🧾🧾🧾🧾🧾' });
          infoWrapper.addInnerElement([defaultBilling, attemptImg]);
          infoWrapper.getElement().classList.add('default');
        }
        if (address.id === this.customer?.defaultShippingAddressId) {
          const defaultShipping = new ElementBuilder({ tag: 'div', textContent: 'Default shipping address' });
          const attemptImg = new ElementBuilder({ tag: 'div', textContent: '🚚🚚🚚🚚🚚' });
          infoWrapper.addInnerElement([defaultShipping, attemptImg]);
          infoWrapper.getElement().classList.add('default');
        }
        const country = new ElementBuilder({ tag: 'div', textContent: 'Country' });
        const countryValue = new ElementBuilder({ tag: 'input', classNames: ['readonly'], textContent: `${address.country}` });
        const city = new ElementBuilder({ tag: 'div', textContent: 'City' });
        const citytValue = new ElementBuilder({ tag: 'input', classNames: ['readonly'],  textContent: `${address.city}` });
        const street = new ElementBuilder({ tag: 'div', textContent: 'Street' });
        const streetValue = new ElementBuilder({ tag: 'input', classNames: ['readonly'],  textContent: `${address.streetName}` });
        const postalCode = new ElementBuilder({ tag: 'div', textContent: 'Postal Code' });
        const postalCodeValue = new ElementBuilder({ tag: 'input', classNames: ['readonly'],  textContent: `${address.postalCode}` });
        infoWrapper.addInnerElement([
          country,
          countryValue,
          city,
          citytValue,
          street,
          streetValue,
          postalCode,
          postalCodeValue,
        ]);
        addressesDiv.addInnerElement([container]);
      });
    }
  }
}
