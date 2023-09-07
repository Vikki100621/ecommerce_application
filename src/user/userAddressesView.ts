import ElementBuilder from '../utils/elementBuilder';
import State from '../components/state';
import View from '../utils/view';
import { Addresses, Customer } from '../utils/interface';
import { addAddress, deleteAddress, enableEditMode } from '../utils/callBacks';
import { checkCity, checkCountry, checkPostalCode, checkStreet } from '../utils/validation';
import { saveAddressChanges } from '../utils/saveFunctions';
import { undoAddressChanges } from '../utils/undoFunctions';

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
  initHeader: {
    tag: 'div',
    classNames: ['addresses__initHeader'],
  },

  initTitle: {
    tag: 'div',
    classNames: ['addresses__initTitle'],
    textContent: 'Address',
  },
  addButton: {
    tag: 'button',
    classNames: ['addresses__addButton'],
    textContent: 'Add address',
    event: 'click',
    callback: addAddress,
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
    const header = new ElementBuilder(param.header);
    const title = new ElementBuilder(param.title);
    const addButton = new ElementBuilder(param.addButton)
    header.addInnerElement([title, addButton]);

    const roster = new ElementBuilder(param.roster);
    this.getAddresses(roster);

    this.viewElement.addInnerElement([header, roster]);
  }

  getAddresses(addressesDiv: ElementBuilder) {
    if (this.customer) {
      console.log('customer: ', this.customer);
      const addressArr = this.customer.addresses;
      console.log('addressArr: ', addressArr);
      addressArr.forEach((address: Addresses) => {
        const container = new ElementBuilder({
          tag: 'div',
          classNames: ['address__wrapper'],
          attributes: { id: address.id },
        });

        const initHeader = new ElementBuilder(param.initHeader);
        const initTitle = new ElementBuilder(param.initTitle);
        const editButton = new ElementBuilder({
          tag: 'button',
          classNames: ['addresses__editButton'],
          textContent: '🖉 Edit',
          event: 'click',
          callback: enableEditMode,
          attributes: {
            'data-section': 'addresses',
            'data-editid': `${address.id}`,
          },
        });

        const buttonsContainer = new ElementBuilder({
          tag: 'div',
          classNames: ['addresses__buttonsContainer', 'hidden'],
          attributes: {
            'data-container': `${address.id}`,
          },
        });
        const saveButton = new ElementBuilder({
          tag: 'button',
          classNames: ['addresses__saveButton'],
          textContent: 'Save',
          event: 'click',
          callback: saveAddressChanges,
          attributes: {
            'data-section': 'addresses',
            'data-saveid': `${address.id}`,
          },
        });
        const cancelButton = new ElementBuilder({
          tag: 'button',
          classNames: ['addresses__cancelButton'],
          textContent: 'Cancel',
          event: 'click',
          callback: undoAddressChanges,
          attributes: {
            'data-section': 'addresses',
            'data-cancelid': `${address.id}`,
          },
        });
        const deleteButton = new ElementBuilder({
          tag: 'button',
          classNames: ['password__deleteButton'],
          textContent: 'Delete',
          event: 'click',
          callback: deleteAddress,
          attributes: {
            'data-section': 'addresses',
            'data-deleteid': `${address.id}`,
          },
        });
        const infoWrapper = new ElementBuilder({
          tag: 'div',
          classNames: ['addresses__infoWrapper'],
          attributes: {
            'data-currWrapper': `${address.id}`,
          },
        });
        buttonsContainer.addInnerElement([saveButton, cancelButton]);
        initHeader.addInnerElement([initTitle, editButton, deleteButton, buttonsContainer]);
        container.addInnerElement([initHeader, infoWrapper]);

        // if (address.id === this.customer?.defaultBillingAddressId) {
        //   const defaultBilling = new ElementBuilder({ tag: 'div', textContent: 'Default billing address' });
        //   const attemptImg = new ElementBuilder({ tag: 'div', textContent: '🧾🧾🧾🧾🧾' });
        //   infoWrapper.addInnerElement([defaultBilling, attemptImg]);
        //   infoWrapper.getElement().classList.add('default');
        // }
        // if (address.id === this.customer?.defaultShippingAddressId) {
        //   const defaultShipping = new ElementBuilder({ tag: 'div', textContent: 'Default shipping address' });
        //   const attemptImg = new ElementBuilder({ tag: 'div', textContent: '🚚🚚🚚🚚🚚' });
        //   infoWrapper.addInnerElement([defaultShipping, attemptImg]);
        //   infoWrapper.getElement().classList.add('default');
        // }
        const country = new ElementBuilder({ tag: 'label', textContent: 'Country' });
        const countryValue = new ElementBuilder({
          tag: 'input',
          classNames: ['country', 'readonly'],
          textContent: `${address.country}`,
          event: 'input',
          callback: checkCountry,
        });
        const countryError = new ElementBuilder({
          tag: 'span',
          classNames: ['errorSpan'],
          attributes: { id: `countryErr-${address.id}` },
        });
        const city = new ElementBuilder({ tag: 'label', textContent: 'City' });
        const citytValue = new ElementBuilder({
          tag: 'input',
          classNames: ['city', 'readonly'],
          textContent: `${address.city}`,
          event: 'input',
          callback: checkCity,
        });
        const cityError = new ElementBuilder({
          tag: 'span',
          classNames: ['errorSpan'],
          attributes: { id: `cityErr-${address.id}` },
        });
        const street = new ElementBuilder({ tag: 'label', textContent: 'Street' });
        const streetValue = new ElementBuilder({
          tag: 'input',
          classNames: ['street', 'readonly'],
          textContent: `${address.streetName}`,
          event: 'input',
          callback: checkStreet,
        });
        const streetError = new ElementBuilder({
          tag: 'span',
          classNames: ['errorSpan'],
          attributes: { id: `streetErr-${address.id}` },
        });
        const postalCode = new ElementBuilder({ tag: 'label', textContent: 'Postal Code' });
        const postalCodeValue = new ElementBuilder({
          tag: 'input',
          classNames: ['postal', 'readonly'],
          textContent: `${address.postalCode}`,
          event: 'input',
          callback: checkPostalCode,
        });
        const postalCodeError = new ElementBuilder({
          tag: 'span',
          classNames: ['errorSpan'],
          attributes: { id: `postalErr-${address.id}` },
        });
        infoWrapper.addInnerElement([
          country,
          countryValue,
          countryError,
          city,
          citytValue,
          cityError,
          street,
          streetValue,
          streetError,
          postalCode,
          postalCodeValue,
          postalCodeError,
        ]);
        addressesDiv.addInnerElement([container]);
      });
    }
  }
}
