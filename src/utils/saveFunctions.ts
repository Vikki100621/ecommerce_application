import { AxiosError } from 'axios';
import { getCustomer, updateCustomer, updatePassword } from '../components/api/api';
import { Customer } from './interface';

import { showModal, hideModal } from './modal';

export async function saveChanges() {
  // const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer().then((responce) => responce.data);
  const firstName = document.querySelector('.firstName');
  const lastName = document.querySelector('.lastName');
  const date = document.querySelector('.dateOfBirth');
  const email = document.querySelector('.email');
  const editButton = document.querySelector('.profile__editButton');
  const buttonsContainer = document.querySelector('.profile__buttonsContainer');
  const infoWrapper = document.querySelectorAll('.profile__infoWrapper .readonly');

  if (currentUser) {
    if (firstName instanceof HTMLInputElement) currentUser.firstName = firstName.value;
    if (lastName instanceof HTMLInputElement) currentUser.lastName = lastName.value;
    if (date instanceof HTMLInputElement) currentUser.dateOfBirth = date.value;
    if (email instanceof HTMLInputElement) currentUser.email = email.value;
    updateCustomer(currentUser.id, {
      version: Number(currentUser.version),
      actions: [
        { action: 'setFirstName', firstName: currentUser.firstName },
        { action: 'setLastName', lastName: currentUser.lastName },
        { action: 'setDateOfBirth', dateOfBirth: currentUser.dateOfBirth },
        { action: 'changeEmail', email: currentUser.email },
      ],
    })
      .then((resp) => {
        showModal('Data saved', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error: AxiosError) => {
        const { response } = error;
        if (response) {
          const { status } = response;
          const errorData = response.data as Error;
          const { message } = errorData;

          showModal(message, status);
          setTimeout(hideModal, 3000);
        }
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

export async function saveAddressChanges(event: Event) {
  // const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer().then((responce) => responce.data);
  const addressesArr = currentUser!.addresses;
  const saveButton = event.target as HTMLElement;
  const { saveid } = saveButton.dataset;
  const index = addressesArr.findIndex((obj) => obj.id === saveid);
  const editButton = document.querySelector(`[data-editId = "${saveid}"]`);
  const buttonsContainer = document.querySelector(`[data-container = "${saveid}"]`);
  const infoWrapper = document.querySelector(`[data-currWrapper = "${saveid}"]`);

  if (currentUser && infoWrapper) {
    const country = infoWrapper.querySelector('.country');
    const city = infoWrapper.querySelector('.city');
    const street = infoWrapper.querySelector('.street');
    const postal = infoWrapper.querySelector('.postal');

    const inputArr = infoWrapper.querySelectorAll('.readonly');

    if (country instanceof HTMLInputElement) currentUser.addresses[index].country = country.value;
    if (city instanceof HTMLInputElement) currentUser.addresses[index].city = city.value;
    if (street instanceof HTMLInputElement) currentUser.addresses[index].streetName = street.value;
    if (postal instanceof HTMLInputElement) currentUser.addresses[index].postalCode = postal.value;

    updateCustomer(currentUser.id, {
      version: Number(currentUser.version),
      actions: [
        {
          action: 'changeAddress',
          addressId: `${saveid}`,
          address: {
            streetName: currentUser.addresses[index].streetName,
            postalCode: currentUser.addresses[index].postalCode,
            city: currentUser.addresses[index].city,
            country: currentUser.addresses[index].country,
          },
        },
      ],
    })
      .then((resp) => {
        showModal('Data saved', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error: AxiosError) => {
        const { response } = error;
        if (response) {
          const { status } = response;
          const errorData = response.data as Error;
          const { message } = errorData;

          showModal(message, status);
          setTimeout(hideModal, 3000);
        }
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

export async function savePasswordChanges() {
  // const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer().then((responce) => responce.data);

  const editButton = document.querySelector('.password__editButton');
  const buttonsContainer = document.querySelector('.password__buttonsContainer');
  const password = document.querySelector('.password') as HTMLInputElement;
  const newPassword = document.querySelector('.newPassword') as HTMLInputElement;

  if (currentUser) {
    updatePassword({
      version: Number(currentUser.version),
      id: currentUser.id,
      currentPassword: password.value,
      newPassword: newPassword.value,
    })
      .then((resp) => {
        showModal('Data saved', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error: AxiosError) => {
        const { response } = error;
        if (response) {
          const { status } = response;
          const errorData = response.data as Error;
          const { message } = errorData;

          showModal(message, status);
          setTimeout(hideModal, 3000);
        }
      });
  }

  if (editButton && buttonsContainer && password) {
    editButton.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    password.setAttribute('readonly', 'true');
    password.classList.remove('editMode');
    password.type = 'password';
  }
}
