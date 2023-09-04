import returnElement from '../common/returnElem';
import IImage from './IImage';

export default class Slider {
  sliderImgs: HTMLElement;

  prevBtn: HTMLButtonElement;

  nextBtn: HTMLButtonElement;

  wrapper: HTMLElement;

  sliderElement: HTMLElement;

  constructor(arrImgs: IImage[], wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.sliderElement = returnElement({ tag: 'div', classes: ['product-detail__slider', 'slider'] });

    this.sliderImgs = returnElement({
      tag: 'div',
      classes: ['slider__images'],
      attrib: [{ name: 'style', value: 'left: 0;' }],
    });
    this.prevBtn = returnElement({ tag: 'button', classes: ['slider__btn'], textContent: '<' }) as HTMLButtonElement;
    this.nextBtn = returnElement({ tag: 'button', classes: ['slider__btn'], textContent: '>' }) as HTMLButtonElement;
    const sliderImgWrapper = returnElement({ tag: 'div', classes: ['slider__img-wrapper'] });
    for (let i = 0; i < arrImgs.length; i += 1) {
      const productImg = returnElement({
        tag: 'img',
        classes: ['slider__img'],
        attrib: [{ name: 'src', value: arrImgs[i].url }],
      });
      this.sliderImgs.append(productImg);
    }
    this.sliderElement.append(this.prevBtn);
    this.sliderElement.append(sliderImgWrapper);
    sliderImgWrapper.append(this.sliderImgs);
    this.sliderElement.append(this.nextBtn);
  }

  draw() {
    this.wrapper.prepend(this.sliderElement);
  }
}
