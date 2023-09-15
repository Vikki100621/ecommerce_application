import { getBoundToken, loginCustomer } from '../components/api/api';
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
    .then(async (response) => {
      State.setId(response.data.customer.id);
      localStorage.setItem('customerID', response.data.customer.id);
      State.setCustomer(response.data.customer);
      State.setPassword(data.password);
      localStorage.setItem('isLoggedIn', 'true');
      const responce = await getBoundToken(data.email, data.password);
      const updateToken = responce.data.access_token;
      localStorage.setItem('token', updateToken);
      // const action = {
      //   action: 'setCustomerId',
      //   customerId: response.data.customer.id.toString(),
      // };

      // const bindCart = await getCartbyId(action);
      // console.log(bindCart.data);
      // localStorage.setItem('cartVersion', bindCart.data.version);

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

  // const token = localStorage.getItem('updateToken') as string
  // // const refreshToken = localStorage.getItem('refreshUpdatedToken')
  // getCartWithToken(token).then(responce => console.log(responce))
}

export function enableEditMode(event: Event) {
  const currPassword = State.getPassword();
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
