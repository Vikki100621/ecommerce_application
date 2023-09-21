import { AxiosError } from 'axios';
import { getCustomer, loginCustomer } from '../components/api/api';
import { Customer } from './interface';
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
    .then(async (response) => {
      if (response.data.cart) {
        localStorage.setItem('cartId', response.data.cart.id);
        localStorage.setItem('cartVersion', response.data.cart.version);
      }
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

export async function enableEditMode(event: Event) {
  // const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer().then((responce) => responce.data);

  const currPassword = currentUser.password;
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
    if (
      infoBlocks[0] instanceof HTMLInputElement &&
      infoBlocks[1] instanceof HTMLInputElement &&
      infoBlocks[0].type === 'password'
    ) {
      infoBlocks[0].removeAttribute('readonly');
      infoBlocks[0].classList.add('editMode');
      infoBlocks[0].type = 'text';
      infoBlocks[0].value = '';

      const newpass = document.getElementById('newPasswordLabel');
      newpass!.classList.remove('hidden');

      infoBlocks[1].removeAttribute('readonly');
      infoBlocks[1].classList.add('editMode');
      infoBlocks[1].type = 'text';
    } else {
      infoBlocks.forEach((elem) => {
        elem.removeAttribute('readonly');
        elem.classList.add('editMode');
      });
    }
  }
}
