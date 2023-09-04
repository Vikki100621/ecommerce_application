import { getProducts } from './api/api';
import { Product } from './api/interfaces';

export default class Products {
  public productDivs: HTMLDivElement[];

  public data: Array<Product>;

  public filteredProductdivs: HTMLDivElement[];

  constructor() {
    this.productDivs = [];
    this.data = [];
    this.filteredProductdivs = [];
  }

  async createProducts(): Promise<HTMLDivElement[]> {
    try {
      this.productDivs = [];
      const productsResponse = await getProducts();
      const products: Array<Product> = productsResponse.data.results;
      this.data = products;
      console.log(this.data);

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

        const description = document.createElement('p');
        description.classList.add('product__description');
        description.textContent = productData.description['en-US'];
        productBox.appendChild(description);

        const priceBlock = document.createElement('div');
        priceBlock.classList.add('product__price');
        const price = document.createElement('p');

        const priseValue = productData.masterVariant.prices[0].value.centAmount;
        const formattedNumber = (priseValue / 100).toString();
        price.textContent = `${formattedNumber}$`;
        priceBlock.appendChild(price);
        price.classList.add('current__price');

        const discountedPrice = productData.masterVariant.prices[0].discounted?.value.centAmount;
        if (discountedPrice) {
          const formateddiscountedPrice = (discountedPrice / 100).toString();
          const discountedPriceElement = document.createElement('p');
          discountedPriceElement.classList.add('discounted__price');
          price.classList.add('previous__price');
          discountedPriceElement.textContent = `${formateddiscountedPrice}$`;
          priceBlock.appendChild(discountedPriceElement);
        }
      

        productBox.appendChild(priceBlock);
  const button = document.createElement('button');
        button.classList.add('product__button');
        button.textContent = 'View details';
        productBox.appendChild(button);
        this.productDivs.push(productBox);
      });
      return this.productDivs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
