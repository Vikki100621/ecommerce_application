import { loginCustomer, updateCustomer } from '../components/api/api';
import State from '../components/state';
import { hideModal, showModal } from './modal';

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
    .then((response) => {
      State.setId(response.data.customer.id);
      State.setCustomer(response.data.customer);
      State.setPassword(data.password);
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

  if (editBtn && buttonsContainer) {
    editBtn.classList.add('hidden');
    buttonsContainer.classList.remove('hidden');
    infoBlocks.forEach((elem) => {
      elem.removeAttribute('readonly');
      elem.classList.add('editMode');
    });
  }
}

export function undoProfileChanges() {
  const customer = State.getCustomer();
  const firstName = document.querySelector('.firstName');
  const lastName = document.querySelector('.lastName');
  const date = document.querySelector('.dateOfBirth');
  const email = document.querySelector('.email');
  const editButton = document.querySelector('.profile__editButton');
  const saveButton = document.querySelector('.profile__saveButton');
  const buttonsContainer = document.querySelector('.profile__buttonsContainer');
  const infoWrapper = document.querySelectorAll('.profile__infoWrapper .readonly');
  const errors = document.querySelectorAll('.profile__infoWrapper .errorSpan');

  if (customer) {
    if (firstName instanceof HTMLInputElement) firstName.value = customer?.firstName;
    if (lastName instanceof HTMLInputElement) lastName.value = customer?.lastName;
    if (date instanceof HTMLInputElement) date.value = customer?.dateOfBirth;
    if (email instanceof HTMLInputElement) email.value = customer.email;
  }
  if (editButton && buttonsContainer && saveButton) {
    editButton.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    saveButton.removeAttribute('disabled');
    infoWrapper.forEach((elem) => {
      elem.setAttribute('readonly', 'true');
      elem.classList.remove('editMode');
    });
  }
  for (let index = 0; index < errors.length; index += 1) {
    errors[index].innerHTML = '';
    infoWrapper[index].classList.remove('invalid');
  }
}

export function saveChanges() {
  const customer = State.getCustomer();
  const firstName = document.querySelector('.firstName');
  const lastName = document.querySelector('.lastName');
  const date = document.querySelector('.dateOfBirth');
  const email = document.querySelector('.email');
  const editButton = document.querySelector('.profile__editButton');
  const buttonsContainer = document.querySelector('.profile__buttonsContainer');
  const infoWrapper = document.querySelectorAll('.profile__infoWrapper .readonly');

  if (customer) {
    if (firstName instanceof HTMLInputElement) customer.firstName = firstName.value;
    if (lastName instanceof HTMLInputElement) customer.lastName = lastName.value;
    if (date instanceof HTMLInputElement) customer.dateOfBirth = date.value;
    if (email instanceof HTMLInputElement) customer.email = email.value;
    updateCustomer(customer.id, {
      version: Number(customer.version),
      actions: [
        { action: 'setFirstName', firstName: customer.firstName },
        { action: 'setLastName', lastName: customer.lastName },
        { action: 'setDateOfBirth', dateOfBirth: customer.dateOfBirth },
        { action: 'changeEmail', email: customer.email },
      ],
    })
      .then((resp) => {
        State.setCustomer(resp.data);
        showModal('Data saved', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error) => {
        showModal(`${error.message}`, error.code);
        setTimeout(hideModal, 3000);
      });
  }

  if (editButton && buttonsContainer) {
    editButton.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    infoWrapper.forEach((elem) => {
      elem.setAttribute('readonly', 'true');
      elem.classList.remove('editMode');
    });
  }
}

export function saveAddressChanges(event: Event) {
  const customer = State.getCustomer();
  const addressesArr = customer!.addresses;
  const saveButton = event.target as HTMLElement;
  const { saveid } = saveButton.dataset;
  const index = addressesArr.findIndex((obj) => obj.id === saveid);
  const editButton = document.querySelector(`[data-editId = "${saveid}"]`);
  const buttonsContainer = document.querySelector(`[data-container = "${saveid}"]`);
  const infoWrapper = document.querySelector(`[data-currWrapper = "${saveid}"]`);

  if (customer && infoWrapper) {
    const country = infoWrapper.querySelector('.country');
    const city = infoWrapper.querySelector('.city');
    const street = infoWrapper.querySelector('.street');
    const postal = infoWrapper.querySelector('.postal');

    const inputArr = infoWrapper.querySelectorAll('.readonly');

    if (country instanceof HTMLInputElement) customer.addresses[index].country = country.value;
    if (city instanceof HTMLInputElement) customer.addresses[index].city = city.value;
    if (street instanceof HTMLInputElement) customer.addresses[index].streetName = street.value;
    if (postal instanceof HTMLInputElement) customer.addresses[index].postalCode = postal.value;

    updateCustomer(customer.id, {
      version: Number(customer.version),
      actions: [
        {
          action: 'changeAddress',
          addressId: `${saveid}`,
          address: {
            streetName: customer.addresses[index].streetName,
            postalCode: customer.addresses[index].postalCode,
            city: customer.addresses[index].city,
            country: customer.addresses[index].country,
          },
        },
      ],
    })
      .then((resp) => {
        State.setCustomer(resp.data);
        showModal('Data saved', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error) => {
        showModal(`${error.message}`, error.code);
        setTimeout(hideModal, 3000);
      });

    if (editButton && buttonsContainer) {
      editButton.classList.remove('hidden');
      buttonsContainer.classList.add('hidden');
      inputArr.forEach((elem) => {
        elem.setAttribute('readonly', 'true');
        elem.classList.remove('editMode');
      });
    }
  }
}

export function undoAddressChanges(event: Event) {
  const customer = State.getCustomer();
  const addressesArr = customer!.addresses;
  const cancelButton = event.target as HTMLElement;
  const { cancelid } = cancelButton.dataset;
  const index = addressesArr.findIndex((obj) => obj.id === cancelid);
  const editButton = document.querySelector(`[data-editid = "${cancelid}"]`);
  const saveButton = document.querySelector(`[data-saveid = "${cancelid}"]`);
  const buttonsContainer = document.querySelector(`[data-container = "${cancelid}"]`);
  const infoWrapper = document.querySelector(`[data-currWrapper = "${cancelid}"]`);

  if (customer && infoWrapper) {
    const country = infoWrapper.querySelector('.country');
    const city = infoWrapper.querySelector('.city');
    const street = infoWrapper.querySelector('.street');
    const postal = infoWrapper.querySelector('.postal');
    const inputArr = infoWrapper.querySelectorAll('.readonly');
    const errors = infoWrapper.querySelectorAll('.errorSpan');

    if (country instanceof HTMLInputElement) country.value = customer.addresses[index].country;
    if (city instanceof HTMLInputElement) city.value = customer.addresses[index].city;
    if (street instanceof HTMLInputElement) street.value = customer.addresses[index].streetName;
    if (postal instanceof HTMLInputElement) postal.value = customer.addresses[index].postalCode;

    if (editButton && buttonsContainer && saveButton) {
      editButton.classList.remove('hidden');
      buttonsContainer.classList.add('hidden');
      saveButton.removeAttribute('disabled');
      inputArr.forEach((elem) => {
        elem.setAttribute('readonly', 'true');
        elem.classList.remove('editMode');
      });
    }

    for (let i = 0; i < errors.length; i += 1) {
      errors[i].innerHTML = '';
      inputArr[i].classList.remove('invalid');
    }
  }
}

export function undoPasswordChanges() {
  const customer = State.getCustomer();

  const password = document.querySelector('.password');
  const editButton = document.querySelector('.password__editButton');
  const saveButton = document.querySelector('.password__saveButton');
  const buttonsContainer = document.querySelector('.password__buttonsContainer');
  const infoWrapper = document.querySelectorAll('.profile__infoWrapper .readonly');
  const errors = document.querySelectorAll('.profile__infoWrapper .errorSpan');

  if (customer) {
    if (password instanceof HTMLInputElement) password.value = customer.password;
  }
  if (editButton && buttonsContainer && saveButton) {
    editButton.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    saveButton.removeAttribute('disabled');
    infoWrapper.forEach((elem) => {
      elem.setAttribute('readonly', 'true');
      elem.classList.remove('editMode');
    });
  }
  for (let index = 0; index < errors.length; index += 1) {
    errors[index].innerHTML = '';
    infoWrapper[index].classList.remove('invalid');
  }
}
