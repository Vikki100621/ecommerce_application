import returnElement from '../common/returnElem';
import IImage from './IImage';

export default class Slider {
  sliderImgs: HTMLElement;

  prevBtn: HTMLButtonElement;

  nextBtn: HTMLButtonElement;

  wrapper: HTMLElement;

  sliderElement: HTMLElement;

  arrImgs: IImage[];

  stepSlide: number;

  constructor(arrImgs: IImage[], wrapper: HTMLElement, stepSlide = 220) {
    this.wrapper = wrapper;
    this.sliderElement = returnElement({ tag: 'div', classes: ['product-details__slider', 'slider'] });
    this.arrImgs = arrImgs;
    this.stepSlide = stepSlide;

    this.sliderImgs = returnElement({
      tag: 'div',
      classes: ['slider__images'],
      attrib: [{ name: 'style', value: 'left: 0;' }],
    });
    this.prevBtn = returnElement({ tag: 'button', classes: ['slider__btn'], textContent: '<' }) as HTMLButtonElement;
    this.nextBtn = returnElement({ tag: 'button', classes: ['slider__btn'], textContent: '>' }) as HTMLButtonElement;
  }

  draw() {
    const sliderImgWrapper = returnElement({ tag: 'div', classes: ['slider__img-wrapper'] });
    for (let i = 0; i < this.arrImgs.length; i += 1) {
      const productImg = returnElement({
        tag: 'img',
        classes: ['slider__img'],
        attrib: [{ name: 'src', value: this.arrImgs[i].url }],
      });
      this.sliderImgs.append(productImg);
    }
    this.sliderElement.append(this.prevBtn);
    this.sliderElement.append(sliderImgWrapper);
    sliderImgWrapper.append(this.sliderImgs);
    this.sliderElement.append(this.nextBtn);
    this.wrapper.prepend(this.sliderElement);
  }

  checkFirstLast(imgPosition: number) {
    const imgsNum = this.arrImgs.length - 1;
    this.prevBtn.disabled = false;
    this.nextBtn.disabled = false;

    if (imgPosition === 0) {
      this.prevBtn.disabled = true;
    }
    if (imgPosition <= -1 * (imgsNum * this.stepSlide)) {
      this.nextBtn.disabled = true;
    }
    if (imgsNum === 0) {
      this.prevBtn.disabled = true;
      this.nextBtn.disabled = true;
    }
  }

  checkForAloneImg() {
    if (this.arrImgs.length < 2) {
      setTimeout(() => {
        this.nextBtn.classList.add('slider__btn_unactive');
        this.prevBtn.classList.add('slider__btn_unactive');
      }, 500);
    }
  }

  slide(direction: string) {
    const imgStartPosition = Number.parseInt(this.sliderImgs.style.left, 10);
    let result = imgStartPosition;
    if (direction === 'next') {
      result -= this.stepSlide;
    } else if (direction === 'prev') {
      result += this.stepSlide;
    }
    this.sliderImgs.style.left = `${result}px`;
    this.checkFirstLast(Number.parseInt(this.sliderImgs.style.left, 10));
  }
}
