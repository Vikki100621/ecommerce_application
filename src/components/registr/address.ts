import returnElement from '../common/returnElem';

export default class ElemAddress {
  element: HTMLElement;

  constructor(num: number) {
    this.element = returnElement({
      tag: 'fieldset',
      id: `address-${num}`,
      classes: ['reg-form__address', 'fieldset'],
    });
  }
}
