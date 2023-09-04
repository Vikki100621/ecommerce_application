import returnElement from '../common/returnElem';

export default class Modal {
  img: HTMLImageElement;

  constructor(img: HTMLImageElement) {
    this.img = img;
  }

  draw() {
    const modalWindow = returnElement({ tag: 'div', classes: ['modal-window', 'modal-window_unactive'] });
    modalWindow.append(this.img);
    document.body.append(modalWindow);
    // modalWindow.classList.remove.('modal-window_unactive');
  }
}
