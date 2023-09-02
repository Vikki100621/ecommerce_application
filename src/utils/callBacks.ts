import { loginCustomer } from '../components/api/api';

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
  loginCustomer(data.email, data.password)
    .then(() => {
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
