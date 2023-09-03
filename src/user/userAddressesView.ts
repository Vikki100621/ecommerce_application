import ElementBuilder from "../utils/elementBuilder";
import State from "../components/state";
import View from "../utils/view";
import { Addresses, Customer } from "../utils/interface";

const param = {
  titleDiv: {
    tag: 'div',
    classNames: ['addresses__header']
  },
  titleParametrs: {
    tag: 'h3',
    classNames: ['addresses__title'],
    textContent: 'Addresses',
  },
  editParametrs: {
    tag: 'div',
    classNames: ['addresses__edit'],
    textContent: '🖉 Edit',
  },
  addressesDiv: {
    tag: 'div',
    classNames: ['addresses__infoBlock']
  },
}

export default class UserAddressesView extends View {
  private customer: Customer | null

  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['addresses__container'],
    };
    super(parametrs);
    this.customer = State.getCustomer()
    this.configureView();
    
  }

  configureView() {
    const titleDiv = new ElementBuilder(param.titleDiv);
    const title = new ElementBuilder(param.titleParametrs);
    const edit = new ElementBuilder(param.editParametrs)
    titleDiv.addInnerElement([title, edit])

    const addressesDiv = new ElementBuilder(param.addressesDiv);
    this.getAddresses(addressesDiv)
    


    this.viewElement.addInnerElement([titleDiv, addressesDiv])
  }

  getAddresses(addressesDiv: ElementBuilder) {
    if (this.customer) {
      this.customer.addresses.forEach((address: Addresses) => {
        const container = new ElementBuilder({tag: 'div', classNames: ['address__wrapper']});
        if (address.id === this.customer?.defaultBillingAddressId) {
          const defaultBilling = new ElementBuilder({tag: 'div', textContent: "Default billing address"});
          const attemptImg = new ElementBuilder({tag: 'div', textContent: "🧾🧾🧾🧾🧾"});
          container.addInnerElement([defaultBilling, attemptImg])
          container.getElement().classList.add('default')
        }
        if (address.id === this.customer?.defaultShippingAddressId) {
          const defaultShipping = new ElementBuilder({tag: 'div', textContent: "Default shipping address"});
          const attemptImg = new ElementBuilder({tag: 'div', textContent: "🚚🚚🚚🚚🚚"});
          container.addInnerElement([defaultShipping, attemptImg])
          container.getElement().classList.add('default')
        }
        const country = new ElementBuilder({tag: 'div', textContent: "Country"});
        const countryValue = new ElementBuilder({tag: 'div', textContent: `${address.country}`});
        const city = new ElementBuilder({tag: 'div', textContent: "City"});
        const citytValue = new ElementBuilder({tag: 'div', textContent: `${address.city}`});
        const street = new ElementBuilder({tag: 'div', textContent: "Street"});
        const streetValue = new ElementBuilder({tag: 'div', textContent: `${address.streetName}`});
        const postalCode = new ElementBuilder({tag: 'div', textContent: "Postal Code"});
        const postalCodeValue = new ElementBuilder({tag: 'div', textContent: `${address.postalCode}`});
        container.addInnerElement([country, countryValue, city, citytValue, street, streetValue, postalCode,postalCodeValue])
        addressesDiv.addInnerElement([container])
      })
    }

  }
}