import { getProducts } from './api/api';
import { Product } from './api/interfaces';

export default class Products {
  public productDivs: HTMLDivElement[];

  constructor() {
    this.productDivs = [];
  }

  async createProducts(): Promise<HTMLDivElement[]> {
    try {
      const productsResponse = await getProducts();
      const products: Array<Product> = productsResponse.data.results;
      console.log(products);

      products.forEach((productData: Product) => {
        const categoryId = productData.categories[0].id;
        const productId = productData.id;

        const productBox = document.createElement('div');
        productBox.id = productId;
        productBox.classList.add('product__cart');
        productBox.setAttribute('data-category', categoryId);

        const img = document.createElement('img');
        img.classList.add('product__img');
        img.src = productData.masterVariant.images[0].url;
        img.alt = productData.name['en-US'];
        productBox.appendChild(img);

        const title = document.createElement('p');
        title.classList.add('product__title');
        title.textContent = productData.name['en-US'];
        productBox.appendChild(title);
 

        const priceBlock = document.createElement('div');
        priceBlock.classList.add('product__price');
        const price = document.createElement('p');
       
        const priseValue = productData.masterVariant.prices[0].value.centAmount;
        price.textContent = `${priseValue}$`;
        priceBlock.appendChild(price);

         const discountedPrice = productData.masterVariant.prices[0].discounted?.value.centAmount;
        if (discountedPrice) {
          const discountedPriceElement = document.createElement('p');
          discountedPriceElement.classList.add('discounted');
          price.classList.add('previous__price');
          discountedPriceElement.textContent = `${discountedPrice}$`;
          priceBlock.appendChild(discountedPriceElement)
        }
        productBox.appendChild(priceBlock);
        

        this.productDivs.push(productBox);
      });
      console.log(this.productDivs);
      return this.productDivs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
