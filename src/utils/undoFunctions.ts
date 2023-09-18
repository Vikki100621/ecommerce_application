import { getCustomer } from '../components/api/api';
import { Customer } from './interface';

export async function undoProfileChanges() {
  const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer(currentId).then((responce) => responce.data);
  const firstName = document.querySelector('.firstName');
  const lastName = document.querySelector('.lastName');
  const date = document.querySelector('.dateOfBirth');
  const email = document.querySelector('.email');
  const editButton = document.querySelector('.profile__editButton');
  const saveButton = document.querySelector('.profile__saveButton');
  const buttonsContainer = document.querySelector('.profile__buttonsContainer');
  const infoWrapper = document.querySelectorAll('.profile__infoWrapper .readonly');
  const errors = document.querySelectorAll('.profile__infoWrapper .errorSpan');

  if (currentUser) {
    if (firstName instanceof HTMLInputElement) firstName.value = currentUser?.firstName;
    if (lastName instanceof HTMLInputElement) lastName.value = currentUser?.lastName;
    if (date instanceof HTMLInputElement) date.value = currentUser?.dateOfBirth;
    if (email instanceof HTMLInputElement) email.value = currentUser.email;
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

export async function undoAddressChanges(event: Event) {
  const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer(currentId).then((responce) => responce.data);
  const addressesArr = currentUser!.addresses;
  const cancelButton = event.target as HTMLElement;
  const { cancelid } = cancelButton.dataset;
  const index = addressesArr.findIndex((obj) => obj.id === cancelid);
  const editButton = document.querySelector(`[data-editid = "${cancelid}"]`);
  const saveButton = document.querySelector(`[data-saveid = "${cancelid}"]`);
  const buttonsContainer = document.querySelector(`[data-container = "${cancelid}"]`);
  const infoWrapper = document.querySelector(`[data-currWrapper = "${cancelid}"]`);

  if (currentUser && infoWrapper) {
    const country = infoWrapper.querySelector('.country');
    const city = infoWrapper.querySelector('.city');
    const street = infoWrapper.querySelector('.street');
    const postal = infoWrapper.querySelector('.postal');
    const inputArr = infoWrapper.querySelectorAll('.readonly');
    const errors = infoWrapper.querySelectorAll('.errorSpan');

    if (country instanceof HTMLInputElement) country.value = currentUser.addresses[index].country;
    if (city instanceof HTMLInputElement) city.value = currentUser.addresses[index].city;
    if (street instanceof HTMLInputElement) street.value = currentUser.addresses[index].streetName;
    if (postal instanceof HTMLInputElement) postal.value = currentUser.addresses[index].postalCode;

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

export async function undoPasswordChanges() {
  const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer(currentId).then((responce) => responce.data);

  const password = document.querySelector('.password') as HTMLInputElement;
  const editButton = document.querySelector('.password__editButton');
  const saveButton = document.querySelector('.password__saveButton');
  const buttonsContainer = document.querySelector('.password__buttonsContainer');
  const errors = document.querySelectorAll('.password__infoWrapper .errorSpan');
  const newpass = document.getElementById('newPasswordLabel');
  const newpassValue = document.getElementById('newpassword') as HTMLInputElement;

  if (currentUser) {
    if (password instanceof HTMLInputElement) password.value = currentUser.password;
  }
  if (editButton && buttonsContainer && saveButton && password && errors && newpass) {
    editButton.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    saveButton.removeAttribute('disabled');
    password.setAttribute('readonly', 'true');
    password.classList.remove('editMode', 'invalid');
    password.type = 'password';
    for (let i = 0; i < errors.length; i += 1) {
      errors[i].innerHTML = '';
    }
    newpassValue.value = '';
    newpassValue.classList.remove('invalid');
    newpass.classList.add('hidden');
  }
}
