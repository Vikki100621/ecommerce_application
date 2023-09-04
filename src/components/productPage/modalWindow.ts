import returnElement from '../common/returnElem';

export default class Modal {
  img: HTMLImageElement;

  btnClose: HTMLButtonElement;

  modalWindow: HTMLElement;

  constructor(img: HTMLImageElement) {
    this.img = img;
    this.btnClose = <HTMLButtonElement>(
      returnElement({ tag: 'div', classes: ['modal-window__close'], textContent: '❌' })
    );
    this.modalWindow = returnElement({ tag: 'div', classes: ['modal-window', 'modal-window_unactive'] });
  }

  draw() {
    this.modalWindow.append(this.img, this.btnClose);
    document.body.append(this.modalWindow);
    this.modalWindow.classList.remove('modal-window_unactive');
  }

  hide() {
    this.modalWindow.classList.add('modal-window_unactive');
    document.body.removeChild(this.modalWindow);
  }
}
