import ElementBuilder from '../utils/elementBuilder';
import State from '../components/state';
import View from '../utils/view';
import { Addresses, Customer } from '../utils/interface';
import { addEditAttribute } from '../utils/callBacks';

const param = {
  titleDiv: {
    tag: 'div',
    classNames: ['addresses__header'],
  },
  titleParametrs: {
    tag: 'h3',
    classNames: ['addresses__title'],
    textContent: 'Addresses',
  },
  editParametrs: {
    tag: 'button',
    classNames: ['editButton'],
    textContent: '🖉 Edit',
    event: 'click',
    callback: addEditAttribute,
  },
  addressesDiv: {
    tag: 'div',
    classNames: ['addresses__infoBlock'],
  },
  addressesDivHeader: {
    tag: 'div',
    classNames: ['addresses__infoHeader'],
  },
  addressesDivTitle: {
    tag: 'div',
    classNames: ['addresses__infoTitle'],
    textContent: 'Address'
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
    // callback: addEditAttribute,
  },
   cancelParametrs: {
    tag: 'button',
    classNames: ['addresses__edit'],
    textContent: 'Cancel',
    event: 'click',
    // callback: addEditAttribute,
  },
  infoBlock : {
    tag: 'div',
    classNames: ['addresses__dataBlock']
  }
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
    const titleDiv = new ElementBuilder(param.titleDiv);
    const title = new ElementBuilder(param.titleParametrs);
    titleDiv.addInnerElement([title]);

    const addressesDiv = new ElementBuilder(param.addressesDiv);
    this.getAddresses(addressesDiv);

    this.viewElement.addInnerElement([titleDiv, addressesDiv]);
  }

 

  getAddresses(addressesDiv: ElementBuilder) {
    if (this.customer) {
      this.customer.addresses.forEach((address: Addresses) => {
        const container = new ElementBuilder({ tag: 'div', classNames: ['address__wrapper'], attributes: {id: address.id}});

        const addressesDivHeader = new ElementBuilder(param.addressesDivHeader)
        const addressesDivTitle = new ElementBuilder(param.addressesDivTitle)
        const addressesDivEdit = new ElementBuilder(param.editParametrs)
        const addressesButtonsContainer = new ElementBuilder(param.buttonsContainer)
        const saveButton = new ElementBuilder(param.saveParametrs)
        const cancelButton = new ElementBuilder(param.cancelParametrs)

        const addressesInfoBlock = new ElementBuilder(param.infoBlock)
        addressesButtonsContainer.addInnerElement([saveButton, cancelButton])
        addressesDivHeader.addInnerElement([addressesDivTitle, addressesDivEdit, addressesButtonsContainer])
        container.addInnerElement([addressesDivHeader, addressesInfoBlock])

        if (address.id === this.customer?.defaultBillingAddressId) {
          const defaultBilling = new ElementBuilder({ tag: 'div', textContent: 'Default billing address' });
          const attemptImg = new ElementBuilder({ tag: 'div', textContent: '🧾🧾🧾🧾🧾' });
          addressesInfoBlock.addInnerElement([defaultBilling, attemptImg]);
          addressesInfoBlock.getElement().classList.add('default');
        }
        if (address.id === this.customer?.defaultShippingAddressId) {
          const defaultShipping = new ElementBuilder({ tag: 'div', textContent: 'Default shipping address' });
          const attemptImg = new ElementBuilder({ tag: 'div', textContent: '🚚🚚🚚🚚🚚' });
          addressesInfoBlock.addInnerElement([defaultShipping, attemptImg]);
          addressesInfoBlock.getElement().classList.add('default');
        }
        const country = new ElementBuilder({ tag: 'div', textContent: 'Country' });
        const countryValue = new ElementBuilder({ tag: 'div', textContent: `${address.country}` });
        const city = new ElementBuilder({ tag: 'div', textContent: 'City' });
        const citytValue = new ElementBuilder({ tag: 'div', textContent: `${address.city}` });
        const street = new ElementBuilder({ tag: 'div', textContent: 'Street' });
        const streetValue = new ElementBuilder({ tag: 'div', textContent: `${address.streetName}` });
        const postalCode = new ElementBuilder({ tag: 'div', textContent: 'Postal Code' });
        const postalCodeValue = new ElementBuilder({ tag: 'div', textContent: `${address.postalCode}` });
        addressesInfoBlock.addInnerElement([
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
