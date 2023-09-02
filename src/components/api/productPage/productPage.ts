import drawElementInParent from '../../common/drawElemInParent';
import returnElement from '../../common/returnElem';
import { getProduct } from '../api';

export default class ProductPage {
  main: HTMLElement;

  id: string;

  constructor(id: string) {
    this.id = id;
    this.main = <HTMLElement>document.getElementById(`main`);
  }

  async draw() {
    const productResponse = await getProduct(this.id);
    const productData = productResponse.data;
    console.log(productData);

    const productSectionWrapper = returnElement({ tag: 'section', classes: ['product-details'] });
    drawElementInParent(this.main, productSectionWrapper);
    const productTitle = returnElement({
      tag: 'h1',
      classes: ['product-details__title'],
      textContent: productData.name[`en-US`],
    });
    drawElementInParent(productSectionWrapper, productTitle);
    const productInfoWrapper = returnElement({ tag: 'div', classes: ['product-details__info-wrapper'] });
    drawElementInParent(productSectionWrapper, productInfoWrapper);
    const productImgWrapper = returnElement({ tag: 'div', classes: ['product-details__img-wrapper'] });
    drawElementInParent(productInfoWrapper, productImgWrapper);
    const arrImgs = [].concat(productData.masterVariant.images);
    for (let i = 0; i < arrImgs.length; i += 1) {
      const productImg = returnElement({
        tag: 'img',
        classes: ['product-details__img'],
        attrib: [{ name: 'src', value: productData.masterVariant.images[i].url }],
      });
      drawElementInParent(productImgWrapper, productImg);
    }
    const productDescription = returnElement({
      tag: 'p',
      classes: ['product-details__description'],
      textContent: productData.description[`en-US`],
    });
    drawElementInParent(productInfoWrapper, productDescription);
  }
}
