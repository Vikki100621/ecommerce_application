export default class Registration {
  main: HTMLElement;

  constructor() {
    this.main = <HTMLElement>document.getElementById('main');
  }

  draw(): void {
    this.main.innerHTML = `
    <section class="registration">
      <h2 class="registration__title">Registration</h2>
      <form class="registration__form reg-form">
        <fieldset class="reg-form__user fieldset">
          <legend class="fieldset__legend">User</legend>
          <label class="reg-form__label" for="email">E-mail</label>
          <input class="reg-form__input" type="email" name="email" id="email">
          <label class="reg-form__label" for="pass">Password</label>
          <input class="reg-form__input" type="password" name="pass" id="pass">
        </fieldset>
        <fieldset class="reg-form__person fieldset">
          <legend class="fieldset__legend">Person</legend>
          <label class="reg-form__label" for="fname">First name</label>
          <input type="text" name="fname" id="fname">
          <label class="reg-form__label" for="lname">Last name</label>
          <input type="text" name="lname" id="lname">
          <label class="reg-form__label" for="bdate">Birthday</label>
          <input type="date" name="bdate" id="bdate">
        </fieldset>
        <div class="reg-form__address-wrap">
        </div>
        <input class="reg-form__addAddrr" type="button" value="Add address">
        <input type="submit" value="Submit">
      </form>
      <section class="error">
        <h2 class="error__title">Error</h2>
        <p class="error__text"></p>
      </section>
    </section>`;
  }

  addAddressListener() {
    const addressBtn: HTMLButtonElement = <HTMLButtonElement>this.main.querySelector('.reg-form__addAddrr');
    const addressWrap: HTMLDivElement = <HTMLDivElement>this.main.querySelector('.reg-form__address-wrap');

    function addAddress() {
      const addressNum = document.querySelectorAll('.reg-form__address').length;
      const newAddress = `
          <fieldset class="reg-form__address fieldset" id="address-${addressNum}">
            <legend class="fieldset__legend">Address</legend>
            <label class="reg-form__label" for="street">Street</label>
            <input type="text" name="street" id="street">
            <label class="reg-form__label" for="city">City</label>
            <input type="text" name="city" id="city">
            <label class="reg-form__label" for="pcode">Postal code</label>
            <input type="text" name="pcode" id="pcode">
            <label class="reg-form__label" for="country">Country</label>
            <input type="text" name="country" id="country" value="US" disabled>
            <label class="reg-form__label" for="baddress">Billing Address</label>
            <input type="checkbox" name="baddress" id="baddress">
            <label class="reg-form__label" for="saddress">Shipping Address</label>
            <input type="checkbox" name="saddress" id="saddress">
            <label class="reg-form__label" for="dbaddress">Default Billing Address</label>
            <input type="checkbox" name="dbaddress" id="dbaddress">
            <label class="reg-form__label" for="dsaddress">Default Shipping Address</label>
            <input type="checkbox" name="dsaddress" id="dsaddress">
          </fieldset>`;
      addressWrap.innerHTML += newAddress;
    }
    addAddress();
    addressBtn.addEventListener('click', addAddress);
  }

  checkInput(): void {
    const registrationForm: HTMLFormElement = <HTMLFormElement>this.main.querySelector('.reg-form');

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
  }
}
