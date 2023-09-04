import returnElement from '../common/returnElem';
import IImage from './IImage';
import Modal from './modalWindow';
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
    slider.draw();
    const imgsNum = this.data.masterVariant.images.length - 1;

    function checkFirstLast(imgPosition: number) {
      slider.prevBtn.disabled = false;
      slider.nextBtn.disabled = false;

      if (imgPosition === 0) {
        slider.prevBtn.disabled = true;
      }
      if (imgPosition <= -1 * (imgsNum * 220)) {
        slider.nextBtn.disabled = true;
      }
      if (imgsNum === 0) {
        slider.prevBtn.disabled = true;
        slider.nextBtn.disabled = true;
      }
    }

    function fSlider(evt: MouseEvent) {
      const imgStartPosition = Number.parseInt(slider.sliderImgs.style.left, 10);

      const step = 220;
      if (evt.target === slider.nextBtn) {
        slider.sliderImgs.style.left = `${imgStartPosition - step}px`;
        checkFirstLast(Number.parseInt(slider.sliderImgs.style.left, 10));
      } else if (evt.target === slider.prevBtn) {
        slider.sliderImgs.style.left = `${imgStartPosition + step}px`;
        checkFirstLast(Number.parseInt(slider.sliderImgs.style.left, 10));
      }
    }

    function showModalWindow(evt: MouseEvent) {
      const node: HTMLImageElement = <HTMLImageElement>evt.target;
      if (node.className === 'slider__img') {
        const newNode: HTMLImageElement = <HTMLImageElement>node.cloneNode(true);
        const modal = new Modal(newNode);

        // eslint-disable-next-line no-inner-declarations
        function hideModalWindow() {
          modal.hide();
          modal.btnClose.removeEventListener('click', hideModalWindow);
        }
        modal.draw();
        modal.btnClose.addEventListener('click', hideModalWindow);
      }
    }

    function removeAllListeners() {
      slider.nextBtn.removeEventListener('click', fSlider);
      slider.prevBtn.removeEventListener('click', fSlider);
      slider.sliderImgs.removeEventListener('click', showModalWindow);
      window.removeEventListener('beforeunload', removeAllListeners);
    }

    function checkForAloneImg() {
      if (imgsNum === 0) {
        setTimeout(() => {
          slider.nextBtn.classList.add('slider__btn_unactive');
          slider.prevBtn.classList.add('slider__btn_unactive');
          window.removeEventListener('load', checkForAloneImg);
        }, 500);
      }
    }

    checkFirstLast(Number.parseInt(slider.sliderImgs.style.left, 10));
    checkForAloneImg();

    slider.nextBtn.addEventListener('click', fSlider);
    slider.prevBtn.addEventListener('click', fSlider);
    slider.sliderImgs.addEventListener('click', showModalWindow);
    window.addEventListener('load', checkForAloneImg);
    window.addEventListener('beforeunload', removeAllListeners);
  }

  addPrice() {
    const pricesBlock = returnElement({ tag: 'div', classes: ['slider__prices'] });
    const usualPriceBlock = returnElement({ tag: 'div', classes: ['slider__price-usual'] });
    pricesBlock.append(usualPriceBlock);
    this.productInfoWrapper.prepend(pricesBlock);
    const prices = this.data.masterVariant.prices[0];
    const usualPriceValue = (prices.value.centAmount / 100).toFixed(2);
    if (prices.discounted) {
      const discountPriceBlock = returnElement({ tag: 'div', classes: ['slider__price-sale'] });
      pricesBlock.append(discountPriceBlock);
      const discountedPriceValue = (prices.discounted.value.centAmount / 100).toFixed(2);
      discountPriceBlock.textContent = `$ ${discountedPriceValue}`;
      usualPriceBlock.classList.add('slider__price-usual_inactive');
    }

    usualPriceBlock.textContent = `$ ${usualPriceValue}`;
  }
}
