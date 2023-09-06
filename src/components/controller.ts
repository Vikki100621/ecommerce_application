import Routing from './routing';
import App from './app';
import BurgerMenu from './burger__menu';

export default class Controller {
  private routing: Routing;

  private app: App;

  private burger: BurgerMenu;

  constructor() {
    this.app = new App();
    this.routing = new Routing(this.app);
    this.routing.init();
    this.burger = new BurgerMenu();

    this.burger.init();
    this.init();

  }

  private addProductsHandlers() {
    document.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const clickedElement = event.target as HTMLElement;

      if (window.location.hash.includes('/catalog') && clickedElement.classList.contains('product__category')) {
        this.routing.handleCategoryItemClick(event);

      if (clickedElement.classList.contains('product__button')) {
        this.routing.handleProductItemClick(event);
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

  private displayFilteredResults() {
    this.app.productContainer.innerHTML = '';
    this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
      this.app.productContainer.appendChild(productDiv);
    });
  }


  private checkCheckboxes() {
    const materialCheckboxes = document.querySelectorAll<HTMLInputElement>('.checkbox');
    const selectedMaterials = Array.from(materialCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());


    if (selectedMaterials.length === 0) {
      const productContainer = document.querySelector('.product__container') as HTMLElement;
      productContainer.innerHTML = '';
      this.app.products.productDivs.forEach((productDiv: HTMLElement) => {
        productContainer.appendChild(productDiv);
      });
      return;
    }
    if (selectedMaterials.length === 0) return;


    this.app.products.filteredProductdivs = this.app.products.filteredProductdivs.filter((productDiv) => {
      const elID = productDiv.id;
      const product = this.app.products.data.find((item) => item.id === elID);

      if (product) {
        const { attributes } = product.masterVariant;
        const allAttributeValues = attributes.reduce((accumulator, attribute) => {
          if (Array.isArray(attribute.value)) {
            accumulator.push(...attribute.value.map((value) => value.toLowerCase()));
          } else {
            accumulator.push((attribute.value as string).toLowerCase());
          }
          return accumulator;
        }, [] as string[]);


        return selectedMaterials.every((selectedMaterial) => allAttributeValues.includes(selectedMaterial));

        return selectedMaterials.some((selectedMaterial) => allAttributeValues.includes(selectedMaterial));

      }

      return false;
    });


    const productContainer = document.querySelector('.product__container') as HTMLElement;
    productContainer.innerHTML = '';
    this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
      productContainer.appendChild(productDiv);

  }

  private sortByPrice(order: string) {
    const getPrice = (element: HTMLElement): number => {
      if (!element) return 0;
      const discountedPriceElement = element.querySelector('.discounted__price');
      const priceElement = element.querySelector('.current__price');

      let priceText = '';

      if (discountedPriceElement) {
        priceText = discountedPriceElement.textContent || '';
      } else if (priceElement) {
        priceText = priceElement.textContent || '';
      }

      priceText = priceText.replace('$', '');

      priceText = priceText.trim() || '0';

      return parseFloat(priceText);
    };

    this.app.products.filteredProductdivs.sort((a, b) => {
      const priceA = getPrice(a);
      const priceB = getPrice(b);

      if (order === 'Price: Low to High') {
        return priceA - priceB;
      }

      if (order === 'Price: High to Low') {
        return priceB - priceA;
      }

      return 0;
    });

    return this.app.products.filteredProductdivs;
  }

  private sortByName(order: string) {
    this.app.products.filteredProductdivs.sort((a, b) => {
      const titleAElement = a.querySelector('.product__title');
      const titleA = titleAElement ? titleAElement.textContent!.toLowerCase() : '';
      const titleBElement = b.querySelector('.product__title');
      const titleB = titleBElement ? titleBElement.textContent!.toLowerCase() : '';

      if (order === 'Name: A to Z') {
        return titleA.localeCompare(titleB);
      }
      if (order === 'Name: Z to A') {
        return titleB.localeCompare(titleA);
      }

      return 0;
    });
    return this.app.products.filteredProductdivs;
  }

  private updateFiltersAndSearch() {
    const selectedCategory = this.app.sorting.categoryDropdown?.value;
    const searchText = this.app.sorting.searchInput.value.toLowerCase().trim();
    const valuePrice = this.app.sorting.priceSortDropdown?.value as string;
    const valueName = this.app.sorting.nameSortDropdown?.value as string;
    this.filterByCategory(selectedCategory);
    this.filterBySearchText(searchText);
    this.filterBySearchText(searchText);
    this.checkCheckboxes();
    this.sortByPrice(valuePrice);
    this.sortByName(valueName);
    this.displayFilteredResults();
  }

  private filterByCategory(category: string | undefined) {
    if (category === 'all products') {
      this.app.products.filteredProductdivs = this.app.products.productDivs;
    } else {
      this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
        const dataAttr = item.getAttribute('data-category');
        return dataAttr === this.getCategoryIdByCategoryName(category);
      });
    }
  }

  private filterBySearchText(searchText: string) {
    this.app.products.filteredProductdivs = this.app.products.filteredProductdivs.filter((productDiv) => {
      const elID = productDiv.id;
      const product = this.app.products.data.find((item) => item.id === elID);
      if (product) {
        const searchKeywords = product.name['en-US'].split(' ').map((keywordObj) => keywordObj.toLowerCase());
        return searchKeywords.some((keyword) => keyword.includes(searchText));
      }
      return false;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private getCategoryIdByCategoryName(categoryName: string | undefined): string {
    switch (categoryName) {
      case 'dishes':
        return 'eb65d601-d77d-48fa-a7fa-7f5ef0d39454';

      case 'paintings':
        return 'b92cb37a-12a1-4fae-8c47-496f4540603c';

      case 'jewellery':
        return '12b137e5-341a-4d73-8fb5-ae453c745db4';

      case 'coins':
        return '9a31e44b-6f15-4f3c-a633-0d4ebc2ae444';

      default:
        return '';
    }
  }

  private addCheckboxesHandlers() {
    const filterContainer = this.app.sorting.leftsideSortBlock?.querySelector('.filters__container');
    const checkboxes = filterContainer?.querySelectorAll('.checkbox');
    checkboxes?.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.updateFiltersAndSearch();
      });
    });
  }

  private addPriceSortListener() {
    this.app.sorting.priceSortDropdown?.addEventListener('change', () => {
      this.updateFiltersAndSearch();
    });
  }

  private addNameSortListener() {
    this.app.sorting.nameSortDropdown?.addEventListener('change', () => {
      this.updateFiltersAndSearch();

    });
  }

  private addSortingHandlers() {
    this.app.sorting.categoryDropdown?.addEventListener('change', () => {
      const cat = this.app.sorting.categoryDropdown?.value as string;
      this.filterByCategory(cat);
      this.app.sorting.createFilters(cat);

      this.updateFiltersAndSearch();

      this.displayFilteredResults();
      this.addCheckboxesHandlers();
    });
  }

  private addSearchHandlers() {
    this.app.sorting.searchInput.addEventListener('input', () => {
      this.updateFiltersAndSearch();
    });
  }


  private addSearchButtionHandlers() {
    this.app.sorting.searchButton.addEventListener('click', () => {
      console.log('click');
      this.checkCheckboxes();
      this.updateFiltersAndSearch();
    });
  }

  public init() {
    this.burger.init();
    this.routing.init();

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

    this.addSearchButtionHandlers();

    this.addPriceSortListener();
    this.addNameSortListener();
    this.addCheckboxesHandlers();
  }

  public init() {
    this.addProductsHandlers();
    this.addMenuClickHandlers();
    this.allHandlers();
  }
}
