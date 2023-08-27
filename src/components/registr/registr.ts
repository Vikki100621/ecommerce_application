import returnElement from '../common/returnElem';
import drawElementInParent from '../common/drawElemInParent';
import returnDatePeriod from '../common/returnDatePeriod';

export default class Registration {
  main: HTMLElement;

  addressNum: number;

  addressWrap: HTMLElement;

  constructor() {
    this.main = <HTMLElement>document.getElementById('main');
    this.addressNum = 0;
    this.addressWrap = returnElement({ tag: 'div', classes: ['reg-form__address-wrap'] });
  }

  drawSection() {
    const section = returnElement({ tag: 'section', classes: ['registration'] });
    drawElementInParent(this.main, section);
    const sectionTitle = returnElement({ tag: 'h2', classes: ['registration__title'], textContent: 'Registration' });
    drawElementInParent(section, sectionTitle);
    const registrForm = returnElement({ tag: 'form', classes: ['registration__form', 'reg-form'] });
    drawElementInParent(section, registrForm);

    // fieldset User
    const fieldsetUser = returnElement({ tag: 'fieldset', classes: ['reg-form__user', 'fieldset'] });
    drawElementInParent(registrForm, fieldsetUser);
    const legendUser = returnElement({ tag: 'legend', classes: ['fieldset__legend'], textContent: 'User' });
    drawElementInParent(fieldsetUser, legendUser);
    const labelEmail = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'email' }],
      textContent: 'E-mail',
    });
    drawElementInParent(fieldsetUser, labelEmail);
    const inputEmail = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'email',
      attrib: [
        { name: 'type', value: 'email' },
        { name: 'name', value: 'email' },
      ],
    });
    drawElementInParent(fieldsetUser, inputEmail);
    const pError = returnElement({ tag: 'p', classes: ['error'] });
    drawElementInParent(fieldsetUser, pError);
    const labelPass = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'pass' }],
      textContent: 'Password',
    });
    drawElementInParent(fieldsetUser, labelPass);
    const inputPass = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'pass',
      attrib: [
        { name: 'type', value: 'password' },
        { name: 'name', value: 'pass' },
      ],
    });
    drawElementInParent(fieldsetUser, inputPass);
    drawElementInParent(fieldsetUser, pError);

    // fieldset Person
    const fieldsetPerson = returnElement({ tag: 'fieldset', classes: ['reg-form__person', 'fieldset'] });
    drawElementInParent(registrForm, fieldsetPerson);
    const legendPerson = returnElement({ tag: 'legend', classes: ['fieldset__legend'], textContent: 'Person' });
    drawElementInParent(fieldsetPerson, legendPerson);
    const labelFName = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'fname' }],
      textContent: 'First name',
    });
    drawElementInParent(fieldsetPerson, labelFName);
    const inputFName = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'fname',
      attrib: [
        { name: 'type', value: 'text' },
        { name: 'name', value: 'fname' },
      ],
    });
    drawElementInParent(fieldsetPerson, inputFName);
    drawElementInParent(fieldsetPerson, pError);
    const labelLName = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'lname' }],
      textContent: 'Last name',
    });
    drawElementInParent(fieldsetPerson, labelLName);
    const inputLName = returnElement({
      tag: 'input',
      classes: ['reg-form__input'],
      id: 'lname',
      attrib: [
        { name: 'type', value: 'text' },
        { name: 'name', value: 'lname' },
      ],
    });
    drawElementInParent(fieldsetPerson, inputLName);
    drawElementInParent(fieldsetPerson, pError);
    const labelBDate = returnElement({
      tag: 'label',
      classes: ['reg-form__label'],
      attrib: [{ name: 'for', value: 'bdate' }],
      textContent: 'Birthday',
    });
    drawElementInParent(fieldsetPerson, labelBDate);
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
    drawElementInParent(fieldsetPerson, inputBDate);
    drawElementInParent(fieldsetPerson, pError);

    // Address
    drawElementInParent(registrForm, this.addressWrap);
    const addressBtn = returnElement({
      tag: 'input',
      classes: ['reg-form__addAddrr'],
      attrib: [
        { name: 'type', value: 'button' },
        { name: 'value', value: 'Add address' },
      ],
    });
    drawElementInParent(registrForm, addressBtn);
    const submitBtn = returnElement({
      tag: 'input',
      attrib: [
        { name: 'type', value: 'submit' },
        { name: 'value', value: 'Submit' },
      ],
    });
    drawElementInParent(registrForm, submitBtn);
  }
}
