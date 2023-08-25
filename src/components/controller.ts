import View from './view';

export default class Controller {
  registrAddressBtn: HTMLButtonElement;

  view: View;

  constructor() {
    this.registrAddressBtn = <HTMLButtonElement>document.querySelector('.reg-form__addAddrr');
    this.view = new View();
  }

  listenAddressBtn(): void {
    this.registrAddressBtn.addEventListener('click', this.view.addAddress);
  }
}
