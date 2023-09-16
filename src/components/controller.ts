import Routing from './routing';
import App from './app';
import BurgerMenu from './burger__menu';
import { Options, Product } from './api/interfaces';
import Cart from './cart';

export default class Controller {
  private routing: Routing;

  private app: App;

  private burger: BurgerMenu;

  private cart: Cart;

  constructor() {
    this.cart = new Cart();
    this.app = new App();
    this.routing = new Routing(this.app);
    this.routing.init();
    this.burger = new BurgerMenu();
    this.burger.init();
    this.init();
  }

  private addCounterClickHandlers() {
    const removeButtons = document.querySelectorAll('.remove__button');
    removeButtons.forEach((removeButton) => {
      removeButton.addEventListener('click', () => {
        if (removeButton) {
          const quantity = removeButton.nextElementSibling as HTMLDivElement;
          const parentID = removeButton.closest('div')?.id as string;
          const number = parseInt(quantity.textContent || '0', 10);
          this.cart.changeCartQunity(number, parentID);
          this.app.showCartPage();
        }
      });
    });
  }

  private addProductsHandlers() {
    document.addEventListener('click', async (event) => {
      event.stopImmediatePropagation();
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.classList.contains('product__button')) {
        this.routing.handleProductItemClick(event);
      } else if (clickedElement.classList.contains('cart__button')) {
        this.cart.handleclickonCart(event);
      }
    });
  }

  private addMenuClickHandlers() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener('click', (event) => {
        event.stopPropagation();
        this.routing.handleMenuItemClick(index, event);
      });
    });
  }

  private displayFilteredResults(data: HTMLDivElement[]) {
    this.app.productContainer.innerHTML = '';
    data.forEach((productDiv: HTMLElement) => {
      this.app.productContainer.appendChild(productDiv);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private checkCheckboxes() {
    const materialCheckboxes = document.querySelectorAll<HTMLInputElement>('.Material .checkbox');
    const selectedMaterials = Array.from(materialCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());

    const typeCheckboxes = document.querySelectorAll<HTMLInputElement>('.Type .checkbox');
    const selectedType = Array.from(typeCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());

    const originCheckboxes = document.querySelectorAll<HTMLInputElement>('.Origin .checkbox');
    const selectedOrigin = Array.from(originCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());

    const genreCheckboxes = document.querySelectorAll<HTMLInputElement>('.Genre .checkbox');
    const selectedGenre = Array.from(genreCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());

    const checkboxesObject = {
      material: selectedMaterials,
      type: selectedType,
      origin: selectedOrigin,
      genre: selectedGenre,
    };
    return checkboxesObject;
  }

  private async searchProducts(options: Options) {
    this.app.products.searchProducts(options).then((response) => {
      const filteredProducts = response?.filter((product) => this.filterBySearchText(product));
      const data = this.app.products.renderProducts(filteredProducts);
      this.displayFilteredResults(data);
    });
  }

  private updateFiltersAndSearchNew() {
    const options: Options = {};

    const selectedCategory = this.app.sorting.categoryDropdown?.value;
    const rangeMin = this.app.sorting.rangeMinInput;
    const rangeMinValue = Number(rangeMin.value);
    const rangeMax = this.app.sorting.rangeMaxInput;
    const rangeMaxValue = Number(rangeMax.value);

    const valueSort = this.app.sorting.sortDropdown?.value as string;
    if (valueSort === 'Price ⇧') {
      options.data = 'price';
      options.value = 'asc';
    }
    if (valueSort === 'Price ⇩') {
      options.data = 'price';
      options.value = 'desc';
    }

    if (valueSort === 'Name ⇧') {
      options.data = 'name.en-us';
      options.value = 'asc';
    }
    if (valueSort === 'Name ⇩') {
      options.data = 'name.en-us';
      options.value = 'desc';
    }

    if (rangeMinValue === 0 && rangeMaxValue === 0) {
      options.priceRange = {
        min: 300,
        max: 100000,
      };
    } else {
      options.priceRange = {
        min: rangeMinValue,
        max: rangeMaxValue,
      };
    }

    if (selectedCategory) {
      options.categoryId = selectedCategory;
    }

    const checkboxesObject = this.checkCheckboxes();

    options.material = checkboxesObject.material.join(',');
    options.type = checkboxesObject.type.join(',');
    options.origin = checkboxesObject.origin.join(',');
    options.genre = checkboxesObject.genre.join(',');
    options.categoryId = selectedCategory;

    this.searchProducts(options);
  }

  private filterBySearchText(product: Product) {
    const searchText = this.app.sorting.searchInput.value.toLowerCase().trim();
    const searchKeywords = product.name['en-US'].split(' ').map((keywordObj) => keywordObj.toLowerCase());
    return searchKeywords.some((keyword) => keyword.includes(searchText));
  }

  private addCheckboxesHandlers() {
    const filterContainer = this.app.sorting.leftsideSortBlock?.querySelector('.filters__container');
    const checkboxes = filterContainer?.querySelectorAll('.checkbox');
    checkboxes?.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.updateFiltersAndSearchNew();
      });
    });
  }

  private addSortListener() {
    this.app.sorting.sortDropdown?.addEventListener('change', () => {
      this.updateFiltersAndSearchNew();
    });
  }

  private addPriceRangeMinListener() {
    const pricerange = this.app.sorting.rangeMinInput;
    pricerange?.addEventListener('input', () => {
      this.updateFiltersAndSearchNew();
    });
  }

  private addPriceRangeMaxListener() {
    const pricerange = this.app.sorting.rangeMaxInput;

    pricerange?.addEventListener('input', () => {
      this.updateFiltersAndSearchNew();
    });
  }

  private addSortingHandlers() {
    this.app.sorting.categoryDropdown?.addEventListener('change', () => {
      const cat = this.app.sorting.categoryDropdown?.value as string;
      this.app.sorting.createFilters(cat);
      this.addCheckboxesHandlers();
      this.updateFiltersAndSearchNew();
    });
  }

  private addSearchHandlers() {
    this.app.sorting.searchInput.addEventListener('input', () => {
      this.updateFiltersAndSearchNew();
    });
  }

  private addProductsClick() {
    this.app.products.filteredProductdivs.forEach((productDiv) => {
      productDiv.addEventListener('click', (event) => {
        event.stopPropagation();
        this.routing.handleProductItemClick(event);
      });
    });
  }

  private allHandlers() {
    this.addProductsClick();
    this.addSearchHandlers();
    this.addSortingHandlers();
    this.addSortListener();
    this.addCheckboxesHandlers();
    this.addPriceRangeMaxListener();
    this.addPriceRangeMinListener();
  }

  public init() {
    this.addProductsHandlers();
    this.addMenuClickHandlers();
    this.allHandlers();
    this.addCounterClickHandlers();
  }
}
