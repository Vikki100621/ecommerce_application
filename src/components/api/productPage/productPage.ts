import returnElement from '../../common/returnElem';
import { getProduct } from '../api';

export default class ProductPage {
  main: HTMLElement;

  id: string;

  prevBtn: HTMLElement;

  nextBtn: HTMLElement;

  sliderImgs: HTMLElement;

  constructor(id: string) {
    this.id = id;
    this.main = <HTMLElement>document.getElementById(`main`);
    this.prevBtn = returnElement({ tag: 'button', classes: ['slider__btn'], textContent: '<' });
    this.nextBtn = returnElement({ tag: 'button', classes: ['slider__btn'], textContent: '>' });
    this.sliderImgs = returnElement({
      tag: 'div',
      classes: ['slider__images'],
      attrib: [{ name: 'style', value: 'left: 220px;' }],
    });
  }

  async draw() {
    const productResponse = await getProduct(this.id);
    const productData = productResponse.data;
    console.log(productData);

    const productSectionWrapper = returnElement({ tag: 'section', classes: ['product-details'] });
    this.main.appendChild(productSectionWrapper);
    const productTitle = returnElement({
      tag: 'h1',
      classes: ['product-details__title'],
      textContent: productData.name[`en-US`],
    });
    productSectionWrapper.appendChild(productTitle);
    const productInfoWrapper = returnElement({ tag: 'div', classes: ['product-details__info-wrapper'] });
    productSectionWrapper.appendChild(productInfoWrapper);
    const slider = returnElement({ tag: 'div', classes: ['product-detail__slider', 'slider'] });
    productInfoWrapper.appendChild(slider);
    slider.appendChild(this.prevBtn);
    const sliderImgWrapper = returnElement({ tag: 'div', classes: ['slider__img-wrapper'] });
    slider.appendChild(sliderImgWrapper);
    sliderImgWrapper.appendChild(this.sliderImgs);
    slider.appendChild(this.nextBtn);
    const arrImgs = [].concat(productData.masterVariant.images);
    for (let i = 0; i < arrImgs.length; i += 1) {
      const productImg = returnElement({
        tag: 'img',
        classes: ['slider__img'],
        attrib: [{ name: 'src', value: productData.masterVariant.images[i].url }],
      });
      this.sliderImgs.appendChild(productImg);
    }
    const productDescription = returnElement({
      tag: 'p',
      classes: ['product-details__description'],
      textContent: productData.description[`en-US`],
    });
    productInfoWrapper.appendChild(productDescription);
    console.log(this.sliderImgs);
  }

  slideImgs() {
    console.log('ok');
    const imgs = this.sliderImgs;
    console.log(imgs);
  }

  async addSlider() {
    await this.draw();
    this.prevBtn.addEventListener('click', this.slideImgs);
    this.nextBtn.addEventListener('click', this.slideImgs);
  }
}
