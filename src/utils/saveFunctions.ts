import { updateCustomer, updatePassword } from "../components/api/api";
import State from "../components/state";
import { showModal, hideModal } from "./modal";

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

export function savePasswordChanges() {
  const customer = State.getCustomer();


  const editButton = document.querySelector('.password__editButton');
  const buttonsContainer = document.querySelector('.password__buttonsContainer');
  const password = document.querySelector('.password') as HTMLInputElement
  console.log('password: ', password);

  const currPassword = State.getPassword()


  if (customer) {
    if (password instanceof HTMLInputElement) {
      customer.password = password.value;
    console.log('currPassword: ', currPassword);
    console.log('NewPAssword', password.value)
    }
    if (currPassword) {
      updatePassword({
        version: Number(customer.version),
        id: customer.id,
        currentPassword: currPassword,
        newPassword: customer.password
      })
        .then((resp) => {
          State.setCustomer(resp.data);
          State.setPassword(customer.password);
          showModal('Data saved', resp.status);
          setTimeout(hideModal, 3000);
        })
        .catch((error) => {
          showModal(`${error.message}`, error.code);
          setTimeout(hideModal, 3000);
        });
    }

    if (editButton && buttonsContainer && password) {
      editButton.classList.remove('hidden');
      buttonsContainer.classList.add('hidden');
      password.setAttribute('readonly', 'true');
      password.classList.remove('editMode');
      password.type = 'password'
      };
    }
  }
