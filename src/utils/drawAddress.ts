import { enableEditMode } from "./callBacks";
import deleteAddress from "./deleteAddress";
import ElementBuilder from "./elementBuilder";
import { Addresses } from "./interface";
import { saveAddressChanges } from "./saveFunctions";
import { undoAddressChanges } from "./undoFunctions";
import { checkCountry, checkCity, checkStreet, checkPostalCode } from "./validation";

const param = {
  initHeader: {
    tag: 'div',
    classNames: ['addresses__initHeader'],
  },

  initTitle: {
    tag: 'div',
    classNames: ['addresses__initTitle'],
    textContent: 'Address',
  },
};

export default function drawAddress(address: Addresses,) {
  const container = new ElementBuilder({
    tag: 'div',
    classNames: ['addresses__wrapper'],
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
  country.addInnerElement([countryValue])
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
  city.addInnerElement([citytValue])
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
  street.addInnerElement([streetValue])
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
  postalCode.addInnerElement([postalCodeValue])
  const postalCodeError = new ElementBuilder({
    tag: 'span',
    classNames: ['errorSpan'],
    attributes: { id: `postalErr-${address.id}` },
  });
  infoWrapper.addInnerElement([
    country,
    countryError,
    city,
    cityError,
    street,
    streetError,
    postalCode,
    postalCodeError,
  ]);
  return container
}

