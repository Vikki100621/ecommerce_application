import returnElement from '../common/returnElem';
import IImage from './IImage';
import Slider from './slider';

export default class ModalWindow {
  imgs: IImage[];

  btnClose: HTMLButtonElement;

  modalWindow: HTMLElement;

  main: HTMLElement;

  slider: Slider;

  prevBtn: HTMLButtonElement;

  nextBtn: HTMLButtonElement;

  constructor(imgs: IImage[]) {
    this.imgs = imgs;
    this.btnClose = <HTMLButtonElement>(
      returnElement({ tag: 'div', classes: ['modal-window__close'], textContent: '❌' })
    );
    this.modalWindow = returnElement({ tag: 'div', classes: ['modal-window', 'modal-window_unactive'] });
    this.main = <HTMLElement>document.getElementById(`main`);
    let stepSlide = 540;
    if (window.innerWidth < 681 && window.innerWidth > 580) {
      stepSlide = 440;
    } else if (window.innerWidth < 581 && window.innerWidth > 389) {
      stepSlide = 280;
    }

    this.slider = new Slider(this.imgs, this.modalWindow, stepSlide);
    this.prevBtn = this.slider.prevBtn;
    this.nextBtn = this.slider.nextBtn;
  }

  draw() {
    this.slider.draw();
    this.modalWindow.append(this.slider.sliderElement, this.btnClose);
    this.main.append(this.modalWindow);
  }

  hide() {
    this.modalWindow.classList.add('modal-window_unactive');
  }

  show() {
    this.modalWindow.classList.remove('modal-window_unactive');
    this.slider.checkForAloneImg();
    this.slider.checkFirstLast(Number.parseInt(this.slider.sliderImgs.style.left, 10));
  }

  // remove() {
  //   this.modalWindow.remove();
  // }
}
