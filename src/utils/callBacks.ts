import { getBoundToken, loginCustomer, updateCustomer } from '../components/api/api';
import State from '../components/state';
import ElementBuilder from './elementBuilder';
import { hideModal, showModal } from './modal';
import { checkCity, checkCountry, checkPostalCode, checkStreet } from './validation';

export function togglePassword() {
  const passwordInput = document.getElementById('password');
  const showButton = document.querySelector('.closePassword');

  if (passwordInput instanceof HTMLInputElement && showButton) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showButton.classList.add('openPassword');
    } else {
      passwordInput.type = 'password';
      showButton.classList.remove('openPassword');
    }
  }
}

export function returnInputValue(id: string): string {
  const input: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
  return input.value;
}

export function getClientData(event: Event) {
  event.preventDefault();
  const data = {
    email: returnInputValue('email'),
    password: returnInputValue('password'),
  };

  loginCustomer(data.email, data.password)
    .then(async (response) => {
      if (response.data.cart) {
        localStorage.setItem('cartId', response.data.cart.id);
        localStorage.setItem('cartVersion', response.data.cart.version);
      }
      localStorage.setItem('customerID', response.data.customer.id);
      const responce = await getBoundToken(data.email, data.password);
      const updateToken = responce.data.access_token;
      localStorage.setItem('token', updateToken);
      localStorage.setItem('isLoggedIn', 'true');

      window.location.hash = '/';
      const itemuser = document.querySelector('.item-client .login');
      const itemlogout = document.querySelector('.item-client .register');
      if (itemuser && itemlogout) {
        const elUser = itemuser as HTMLElement;
        elUser.textContent = 'Profile';
        const elLogOut = itemlogout as HTMLElement;
        elLogOut.textContent = 'LogOut';
      }
      showModal('Login completed', response.status);
      setTimeout(hideModal, 3000);
      return data;
    })
    .catch((error) => {
      showModal(`${error.message}`, error.code);
      setTimeout(hideModal, 3000);
    });
}

export function enableEditMode(event: Event) {
  const currPassword = State.getPassword();
  console.log('currPassword: ', currPassword);
  const editBtn = event.target as HTMLElement;

  const { section, editid } = editBtn.dataset;

  const buttonsContainer =
    section === 'addresses'
      ? document.querySelector(`[data-container = "${editid}"]`)
      : document.querySelector(`.${section}buttonsContainer`);

  const infoBlocks =
    section === 'addresses'
      ? document.querySelector(`[data-currWrapper = "${editid}"]`)!.querySelectorAll('.readonly')
      : document.querySelectorAll(`.${section}infoWrapper .readonly`);

  if (editBtn && buttonsContainer && currPassword) {
    editBtn.classList.add('hidden');
    buttonsContainer.classList.remove('hidden');
    if (infoBlocks[0] instanceof HTMLInputElement && infoBlocks[0].type === 'password') {
      infoBlocks[0].removeAttribute('readonly');
      infoBlocks[0].classList.add('editMode');
      infoBlocks[0].type = 'text';
      infoBlocks[0].value = currPassword;
    } else {
      infoBlocks.forEach((elem) => {
        elem.removeAttribute('readonly');
        elem.classList.add('editMode');
      });
    }
  }
}

export function deleteAddress(event: Event) {
  const deleteButton = event.target as HTMLElement;
  const customer = State.getCustomer();
  const id = deleteButton.dataset.deleteid;
  console.log('deleteButton: ', deleteButton);
  const addressWrapper = document.getElementById(`${id}`);
  console.log('addressWrapper: ', addressWrapper);
  if (addressWrapper && customer) {
    addressWrapper.remove();
    updateCustomer(customer.id, {
      version: Number(customer.version),
      actions: [{ action: 'removeAddress', addressId: id }],
    })
      .then((resp) => {
        State.setCustomer(resp.data);
        showModal('Address deleted', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error) => {
        showModal(`${error.message}`, error.code);
        setTimeout(hideModal, 3000);
      });
  }
}

export function addAddress(event: Event) {
  console.log('event: ', event);
  const addButton = event.target as HTMLElement;
  console.log('addButton: ', addButton);
  const roster = document.querySelector('.addresses__roster');
  console.log('roster: ', roster);

  if (roster) {
    const { firstChild } = roster;
    console.log('firstChild: ', firstChild);

    const container = new ElementBuilder({
      tag: 'div',
      classNames: ['address__wrapper'],
      // attributes: { id: address.id },
    });

    const initHeader = new ElementBuilder({
      tag: 'div',
      classNames: ['addresses__initHeader'],
    });

    const initTitle = new ElementBuilder({
      tag: 'div',
      classNames: ['addresses__initTitle'],
      textContent: 'Address',
    });
    const confirmButton = new ElementBuilder({
      tag: 'button',
      classNames: ['addresses__confirmButton'],
      textContent: 'Add',
      event: 'click',
      // callback: enableEditMode,
      attributes: {
        'data-section': 'addresses',
      },
    });

    const undoButton = new ElementBuilder({
      tag: 'button',
      classNames: ['password__undoButton'],
      textContent: 'Delete',
      event: 'click',
      // callback: deleteAddress,
    });
    const infoWrapper = new ElementBuilder({
      tag: 'div',
      classNames: ['addresses__infoWrapper'],
    });
    initHeader.addInnerElement([initTitle, confirmButton, undoButton]);
    container.addInnerElement([initHeader, infoWrapper]);

    const country = new ElementBuilder({ tag: 'label', textContent: 'Country' });
    const countryValue = new ElementBuilder({
      tag: 'input',
      classNames: ['country'],
      event: 'input',
      callback: checkCountry,
    });
    const countryError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
    });
    const city = new ElementBuilder({ tag: 'label', textContent: 'City' });
    const citytValue = new ElementBuilder({
      tag: 'input',
      classNames: ['city'],
      event: 'input',
      callback: checkCity,
    });
    const cityError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
    });
    const street = new ElementBuilder({ tag: 'label', textContent: 'Street' });
    const streetValue = new ElementBuilder({
      tag: 'input',
      classNames: ['street'],
      event: 'input',
      callback: checkStreet,
    });
    const streetError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
    });
    const postalCode = new ElementBuilder({ tag: 'label', textContent: 'Postal Code' });
    const postalCodeValue = new ElementBuilder({
      tag: 'input',
      classNames: ['postal'],
      event: 'input',
      callback: checkPostalCode,
    });
    const postalCodeError = new ElementBuilder({
      tag: 'span',
      classNames: ['errorSpan'],
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
