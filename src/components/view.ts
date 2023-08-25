interface IElemData {
  tag: string;
  classes?: string[];
  id?: string;
  attrib?: { name: string; value: string }[];
  textContent?: string;
}

function returnElement(elemData: IElemData): HTMLElement {
  const element = document.createElement(elemData.tag);
  if (elemData.classes !== undefined) {
    elemData.classes.forEach((item) => {
      element.classList.add(item);
    });
  }
  if (elemData.id) {
    element.id = elemData.id;
  }
  if (elemData.attrib?.length) {
    elemData.attrib.forEach((i) => {
      element.setAttribute(i.name, i.value);
    });
  }
  if (elemData.textContent) {
    element.textContent = elemData.textContent;
  }
  return element;
}

function drawElement(parentElem: HTMLElement, childElem: HTMLElement): void {
  parentElem.appendChild(childElem);
}

function returnDatePeriod() {
  function checkDigits(num: number): string {
    let result = String(num);
    if (result.length < 2) {
      result = `0${result}`;
    }
    return result;
  }
  const nowDate = new Date();
  const maxBDate = `${nowDate.getFullYear() - 13}-${checkDigits(nowDate.getMonth() + 1)}-${checkDigits(
    nowDate.getDate()
  )}`;
  const minBDate = `${nowDate.getFullYear() - 133}-${checkDigits(nowDate.getMonth() + 1)}-${checkDigits(
    nowDate.getDate()
  )}`;

  return { maxBDate, minBDate };
}

export default class View {
  main: HTMLElement;

  constructor() {
    this.main = <HTMLElement>document.getElementById('main');
  }

  drawRegistration() {
    const section = returnElement({ tag: 'section', classes: ['registration'] });
    drawElement(this.main, section);
    const sectionTitle = returnElement({ tag: 'h2', classes: ['registration__title'], textContent: 'Registration' });
    drawElement(section, sectionTitle);
    const registrForm = returnElement({ tag: 'form', classes: ['registration__form', 'reg-form'] });
    drawElement(section, registrForm);

    // fieldset User
    const fieldsetUser = returnElement({ tag: 'fieldset', classes: ['reg-form__user', 'fieldset'] });
    drawElement(registrForm, fieldsetUser);
    const legendUser = returnElement({ tag: 'legend', classes: ['fieldset__legend'], textContent: 'User' });
    drawElement(fieldsetUser, legendUser);
    const labelEmail = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'email' }],
      textContent: 'E-mail',
    });
    drawElement(fieldsetUser, labelEmail);
    const inputEmail = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'email',
      attrib: [
        { name: 'type', value: 'email' },
        { name: 'name', value: 'email' },
      ],
    });
    drawElement(fieldsetUser, inputEmail);
    const pError = returnElement({ tag: 'p', classes: ['error'] });
    drawElement(fieldsetUser, pError);
    const labelPass = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'pass' }],
      textContent: 'Password',
    });
    drawElement(fieldsetUser, labelPass);
    const inputPass = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'pass',
      attrib: [
        { name: 'type', value: 'password' },
        { name: 'name', value: 'pass' },
      ],
    });
    drawElement(fieldsetUser, inputPass);
    drawElement(fieldsetUser, pError);

    // fieldset Person
    const fieldsetPerson = returnElement({ tag: 'fieldset', classes: ['reg-form__person', 'fieldset'] });
    drawElement(registrForm, fieldsetPerson);
    const legendPerson = returnElement({ tag: 'legend', classes: ['fieldset__legend'], textContent: 'Person' });
    drawElement(fieldsetPerson, legendPerson);
    const labelFName = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'fname' }],
      textContent: 'First name',
    });
    drawElement(fieldsetPerson, labelFName);
    const inputFName = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'fname',
      attrib: [
        { name: 'type', value: 'text' },
        { name: 'name', value: 'fname' },
      ],
    });
    drawElement(fieldsetPerson, inputFName);
    drawElement(fieldsetPerson, pError);
    const labelLName = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'lname' }],
      textContent: 'Last name',
    });
    drawElement(fieldsetPerson, labelLName);
    const inputLName = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'lname',
      attrib: [
        { name: 'type', value: 'text' },
        { name: 'name', value: 'lname' },
      ],
    });
    drawElement(fieldsetPerson, inputLName);
    drawElement(fieldsetPerson, pError);
    const labelBDate = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'bdate' }],
      textContent: 'Birthday',
    });
    drawElement(fieldsetPerson, labelBDate);
    const period = returnDatePeriod();
    const inputBDate = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'bdate',
      attrib: [
        { name: 'type', value: 'date' },
        { name: 'name', value: 'bdate' },
        { name: 'min', value: period.minBDate },
        { name: 'max', value: period.maxBDate },
        { name: 'value', value: period.maxBDate },
      ],
    });
    drawElement(fieldsetPerson, inputBDate);
    drawElement(fieldsetPerson, pError);

    // Address
    const addressWrap = returnElement({ tag: 'div', classes: ['reg-form__address-wrap'] });
    drawElement(registrForm, addressWrap);
    const addressBtn = returnElement({
      tag: 'input',
      classes: ['reg-form__addAddrr'],
      attrib: [
        { name: 'type', value: 'button' },
        { name: 'value', value: 'Add address' },
      ],
    });
    drawElement(registrForm, addressBtn);
    const submitBtn = returnElement({
      tag: 'input',
      attrib: [
        { name: 'type', value: 'submit' },
        { name: 'value', value: 'Submit' },
      ],
    });
    drawElement(registrForm, submitBtn);
  }

  addAddress() {
    const addressWrap: HTMLDivElement = <HTMLDivElement>this.main.querySelector('.reg-form__address-wrap');
    const addressNum = this.main.querySelectorAll('.reg-form__address').length;
    const newAddress = returnElement({
      tag: 'fieldset',
      id: `address-${addressNum}`,
      classes: ['reg-form__address', 'fieldset'],
    });
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
}
