import './assets/scss/style.scss';

const registrationForm: HTMLFormElement = <HTMLFormElement>document.querySelector('.reg-form');

function showError(msg: string): void {
  const errorBlock: HTMLElement = <HTMLElement>document.querySelector('.error');
  const errorText: HTMLParagraphElement = <HTMLParagraphElement>errorBlock.querySelector('.error__text');
  errorText.innerHTML += msg;
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

function returnInputValue(id: string): string {
  const input: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
  return input.value;
}

function checkEmail(): void {
  const email: string = returnInputValue('email');
  const examplEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
  if (!email.match(examplEmail)) {
    showError('Email is wrong. Correct e-mail looks like <em>test@test.test</em>.<br>');
  }
}

function checkPassword(): void {
  const pass: string = returnInputValue('pass');
  if (pass.length < 8) {
    showError('Password length must be at least 8 characters.<br>');
  }
  if (!pass.match(/[A-Z]/)) {
    showError('Password must have at least one uppercase letter.<br>');
  }
  if (!pass.match(/[0-9]/)) {
    showError('Password must have at least one digit.<br>');
  }
}

function checkNotOnlyChar(str: string): boolean {
  return Boolean(str.match(/[^a-z]/i) || !str.length);
}

function checkName(): void {
  const firstName: string = returnInputValue('fname');
  const lastName: string = returnInputValue('lname');
  if (checkNotOnlyChar(firstName)) {
    showError('First name must contain at least one character and no special characters or numbers.<br>');
  }
  if (checkNotOnlyChar(lastName)) {
    showError('Last name must contain at least one character and no special characters or numbers.<br>');
  }
}

function checkAge(): void {
  const bDateStr: string = returnInputValue('bdate');
  const bDate = Date.parse(bDateStr);
  const nowDate = new Date();
  const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
  if (minBDate - bDate < 0 || !bDate) {
    showError('13 is the minimum age to be registered user.<br>');
  }
}

function checkAddress(): void {
  const street: string = returnInputValue('street');
  const city: string = returnInputValue('city');
  const postalCode: string = returnInputValue('pcode');
  if (!(street.match(/[^a-zA-Z0-9-]/i) || street.length)) {
    showError('Street field must contain at least one character.<br>');
  }
  if (checkNotOnlyChar(city)) {
    showError('City field must contain at least one character and no special characters or numbers.<br>');
  }
  if (postalCode.match(/\D/) || !(postalCode.length === 5)) {
    showError('Postal code field must follow the format for the country (e.g., 12345 for the U.S.).<br>');
  }
}

function checkForm(event: Event) {
  event.preventDefault();
  hideError();
  checkEmail();
  checkPassword();
  checkName();
  checkAge();
  checkAddress();
  const errorPar: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('.error__text');
  const errorText: string = <string>errorPar.textContent;
  if (!errorText.length) {
    console.log("it's ok");
  }
}

registrationForm.addEventListener('submit', checkForm);
