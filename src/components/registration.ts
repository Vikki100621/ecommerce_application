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
          <p class="error err-email"></p>
          <label class="reg-form__label" for="pass">Password</label>
          <input class="reg-form__input" type="password" name="pass" id="pass">
          <p class="error err-pass"></p>
        </fieldset>
        <fieldset class="reg-form__person fieldset">
          <legend class="fieldset__legend">Person</legend>
          <label class="reg-form__label" for="fname">First name</label>
          <input type="text" name="fname" id="fname">
          <p class="error err-fname"></p>
          <label class="reg-form__label" for="lname">Last name</label>
          <input type="text" name="lname" id="lname">
          <p class="error err-lname"></p>
          <label class="reg-form__label" for="bdate">Birthday</label>
          <input type="date" name="bdate" id="bdate">
          <p class="error err-bdate"></p>
        </fieldset>
        <div class="reg-form__address-wrap">
        </div>
        <input class="reg-form__addAddrr" type="button" value="Add address">
        <input type="submit" value="Submit">
      </form>
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
            <p class="error err-street"></p>
            <label class="reg-form__label" for="city">City</label>
            <input type="text" name="city" id="city">
            <p class="error err-city"></p>
            <label class="reg-form__label" for="pcode">Postal code</label>
            <input type="text" name="pcode" id="pcode">
            <p class="error err-pcode"></p>
            <label class="reg-form__label" for="country">Country</label>
            <input type="text" name="country" id="country" value="US" disabled>
            <p class="error err-country"></p>
            <label class="reg-form__label" for="baddress">Billing Address</label>
            <input type="checkbox" name="baddress" id="baddress">
            <p class="error err-baddress"></p>
            <label class="reg-form__label" for="saddress">Shipping Address</label>
            <input type="checkbox" name="saddress" id="saddress">
            <p class="error err-saddress"></p>
            <label class="reg-form__label" for="dbaddress">Default Billing Address</label>
            <input type="checkbox" name="dbaddress" id="dbaddress">
            <p class="error err-dbaddress"></p>
            <label class="reg-form__label" for="dsaddress">Default Shipping Address</label>
            <input type="checkbox" name="dsaddress" id="dsaddress">
            <p class="error err-dsaddress"></p>
          </fieldset>`;
      addressWrap.innerHTML += newAddress;
    }
    addAddress();
    addressBtn.addEventListener('click', addAddress);
  }

  checkInput(): void {
    // const registrationForm: HTMLFormElement =
    // <HTMLFormElement>this.main.querySelector('.reg-form');
    const inputs: NodeListOf<HTMLInputElement> = this.main.querySelectorAll('input');

    function showError(msg: string, errPar: HTMLParagraphElement): void {
      const par = errPar;
      par.innerHTML = msg;
      errPar.classList.add('error_active');
    }

    function hideError(errPar: HTMLParagraphElement): void {
      const par = errPar;
      par.innerText = '';
      errPar.classList.remove('error_active');
    }

    function returnErrPar(id: string): HTMLParagraphElement {
      return <HTMLParagraphElement>document.querySelector(`#${id} ~ .error`);
    }

    function returnInputValue(id: string): string {
      const input: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
      return input.value;
    }

    function checkEmail(): void {
      const email: string = returnInputValue('email');
      const errPar: HTMLParagraphElement = returnErrPar('email');
      const examplEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
      if (!email.match(examplEmail)) {
        showError('Email is wrong. Correct e-mail looks like <em>test@test.test</em>.', errPar);
      } else {
        hideError(errPar);
      }
    }

    function checkPassword(): void {
      const pass: string = returnInputValue('pass');
      const errPar: HTMLParagraphElement = returnErrPar('pass');
      if (pass.length < 8) {
        showError('Password length must be at least 8 characters.', errPar);
      } else if (!pass.match(/[A-Z]/)) {
        showError('Password must have at least one uppercase letter.', errPar);
      } else if (!pass.match(/[0-9]/)) {
        showError('Password must have at least one digit.', errPar);
      } else {
        hideError(errPar);
      }
    }

    function checkNotOnlyChar(str: string): boolean {
      return Boolean(str.match(/[^a-z]/i) || !str.length);
    }

    function checkFirstName(): void {
      const firstName: string = returnInputValue('fname');
      const errPar: HTMLParagraphElement = returnErrPar('fname');
      if (checkNotOnlyChar(firstName)) {
        showError('First name must contain at least one character and no special characters or numbers.', errPar);
      } else {
        hideError(errPar);
      }
    }

    function checkLastName(): void {
      const lastName: string = returnInputValue('lname');
      const errPar: HTMLParagraphElement = returnErrPar('lname');
      if (checkNotOnlyChar(lastName)) {
        showError('Last name must contain at least one character and no special characters or numbers.', errPar);
      } else {
        hideError(errPar);
      }
    }

    function checkAge(): void {
      const bDateStr: string = returnInputValue('bdate');
      const errPar: HTMLParagraphElement = returnErrPar('bdate');
      const bDate = Date.parse(bDateStr);
      const nowDate = new Date();
      const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
      if (minBDate - bDate < 0 || !bDate) {
        showError('13 is the minimum age to be registered user.', errPar);
      } else {
        hideError(errPar);
      }
    }

    function checkAddress(): void {
      const street: string = returnInputValue('street');
      const city: string = returnInputValue('city');
      const postalCode: string = returnInputValue('pcode');
      const errParStreet: HTMLParagraphElement = returnErrPar('street');
      const errParCity: HTMLParagraphElement = returnErrPar('city');
      const errParPCode: HTMLParagraphElement = returnErrPar('pcode');
      if (!(street.match(/[^a-zA-Z0-9-]/i) || street.length)) {
        console.log('street');
        showError('Street field must contain at least one character.', errParStreet);
      } else {
        hideError(errParStreet);
      }
      if (checkNotOnlyChar(city)) {
        showError('City field must contain at least one character and no special characters or numbers.', errParCity);
      } else {
        hideError(errParCity);
      }
      if (postalCode.match(/\D/) || !(postalCode.length === 5)) {
        showError('Postal code field must follow the format for the country (e.g., 12345 for the U.S.).', errParPCode);
      } else {
        hideError(errParPCode);
      }
    }

    function checkEvtTarget(evt: Event) {
      const input: HTMLInputElement = <HTMLInputElement>evt.target;
      const currentID: string = input.id;
      const addressIDs = ['street', 'city', 'pcode'];
      if (currentID === 'email') {
        checkEmail();
      } else if (currentID === 'pass') {
        checkPassword();
      } else if (currentID === 'fname') {
        checkFirstName();
      } else if (currentID === 'lname') {
        checkLastName();
      } else if (currentID === 'bdate') {
        checkAge();
      } else if (addressIDs.includes(currentID)) {
        checkAddress();
      }
    }

    // function checkForm(event: Event) {
    //   event.preventDefault();
    //   hideError();
    //   checkEmail();
    //   checkPassword();
    //   checkFirstName();
    //   checkLastName();
    //   checkAge();
    //   checkAddress();
    //   const errorPar: HTMLParagraphElement = 
    // <HTMLParagraphElement>document.querySelector('.error__text');
    //   const errorText: string = <string>errorPar.textContent;
    //   if (!errorText.length) {
    //     console.log("it's ok");
    //   }
    // }

    // registrationForm.addEventListener('submit', checkForm);
    inputs.forEach((i) => {
      i.addEventListener('focusout', checkEvtTarget);
    });
  }
}
