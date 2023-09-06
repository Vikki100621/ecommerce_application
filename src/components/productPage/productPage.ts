import returnElement from '../common/returnElem';
import IImage from './IImage';
import ModalWindow from './modalWindow';
import Slider from './slider';

interface IProductType {
  typeId: string;
  id: string;
}

interface IPriceValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

interface IPrice {
  id: string;
  value: IPriceValue;
  discounted?: {
    value: IPriceValue;
    discount: IProductType;
  };
}

interface IAttribute {
  name: string;
  value: string[];
}

interface IProductData {
  id: string;
  version: number;
  productType: IProductType;
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  categories: IProductType[];
  slug: {
    'en-US': string;
  };
  metaDescription: {
    'en-US': string;
    ru: string;
  };
  masterVariant: {
    id: number;
    sku: string;
    key: string;
    prices: IPrice[];
    images: IImage[];
    attributes: IAttribute[];
    assets: [];
  };
  variants: [];
  searchKeywords: {
    'en-US': { text: string }[];
  };
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export default class ProductPage {
  main: HTMLElement;

  productInfoWrapper: HTMLElement;

  productSectionWrapper: HTMLElement;

  data: IProductData;

  constructor(data: IProductData) {
    this.data = data;
    this.main = <HTMLElement>document.getElementById(`main`);
    this.productInfoWrapper = returnElement({ tag: 'div', classes: ['product-details__info-wrapper'] });
    this.productSectionWrapper = returnElement({ tag: 'section', classes: ['product-details'] });
  }

  draw() {
    this.main.append(this.productSectionWrapper);
    const productTitle = returnElement({
      tag: 'h1',
      classes: ['product-details__title'],
      textContent: this.data.name[`en-US`],
    });
    this.productSectionWrapper.append(productTitle);
    const productDescription = returnElement({
      tag: 'p',
      classes: ['product-details__description'],
      textContent: this.data.description[`en-US`],
    });
    this.productInfoWrapper.append(productDescription);
    this.productSectionWrapper.append(this.productInfoWrapper);
  }

  addSlider() {
    const slider = new Slider(this.data.masterVariant.images, this.productInfoWrapper);
    const modalWindow = new ModalWindow(this.data.masterVariant.images);
    slider.draw();

    function slideImg(evt: MouseEvent) {
      if (evt.target === slider.nextBtn || evt.target === modalWindow.slider.nextBtn) {
        slider.slide('next');
        modalWindow.slider.slide('next');
      } else if (evt.target === slider.prevBtn || evt.target === modalWindow.slider.prevBtn) {
        slider.slide('prev');
        modalWindow.slider.slide('prev');
      }
    }

    function showModalWindow() {
      modalWindow.show();
    }

    function hideModalWindow() {
      modalWindow.hide();
    }

    function removeAllListeners() {
      slider.nextBtn.removeEventListener('click', slideImg);
      slider.prevBtn.removeEventListener('click', slideImg);
      slider.sliderImgs.removeEventListener('click', showModalWindow);
      window.removeEventListener('load', slider.checkForAloneImg);
      window.removeEventListener('beforeunload', removeAllListeners);
    }

    slider.checkFirstLast(Number.parseInt(slider.sliderImgs.style.left, 10));
    modalWindow.draw();
    slider.checkForAloneImg();

    slider.nextBtn.addEventListener('click', slideImg);
    slider.prevBtn.addEventListener('click', slideImg);
    modalWindow.nextBtn.addEventListener('click', slideImg);
    modalWindow.prevBtn.addEventListener('click', slideImg);
    slider.sliderImgs.addEventListener('click', showModalWindow);
    window.addEventListener('beforeunload', removeAllListeners);
    modalWindow.btnClose.addEventListener('click', hideModalWindow);
  }

  addPrice() {
    const pricesBlock = returnElement({ tag: 'div', classes: ['product-details__prices'] });
    const usualPriceBlock = returnElement({ tag: 'div', classes: ['product-details__price-usual'] });
    pricesBlock.append(usualPriceBlock);
    this.productInfoWrapper.prepend(pricesBlock);
    const prices = this.data.masterVariant.prices[0];
    const usualPriceValue = (prices.value.centAmount / 100).toFixed(2);
    if (prices.discounted) {
      const discountPriceBlock = returnElement({ tag: 'div', classes: ['product-details__price-sale'] });
      pricesBlock.append(discountPriceBlock);
      const discountedPriceValue = (prices.discounted.value.centAmount / 100).toFixed(2);
      discountPriceBlock.textContent = `$ ${discountedPriceValue}`;
      usualPriceBlock.classList.add('product-details__price-usual_inactive');
    }

    usualPriceBlock.textContent = `$ ${usualPriceValue}`;
  }
}
