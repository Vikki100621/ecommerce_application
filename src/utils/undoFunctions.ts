import State from "../components/state";

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

  const password = document.querySelector('.password') as HTMLInputElement
  const editButton = document.querySelector('.password__editButton');
  const saveButton = document.querySelector('.password__saveButton');
  const buttonsContainer = document.querySelector('.password__buttonsContainer');
  const error = document.querySelector('.password__infoWrapper .errorSpan');

  if (customer) {
    if (password instanceof HTMLInputElement) password.value = customer.password;
  }
  if (editButton && buttonsContainer && saveButton && password && error) {
    editButton.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    saveButton.removeAttribute('disabled');
      password.setAttribute('readonly', 'true');
      password.classList.remove('editMode', 'invalid');
      password.type = 'password'
      error.innerHTML = '';
    };
  }