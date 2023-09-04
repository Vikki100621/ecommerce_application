import { loginCustomer, updateCustomer } from '../components/api/api';
import State from '../components/state';

export function showModal(text: string, status: number) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const firstline = document.createElement('p');
  const secondline = document.createElement('p');
  modal.append(firstline, secondline);
  if (status === 200) {
    firstline.innerText = '✔️Login successfully completed';
    secondline.innerText = 'Welcome';
  } else {
    firstline.innerText = `❌${text}`;
    secondline.innerText = 'Incorrect email or password';
  }
  document.body.appendChild(modal);
}

function hideModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}

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
    .then((customerData) => {
      State.setCustomer(customerData.data.customer);
      State.setPassword(data.password)
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
      showModal('Login successfully completed', 200);
      setTimeout(hideModal, 3000);
      return data;
    })
    .catch((error) => {
      showModal(`${error.message}`, error.code);
      setTimeout(hideModal, 3000);
    });
}

export function addEditAttribute (event: Event) {
  const editBtn = event.target as HTMLElement;
  const buttonsContainer = document.querySelector('.buttonsContainer');

  const infoBlocks = document.querySelectorAll('.profile__infoBlock .readonly');

  if(editBtn && buttonsContainer) {
    editBtn.classList.add('hidden');
    buttonsContainer.classList.remove('hidden'); 
    infoBlocks.forEach(elem => {
      elem.removeAttribute('readonly');
      elem.classList.add('editMode')
    })
  }
};


export function undoChanges () {
  const customer = State.getCustomer();
  const firstName = document.querySelector('.firstName')
  const lastName = document.querySelector('.lastName')
  const date =  document.querySelector('.dateOfBirth')
  const editBtn = document.querySelector('.profile__edit');
  const buttonsContainer = document.querySelector('.buttonsContainer');
  const infoBlocks = document.querySelectorAll('.profile__infoBlock .readonly');
  const errors = document.querySelectorAll('.profile__infoBlock .errorSpan');

  if (customer) {
    if (firstName instanceof HTMLInputElement) firstName.value = customer?.firstName
    if (lastName instanceof HTMLInputElement) lastName.value = customer?.lastName
    if (date instanceof HTMLInputElement) date.value = customer?.dateOfBirth
  }
  if(editBtn && buttonsContainer) {
    editBtn.classList.remove('hidden');
    buttonsContainer.classList.add('hidden');
    infoBlocks.forEach(elem => {
      elem.setAttribute('readonly', 'true');
      elem.classList.remove('editMode')
    });

    for (let index = 0; index < errors.length; index += 1) {
      errors[index].innerHTML = ''
      infoBlocks[index].classList.remove('invalid')
    }
  }
}


export function saveChanges () {
  const customer = State.getCustomer();
  const firstName = document.querySelector('.firstName')
  const lastName = document.querySelector('.lastName')
  const date =  document.querySelector('.dateOfBirth')
  const editBtn = document.querySelector('.profile__edit');
  const buttonsContainer = document.querySelector('.buttonsContainer');
  const infoBlocks = document.querySelectorAll('.profile__infoBlock .readonly');

  if (customer) {
    if (firstName instanceof HTMLInputElement) customer.firstName = firstName.value
    if (lastName instanceof HTMLInputElement) customer.lastName = lastName.value
    if (date instanceof HTMLInputElement) customer.dateOfBirth = date.value
    updateCustomer(customer.id, {version: Number(customer.version), actions: [{action: 'setFirstName', firstName: customer.firstName}, {action: 'setLastName', lastName: customer.lastName}, {action: 'setDateOfBirth', dateOfBirth: customer.dateOfBirth}]}).then((qwer) => console.log('RESPONSE', qwer))
  }

  if(editBtn && buttonsContainer) {
    editBtn.classList.remove('hidden');
    buttonsContainer.classList.add('hidden'); 
    infoBlocks.forEach(elem => {
      elem.setAttribute('readonly', 'true');
      elem.classList.remove('editMode')
    })
  }
}
