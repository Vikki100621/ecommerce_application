import deleteAddress from './deleteAddress';
import ElementBuilder from './elementBuilder';
import setNewAddress from './setNewAddress';
import { checkCountry, checkCity, checkStreet, checkPostalCode } from './validation';

export default function drawNewAddress(event: Event) {
  const addNewAddressButton = event.target as HTMLElement;
  addNewAddressButton.setAttribute('disabled', 'true');

  const roster = document.querySelector('.addresses__roster');

  if (roster) {
    const { firstChild } = roster;

    const container = new ElementBuilder({
      tag: 'div',
      classNames: ['addresses__wrapper'],
      attributes: { id: 'newAddress' },
    });

    const initHeader = new ElementBuilder({
      tag: 'div',
      classNames: ['addresses__initHeader'],
    });

    const initTitle = new ElementBuilder({
      tag: 'div',
      classNames: ['addresses__initTitle'],
      textContent: 'New Address',
    });
    const addButton = new ElementBuilder({
      tag: 'button',
      classNames: ['addresses__confirmButton'],
      textContent: 'Add',
      event: 'click',
      callback: setNewAddress,
      attributes: {
        'data-saveid': `newAddress`,
      },
    });

    const deleteButton = new ElementBuilder({
      tag: 'button',
      classNames: ['addresses__undoButton'],
      textContent: 'Delete',
      event: 'click',
      callback: deleteAddress,
      attributes: {
        'data-deleteid': `newAddress`,
      },
    });
    const infoWrapper = new ElementBuilder({
      tag: 'form',
      classNames: ['addresses__infoWrapper'],
      attributes: {
        'data-currWrapper': `newAddress`,
      },
    });
    initHeader.addInnerElement([initTitle, addButton, deleteButton]);
    container.addInnerElement([initHeader, infoWrapper]);

    const country = new ElementBuilder({ tag: 'label', textContent: 'Country' });
    const countryValue = new ElementBuilder({
      tag: 'input',
      classNames: ['country'],
      event: 'input',
      callback: checkCountry,
      attributes: {
        placeholder: 'Enter the country',
      },
    });
    const countryError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
      attributes: { id: `countryErr-newAddress` },
    });
    const city = new ElementBuilder({ tag: 'label', textContent: 'City' });
    const citytValue = new ElementBuilder({
      tag: 'input',
      classNames: ['city'],
      event: 'input',
      callback: checkCity,
      attributes: {
        placeholder: 'Enter the city',
      },
    });
    const cityError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
      attributes: { id: `cityErr-newAddress` },
    });
    const street = new ElementBuilder({ tag: 'label', textContent: 'Street' });
    const streetValue = new ElementBuilder({
      tag: 'input',
      classNames: ['street'],
      event: 'input',
      callback: checkStreet,
      attributes: {
        placeholder: 'Enter the street',
      },
    });
    const streetError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
      attributes: { id: `streetErr-newAddress` },
    });
    const postalCode = new ElementBuilder({ tag: 'label', textContent: 'Postal Code' });
    const postalCodeValue = new ElementBuilder({
      tag: 'input',
      classNames: ['postal'],
      event: 'input',
      callback: checkPostalCode,
      attributes: {
        placeholder: 'Enter the postal code',
      },
    });
    const postalCodeError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
      attributes: { id: `postalErr-newAddress` },
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

    roster.insertBefore(container.getElement(), firstChild);
  }
}
