// import {
//   Address,
//   CustomerUpdate,
//   CustomerUpdateAction,
//   createApiBuilderFromCtpClient,
// } from '@commercetools/platform-sdk';

// import ctpClient from './api/BuildClient';
import View from './view';

export default class Registration {
  view: View;

  main: HTMLElement;

  form: HTMLElement;

  addressBtn: HTMLElement;

  numAddresses: number;

  constructor() {
    this.view = new View();
    this.main = <HTMLElement>document.getElementById('main');
    this.form = <HTMLElement>document.querySelector('.reg-form');
    this.addressBtn = <HTMLButtonElement>document.querySelector('.reg-form__addAddrr');
    this.numAddresses = 0;
  }

  removeAllListeners() {
    this.addressBtn.removeEventListener('click', this.view.addAddress);
  }

  addAddressListener() {
    this.addressBtn.addEventListener('click', this.view.addAddress);
    this.numAddresses += 1;
  }

  // checkForm(): void {
  //   function showError(msg: string, errPar: HTMLParagraphElement): void {
  //     const par = errPar;
  //     par.innerHTML = msg;
  //     errPar.classList.add('error_active');
  //   }

  //   function hideError(errPar: HTMLParagraphElement): void {
  //     const par = errPar;
  //     par.innerText = '';
  //     errPar.classList.remove('error_active');
  //   }

  //   function returnErrPar(id: string): HTMLParagraphElement {
  //     return <HTMLParagraphElement>document.querySelector(`#${id} ~ .error`);
  //   }

  //   function returnInputValue(id: string): string {
  //     const input: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
  //     return input.value;
  //   }

  //   function checkEmail(): void {
  //     const email: string = returnInputValue('email');
  //     const errPar: HTMLParagraphElement = returnErrPar('email');
  //     const examplEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
  //     if (!email.match(examplEmail)) {
  //       showError('Email is wrong. Correct e-mail looks like <em>test@test.test</em>.', errPar);
  //     } else {
  //       hideError(errPar);
  //     }
  //   }

  //   function checkPassword(): void {
  //     const pass: string = returnInputValue('pass');
  //     const errPar: HTMLParagraphElement = returnErrPar('pass');
  //     if (pass.length < 8) {
  //       showError('Password length must be at least 8 characters.', errPar);
  //     } else if (!pass.match(/[A-Z]/)) {
  //       showError('Password must have at least one uppercase letter.', errPar);
  //     } else if (!pass.match(/[0-9]/)) {
  //       showError('Password must have at least one digit.', errPar);
  //     } else {
  //       hideError(errPar);
  //     }
  //   }

  //   function checkNotOnlyChar(str: string): boolean {
  //     return Boolean(str.match(/[^a-z]/i) || !str.length);
  //   }

  //   function checkFirstName(): void {
  //     const firstName: string = returnInputValue('fname');
  //     const errPar: HTMLParagraphElement = returnErrPar('fname');
  //     if (checkNotOnlyChar(firstName)) {
  //       showError('First name must contain at least one character and no special characters or numbers.', errPar);
  //     } else {
  //       hideError(errPar);
  //     }
  //   }

  //   function checkLastName(): void {
  //     const lastName: string = returnInputValue('lname');
  //     const errPar: HTMLParagraphElement = returnErrPar('lname');
  //     if (checkNotOnlyChar(lastName)) {
  //       showError('Last name must contain at least one character and no special characters or numbers.', errPar);
  //     } else {
  //       hideError(errPar);
  //     }
  //   }

  //   function checkAge(): void {
  //     const bDateStr: string = returnInputValue('bdate');
  //     const errPar: HTMLParagraphElement = returnErrPar('bdate');
  //     const bDate = Date.parse(bDateStr);
  //     const nowDate = new Date();
  //     const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
  //     if (minBDate - bDate < 0 || !bDate) {
  //       showError('13 is the minimum age to be registered user.', errPar);
  //     } else {
  //       hideError(errPar);
  //     }
  //   }

  //   function checkStreet(): void {
  //     for (let i = 0; i < returnNumAddresses(); i += 1) {
  //       const street: string = returnInputValue(`street-${i}`);
  //       const errPar: HTMLParagraphElement = returnErrPar(`street-${i}`);
  //       if (!(street.match(/[^a-zA-Z0-9-]/i) || street.length)) {
  //         showError('Street field must contain at least one character.', errPar);
  //       } else {
  //         hideError(errPar);
  //       }
  //     }
  //   }

  //   function checkCity(): void {
  //     for (let i = 0; i < returnNumAddresses(); i += 1) {
  //       const city: string = returnInputValue(`city-${i}`);
  //       const errPar: HTMLParagraphElement = returnErrPar(`city-${i}`);
  //       if (checkNotOnlyChar(city)) {
  //         showError('City field must contain at least one character and no special characters or numbers.', errPar);
  //       } else {
  //         hideError(errPar);
  //       }
  //     }
  //   }

  //   function checkPCode(): void {
  //     for (let i = 0; i < returnNumAddresses(); i += 1) {
  //       const postalCode: string = returnInputValue(`pcode-${i}`);
  //       const errPar: HTMLParagraphElement = returnErrPar(`pcode-${i}`);
  //       if (postalCode.match(/\D/) || !(postalCode.length === 5)) {
  //         showError('Postal code field must follow the format for the country (e.g., 12345 for the U.S.).', errPar);
  //       } else {
  //         hideError(errPar);
  //       }
  //     }
  //   }

  //   function checkEvtTarget(evt: Event) {
  //     const input: HTMLInputElement = <HTMLInputElement>evt.target;
  //     const currentID: string = input.id;
  //     if (currentID === 'email') {
  //       checkEmail();
  //     } else if (currentID === 'pass') {
  //       checkPassword();
  //     } else if (currentID === 'fname') {
  //       checkFirstName();
  //     } else if (currentID === 'lname') {
  //       checkLastName();
  //     } else if (currentID === 'bdate') {
  //       checkAge();
  //     } else if (currentID.startsWith('street')) {
  //       checkStreet();
  //     } else if (currentID.startsWith('city')) {
  //       checkCity();
  //     } else if (currentID.startsWith('pcode')) {
  //       checkPCode();
  //     } else if (currentID.startsWith('dbaddress-')) {
  //       const checked: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
  //       const bAddress: HTMLInputElement = <HTMLInputElement>(
  //         document.getElementById(`baddress-${currentID.match(/\d+/)}`)
  //       );
  //       checked.forEach((el) => {
  //         if (el.id.startsWith('dbaddress-') && el.checked) {
  //           // eslint-disable-next-line no-param-reassign
  //           el.checked = false;
  //         }
  //       });
  //       bAddress.checked = true;
  //       input.checked = true;
  //     } else if (currentID.startsWith('dsaddress-')) {
  //       const checked: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
  //       const sAddress: HTMLInputElement = <HTMLInputElement>(
  //         document.getElementById(`saddress-${currentID.match(/\d+/)}`)
  //       );
  //       sAddress.checked = true;
  //       checked.forEach((el) => {
  //         if (el.id.startsWith('dsaddress-') && el.checked) {
  //           // eslint-disable-next-line no-param-reassign
  //           el.checked = false;
  //         }
  //       });
  //       input.checked = true;
  //     }
  //   }

  //   function checkAll() {
  //     checkEmail();
  //     checkPassword();
  //     checkFirstName();
  //     checkLastName();
  //     checkAge();
  //     checkStreet();
  //     checkCity();
  //     checkPCode();
  //   }

  //   function displayMessage(msg: string) {
  //     const messageBlock: HTMLDivElement = <HTMLDivElement>document.querySelector('.message');
  //     messageBlock.textContent = msg;
  //     messageBlock.classList.add('message_active');
  //   }

  //   function hideMessage() {
  //     const messageBlock: HTMLDivElement = <HTMLDivElement>document.querySelector('.message_active');
  //     if (messageBlock !== null) {
  //       messageBlock.textContent = '';
  //       messageBlock.classList.remove('message_active');
  //     }
  //   }

  //   function updateCustomerInfo(ID: string) {
  //     const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  //       projectKey: 'rs-school-ecommerce-application',
  //     });
  //     const firstName: string = returnInputValue('fname');
  //     const lastName: string = returnInputValue('lname');
  //     const dateOfBirth = returnInputValue('bdate');
  //     const body: CustomerUpdate = {
  //       version: 1,
  //       actions: [
  //         {
  //           action: 'setFirstName',
  //           firstName,
  //         },
  //         {
  //           action: 'setLastName',
  //           lastName,
  //         },
  //         {
  //           action: 'setDateOfBirth',
  //           dateOfBirth,
  //         },
  //       ],
  //     };

  //     const addresses: NodeListOf<HTMLFieldSetElement> = document.querySelectorAll('.reg-form__address');
  //     for (let i = 0; i < addresses.length; i += 1) {
  //       const streetInp: HTMLInputElement = <HTMLInputElement>document.getElementById(`street-${i}`);
  //       const streetName = streetInp.value;
  //       const cityInp: HTMLInputElement = <HTMLInputElement>document.getElementById(`city-${i}`);
  //       const city = cityInp.value;
  //       const pCodeInp: HTMLInputElement = <HTMLInputElement>document.getElementById(`pcode-${i}`);
  //       const postalCode = pCodeInp.value;
  //       const actionObj: CustomerUpdateAction = {
  //         action: 'addAddress',
  //         address: {
  //           streetName,
  //           postalCode,
  //           city,
  //           country: 'US',
  //         },
  //       };
  //       body.actions.push(actionObj);
  //     }
  //     const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
  //     const checkedCheckboxes: string[] = [];
  //     checkBoxes.forEach((input) => {
  //       if (input.checked) {
  //         checkedCheckboxes.push(input.id);
  //       }
  //     });

  //     let userAddresses: Address[] = [];
  //     let versNum: number = 0;

  //     apiRoot
  //       .customers()
  //       .withId({ ID })
  //       .post({
  //         body,
  //       })
  //       .execute()
  //       .then((response) => {
  //         userAddresses = response.body.addresses;
  //         versNum = response.body.version;
  //       })
  //       .then(() => {
  //         const addrBody: CustomerUpdate = {
  //           version: versNum,
  //           actions: [],
  //         };

  //         checkedCheckboxes.forEach((checkboxID: string) => {
  //           const addressId = userAddresses[+`${checkboxID.match(/\d+/)}`].id;

  //           let updAction: CustomerUpdateAction = {
  //             action: 'addBillingAddressId',
  //             addressId,
  //           };

  //           if (checkboxID.startsWith('saddress')) {
  //             updAction = {
  //               action: 'addShippingAddressId',
  //               addressId,
  //             };
  //           } else if (checkboxID.startsWith('dbaddress')) {
  //             updAction = {
  //               action: 'setDefaultBillingAddress',
  //               addressId,
  //             };
  //           } else if (checkboxID.startsWith('dsaddress')) {
  //             updAction = {
  //               action: 'setDefaultShippingAddress',
  //               addressId,
  //             };
  //           }
  //           addrBody.actions.push(updAction);
  //         });

  //         apiRoot
  //           .customers()
  //           .withId({ ID })
  //           .post({
  //             body: addrBody,
  //           })
  //           .execute()
  //           .catch((err: Error) => displayMessage(err.message));
  //       })
  //       .catch((err: Error) => displayMessage(err.message));
  //   }

  //   function clearForm() {
  //     function clearInput(input: HTMLInputElement) {
  //       if (
  //         ['email', 'password', 'date'].includes(input.type) ||
  //         (input.type === 'text' && !input.id.startsWith('country'))
  //       ) {
  //         // eslint-disable-next-line no-param-reassign
  //         input.value = '';
  //       } else if (input.type === 'checkbox') {
  //         // eslint-disable-next-line no-param-reassign
  //         input.checked = false;
  //       }
  //     }
  //     const inputs = document.querySelectorAll('input');
  //     inputs.forEach((i) => clearInput(i));
  //   }

  //   function createUser() {
  //     const email: string = returnInputValue('email');
  //     const pass: string = returnInputValue('pass');
  //     const customerDraft = {
  //       email,
  //       password: pass,
  //     };
  //     const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  //       projectKey: 'rs-school-ecommerce-application',
  //     });
  //     const func = () => apiRoot.customers().post({ body: customerDraft }).execute();
  //     func()
  //       .then((response) => {
  //         updateCustomerInfo(response.body.customer.id);
  //       })
  //       .then(() => {
  //         apiRoot.login().post({ body: customerDraft });
  //         displayMessage('User successfully created and logged in.');
  //         clearForm();
  //         localStorage.setItem('isLoggedIn', 'true');
  //         setTimeout(() => {
  //           hideMessage();
  //           window.location.hash = '/';
  //           const itemuser = document.querySelector('.item-client .login');
  //           const itemlogout = document.querySelector('.item-client .register');
  //           if (itemuser && itemlogout) {
  //             const elUser = itemuser as HTMLElement;
  //             elUser.textContent = 'Profile';
  //             const elLogOut = itemlogout as HTMLElement;
  //             elLogOut.textContent = 'LogOut';
  //           }
  //         }, 5000);
  //       })
  //       .catch((err: Error) => {
  //         displayMessage(err.message);
  //         setTimeout(() => hideMessage(), 5000);
  //       });
  //   }

  //   function checkFormInputs(evt: Event) {
  //     evt.preventDefault();
  //     checkAll();
  //     const activeError = document.querySelector('.error_active');
  //     if (activeError !== null) {
  //       const errPar: HTMLParagraphElement = returnErrPar('submit');
  //       showError("It's at least one error on page. Change input values and try submit again.", errPar);
  //       setTimeout(() => hideError(errPar), 5000);
  //     } else {
  //       createUser();
  //     }
  //   }

  //   function removeListeners() {
  //     registrationForm.removeEventListener('focusout', checkEvtTarget);
  //     registrationForm.removeEventListener('submit', checkFormInputs);
  //     window.removeEventListener('beforeunload', removeListeners);
  //   }

  //   registrationForm.addEventListener('focusout', checkEvtTarget);
  //   registrationForm.addEventListener('input', checkEvtTarget);
  //   registrationForm.addEventListener('submit', checkFormInputs);
  //   window.addEventListener('beforeunload', removeListeners);
  // }
}
