import { postCustomer, updateCustomer, loginCustomer, getBoundToken } from './api/api';
import { CustomerUpdateAction, CustomerUpdateBody, CustomerAddress } from './api/interfaces';
import State from './state';

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
          <p class="error"></p>
          <label class="reg-form__label" for="pass">Password</label>
          <input class="reg-form__input" type="password" name="pass" id="pass">
          <p class="error"></p>
        </fieldset>
        <fieldset class="reg-form__person fieldset">
          <legend class="fieldset__legend">Person</legend>
          <label class="reg-form__label" for="fname">First name</label>
          <input type="text" name="fname" id="fname">
          <p class="error"></p>
          <label class="reg-form__label" for="lname">Last name</label>
          <input type="text" name="lname" id="lname">
          <p class="error"></p>
          <label class="reg-form__label" for="bdate">Birthday</label>
          <input type="date" name="bdate" id="bdate">
          <p class="error"></p>
        </fieldset>
        <div class="reg-form__address-wrap">
        </div>
        <input class="reg-form__addAddrr" type="button" value="Add address">
        <input id="submit" type="submit" value="Submit">
        <p class="error"></p>
      </form>
      <a href="#/login" class="button-link">I already have a login</a>
    </section>
    <div class="message">
    </div>`;
  }

  returnRegistrationForm(): HTMLFormElement {
    return <HTMLFormElement>this.main.querySelector('.reg-form');
  }

  addAddressListener() {
    const addressBtn: HTMLButtonElement = <HTMLButtonElement>this.main.querySelector('.reg-form__addAddrr');
    const addressWrap: HTMLDivElement = <HTMLDivElement>this.main.querySelector('.reg-form__address-wrap');

    function addAddress() {
      const addressNum = document.querySelectorAll('.reg-form__address').length;
      const newAddress = document.createElement('fieldset');
      newAddress.setAttribute('id', `address-${addressNum}`);
      newAddress.classList.add('reg-form__address', 'fieldset');
      newAddress.innerHTML = `
      <legend class="fieldset__legend">Address</legend>
            <label class="reg-form__label" for="street-${addressNum}">Street</label>
            <input type="text" name="street" id="street-${addressNum}">
            <p class="error"></p>
            <label class="reg-form__label" for="city-${addressNum}">City</label>
            <input type="text" name="city" id="city-${addressNum}">
            <p class="error"></p>
            <label class="reg-form__label" for="pcode-${addressNum}">Postal code</label>
            <input type="text" name="pcode" id="pcode-${addressNum}">
            <p class="error"></p>
            <label class="reg-form__label" for="country-${addressNum}">Country</label>
            <input type="text" name="country" id="country-${addressNum}" value="US" disabled>
            <p class="error"></p>
            <div class="check-box">
            <label class="reg-form__label" for="baddress-${addressNum}">Billing Address</label>
            <input type="checkbox" name="baddress" id="baddress-${addressNum}">
            <p class="error"></p>
            <label class="reg-form__label" for="saddress-${addressNum}">Shipping Address</label>
            <input type="checkbox" name="saddress" id="saddress-${addressNum}">
            <p class="error"></p>
            <label class="reg-form__label" id="defualt" for="dbaddress-${addressNum}">Default Billing Address</label>
            <input type="checkbox" name="dbaddress" id="dbaddress-${addressNum}">
            <p class="error"></p>
            <label class="reg-form__label" id="defualt" for="dsaddress-${addressNum}">Default Shipping Address</label>
            <input type="checkbox" name="dsaddress" id="dsaddress-${addressNum}">
            <p class="error"></p>`;
      addressWrap.appendChild(newAddress);
    }

    addAddress();
    addressBtn.addEventListener('click', addAddress);
  }

  checkForm(): void {
    const registrationForm: HTMLFormElement = this.returnRegistrationForm();

    function returnNumAddresses(): number {
      return document.querySelectorAll('.reg-form__address').length;
    }

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

    function checkStreet(): void {
      for (let i = 0; i < returnNumAddresses(); i += 1) {
        const street: string = returnInputValue(`street-${i}`);
        const errPar: HTMLParagraphElement = returnErrPar(`street-${i}`);
        if (!(street.match(/[^a-zA-Z0-9-]/i) || street.length)) {
          showError('Street field must contain at least one character.', errPar);
        } else {
          hideError(errPar);
        }
      }
    }

    function checkCity(): void {
      for (let i = 0; i < returnNumAddresses(); i += 1) {
        const city: string = returnInputValue(`city-${i}`);
        const errPar: HTMLParagraphElement = returnErrPar(`city-${i}`);
        if (checkNotOnlyChar(city)) {
          showError('City field must contain at least one character and no special characters or numbers.', errPar);
        } else {
          hideError(errPar);
        }
      }
    }

    function checkPCode(): void {
      for (let i = 0; i < returnNumAddresses(); i += 1) {
        const postalCode: string = returnInputValue(`pcode-${i}`);
        const errPar: HTMLParagraphElement = returnErrPar(`pcode-${i}`);
        if (postalCode.match(/\D/) || !(postalCode.length === 5)) {
          showError('Postal code field must follow the format for the country (e.g., 12345 for the U.S.).', errPar);
        } else {
          hideError(errPar);
        }
      }
    }

    function checkEvtTarget(evt: Event) {
      const input: HTMLInputElement = <HTMLInputElement>evt.target;
      const currentID: string = input.id;
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
      } else if (currentID.startsWith('street')) {
        checkStreet();
      } else if (currentID.startsWith('city')) {
        checkCity();
      } else if (currentID.startsWith('pcode')) {
        checkPCode();
      } else if (currentID.startsWith('dbaddress-')) {
        const checked: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
        const bAddress: HTMLInputElement = <HTMLInputElement>(
          document.getElementById(`baddress-${currentID.match(/\d+/)}`)
        );
        checked.forEach((el) => {
          if (el.id.startsWith('dbaddress-') && el.checked) {
            // eslint-disable-next-line no-param-reassign
            el.checked = false;
          }
        });
        bAddress.checked = true;
        input.checked = true;
      } else if (currentID.startsWith('dsaddress-')) {
        const checked: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
        const sAddress: HTMLInputElement = <HTMLInputElement>(
          document.getElementById(`saddress-${currentID.match(/\d+/)}`)
        );
        sAddress.checked = true;
        checked.forEach((el) => {
          if (el.id.startsWith('dsaddress-') && el.checked) {
            // eslint-disable-next-line no-param-reassign
            el.checked = false;
          }
        });
        input.checked = true;
      }
    }

    function checkAll() {
      checkEmail();
      checkPassword();
      checkFirstName();
      checkLastName();
      checkAge();
      checkStreet();
      checkCity();
      checkPCode();
    }

    function displayMessage(msg: string) {
      const messageBlock: HTMLDivElement = <HTMLDivElement>document.querySelector('.message');
      messageBlock.textContent = msg;
      messageBlock.classList.add('message_active');
    }

    function hideMessage() {
      const messageBlock: HTMLDivElement = <HTMLDivElement>document.querySelector('.message_active');
      if (messageBlock !== null) {
        messageBlock.textContent = '';
        messageBlock.classList.remove('message_active');
      }
    }

    function updateCustomerInfo(ID: string) {
      const firstName: string = returnInputValue('fname');
      const lastName: string = returnInputValue('lname');
      const dateOfBirth = returnInputValue('bdate');
      const body: CustomerUpdateBody = {
        version: 1,
        actions: [
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
        ],
      };

      const addresses: NodeListOf<HTMLFieldSetElement> = document.querySelectorAll('.reg-form__address');
      for (let i = 0; i < addresses.length; i += 1) {
        const streetInp: HTMLInputElement = <HTMLInputElement>document.getElementById(`street-${i}`);
        const streetName = streetInp.value;
        const cityInp: HTMLInputElement = <HTMLInputElement>document.getElementById(`city-${i}`);
        const city = cityInp.value;
        const pCodeInp: HTMLInputElement = <HTMLInputElement>document.getElementById(`pcode-${i}`);
        const postalCode = pCodeInp.value;
        const actionObj: CustomerUpdateAction = {
          action: 'addAddress',
          address: {
            streetName,
            postalCode,
            city,
            country: 'US',
          },
        };
        body.actions.push(actionObj);
      }
      const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
      const checkedCheckboxes: string[] = [];
      checkBoxes.forEach((input) => {
        if (input.checked) {
          checkedCheckboxes.push(input.id);
        }
      });

      let userAddresses: CustomerAddress[] = [];
      let versNum: number = 0;

      updateCustomer(ID, body)
        .then((response) => {
          const { data } = response;
          userAddresses = data.addresses;
          versNum = data.version;
        })
        .then(() => {
          const addrBody: CustomerUpdateBody = {
            version: versNum,
            actions: [],
          };

          checkedCheckboxes.forEach((checkboxID: string) => {
            const addressId = userAddresses[+`${checkboxID.match(/\d+/)}`].id;

            let updAction: CustomerUpdateAction = {
              action: 'addBillingAddressId',
              addressId,
            };

            if (checkboxID.startsWith('saddress')) {
              updAction = {
                action: 'addShippingAddressId',
                addressId,
              };
            } else if (checkboxID.startsWith('dbaddress')) {
              updAction = {
                action: 'setDefaultBillingAddress',
                addressId,
              };
            } else if (checkboxID.startsWith('dsaddress')) {
              updAction = {
                action: 'setDefaultShippingAddress',
                addressId,
              };
            }
            addrBody.actions.push(updAction);
          });

          updateCustomer(ID, addrBody).catch((err: Error) => displayMessage(err.message));
        });
    }

    function clearForm() {
      function clearInput(input: HTMLInputElement) {
        if (
          ['email', 'password', 'date'].includes(input.type) ||
          (input.type === 'text' && !input.id.startsWith('country'))
        ) {
          // eslint-disable-next-line no-param-reassign
          input.value = '';
        } else if (input.type === 'checkbox') {
          // eslint-disable-next-line no-param-reassign
          input.checked = false;
        }
      }
      const inputs = document.querySelectorAll('input');
      inputs.forEach((i) => clearInput(i));
    }

    async function createUser() {
      const email: string = returnInputValue('email');
      const pass: string = returnInputValue('pass');
      const firstName: string = returnInputValue('fname');
      const lastName: string = returnInputValue('lname');

      let userId: string;
      postCustomer(email, pass, firstName, lastName)
        .then((response) => {
          userId = response.data.customer.id;
        })
        .catch((error) => {
          throw error;
        })
        .then(() => updateCustomerInfo(userId))
        .catch((error) => {
          throw error;
        })
        .then(() => loginCustomer(email, pass))
        .then(async (response) => {
          State.setId(response.data.customer.id);
          State.setCustomer(response.data.customer);
          State.setPassword(pass);
          displayMessage('User successfully created and logged in.');
          clearForm();
          localStorage.setItem('isLoggedIn', 'true');
          const responce = await getBoundToken(email, pass);
          const updateToken = responce.data.access_token;
          localStorage.setItem('token', updateToken);
          localStorage.setItem('isLoggedIn', 'true');
          setTimeout(() => {
            hideMessage();
            window.location.hash = '/';
            const itemuser = document.querySelector('.item-client .login');
            const itemlogout = document.querySelector('.item-client .register');
            if (itemuser && itemlogout) {
              const elUser = itemuser as HTMLElement;
              elUser.textContent = 'Profile';
              const elLogOut = itemlogout as HTMLElement;
              elLogOut.textContent = 'LogOut';
            }
          }, 5000);
        })
        .catch((error) => {
          displayMessage(error.message);
          setTimeout(() => hideMessage(), 5000);
        });
    }

    function checkFormInputs(evt: Event) {
      evt.preventDefault();
      checkAll();
      const activeError = document.querySelector('.error_active');
      if (activeError !== null) {
        const errPar: HTMLParagraphElement = returnErrPar('submit');
        showError("It's at least one error on page. Change input values and try submit again.", errPar);
        setTimeout(() => hideError(errPar), 5000);
      } else {
        createUser();
      }
    }

    function removeListeners() {
      registrationForm.removeEventListener('focusout', checkEvtTarget);
      registrationForm.removeEventListener('submit', checkFormInputs);
      window.removeEventListener('beforeunload', removeListeners);
    }

    registrationForm.addEventListener('focusout', checkEvtTarget);
    registrationForm.addEventListener('input', checkEvtTarget);
    registrationForm.addEventListener('submit', checkFormInputs);
    window.addEventListener('beforeunload', removeListeners);
  }
}
