import './assets/scss/style.scss';

const registrationForm: HTMLFormElement = <HTMLFormElement>document.querySelector('.reg-form');

function showError(msg: string): void {
  const errorBlock: HTMLElement = <HTMLElement>document.querySelector('.error');
  const errorText: HTMLParagraphElement = <HTMLParagraphElement>errorBlock.querySelector('.error__text');
  errorText.innerHTML = msg;
  errorBlock.classList.add('error_active');
}

function hideError(): void {
  const activeErrorBlock: HTMLElement = <HTMLElement>document.querySelector('.error_active');
  if (activeErrorBlock) {
    const errorText: HTMLParagraphElement = <HTMLParagraphElement>activeErrorBlock.querySelector('.error__text');
    errorText.textContent = '';
    activeErrorBlock.classList.remove('error_active');
  }
}

function checkEmail(): void {
  const emailInput: HTMLInputElement = <HTMLInputElement>document.getElementById('email');
  const email = emailInput.value;
  const examplEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
  if (!email.match(examplEmail)) {
    showError('Email is wrong. Correct e-mail looks like <em>test@test.test</em>');
  }
}

function checkPassword(): void {
  const passInput: HTMLInputElement = <HTMLInputElement>document.getElementById('pass');
  const pass = passInput.value;
  if (pass.length < 8) {
    showError('Password length must be at least 8 characters.');
  } else if (!pass.match(/[A-Z]/)) {
    showError('Password must have at least one uppercase letter.');
  } else if (!pass.match(/[0-9]/)) {
    showError('Password must have at least one digit.');
  }
}

function checkName(): void {
  const firstNameInput: HTMLInputElement = <HTMLInputElement>document.getElementById('fname');
  const firstName: string = <string>firstNameInput.value;
  const lastNameInput: HTMLInputElement = <HTMLInputElement>document.getElementById('lname');
  const lastName: string = <string>lastNameInput.value;
  if (firstName.match(/[^a-z]/i) || !firstName.length) {
    showError('First name must contain at least one character and no special characters or numbers');
  } else if (lastName.match(/[^a-z]/i) || !lastName.length) {
    showError('Last name must contain at least one character and no special characters or numbers');
  }
}

function checkAge(): void {
  const bDateInput: HTMLInputElement = <HTMLInputElement>document.getElementById('bdate');
  const bDateStr: string = <string>bDateInput.value;
  const bDate = Date.parse(bDateStr);
  const nowDate = new Date();
  const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
  if ((minBDate - bDate) < 0) {
    showError('13 is the minimum age to be registered user.');
  }
}

function checkForm(event: Event) {
  event.preventDefault();
  hideError();
  checkEmail();
  checkPassword();
  checkName();
  checkAge();
}

registrationForm.addEventListener('submit', checkForm);
