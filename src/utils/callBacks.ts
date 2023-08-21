import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from '../components/api/BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'rs-school-ecommerce-application',
});

export function showModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.textContent = 'Вы успешно вошли!';
  document.body.appendChild(modal);
}

function hideModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
  localStorage.setItem('showModal', 'false');
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

function returnInputValue(id: string): string {
  const input: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
  return input.value;
}

export function getClientData(event: Event) {
  event.preventDefault();
  const data = {
    email: returnInputValue('email'),
    password: returnInputValue('password'),
  };
  const response = apiRoot.login().post({ body: data }).execute();

  response
    .then(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('showModal', 'true');
      window.location.hash = '/';
      return data;
    })
    .catch(() => {
      // const loginError = document.getElementById('loginError');
      // loginError!.innerHTML = 'НЕ СУЩЕСТВУЕТ';
    });

  // function returnCustomerByEmail(email: string) {
  //   return apiRoot
  //     .customers()
  //     .get({ queryArgs: { where: `email="${email}"` } })
  //     .execute();
  // }
  // const val = returnCustomerByEmail(returnInputValue('email'));
  // const qwerty = val.then((data) => {
  //   if (data.body.results.length === 0) {
  //     console.log('Wrong');
  //   } else {
  //     console.log('id', data.body.results[0].id);
  //   }
  // });
}

export function showLoginModal() {
  if (localStorage.getItem('showModal') === 'true') {
    showModal();
    setTimeout(hideModal, 2000);
    localStorage.setItem('showModal', 'false');
  }
}
