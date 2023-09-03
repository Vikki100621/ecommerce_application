import Routing from './routing';
import App from './app';
import BurgerMenu from './burger__menu';

// import { Product } from './api/interfaces';

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

  private addCategoryClickHandlers() {
    document.addEventListener('click', (event) => {
      event.stopPropagation();
      const clickedElement = event.target as HTMLElement;
      if (window.location.hash.includes('/catalog') && clickedElement.classList.contains('product__category')) {
        event.stopPropagation();
        this.routing.handleCategoryItemClick(event);
      } else if (
        window.location.hash.includes('allproducts') ||
        window.location.hash.includes('jewellery') ||
        window.location.hash.includes('paintings') ||
        window.location.hash.includes('dishes') ||
        window.location.hash.includes('coins')
      ) {
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

  private updateFiltersAndSearch() {
    const selectedCategory = this.app.sorting.categoryDropdown?.value;
    const searchText = this.app.sorting.searchInput.value.toLowerCase().trim();

    const valuePrice = this.app.sorting.priceSortDropdown?.value as string;
    const valueName = this.app.sorting.nameSortDropdown?.value as string;

    switch (selectedCategory) {
      case 'all products':
        this.app.products.filteredProductdivs = this.app.products.productDivs;
        break;
      case 'dishes':
        this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
          const dataAttr = item.getAttribute('data-category');
          return dataAttr === 'eb65d601-d77d-48fa-a7fa-7f5ef0d39454';
        });
        break;
      case 'paintings':
        this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
          const dataAttr = item.getAttribute('data-category');
          return dataAttr === 'b92cb37a-12a1-4fae-8c47-496f4540603c';
        });
        break;
      case 'jewellery':
        this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
          const dataAttr = item.getAttribute('data-category');
          return dataAttr === '12b137e5-341a-4d73-8fb5-ae453c745db4';
        });
        break;
      case 'coins':
        this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
          const dataAttr = item.getAttribute('data-category');
          return dataAttr === '9a31e44b-6f15-4f3c-a633-0d4ebc2ae444';
        });
        break;
      default:
        this.app.products.filteredProductdivs = this.app.products.productDivs;
        break;
    }

    this.app.products.filteredProductdivs = this.app.products.filteredProductdivs.filter((productDiv) => {
      const elID = productDiv.id;
      const product = this.app.products.data.find((item) => item.id === elID);
      if (product) {
        const searchKeywords = product.name['en-US'].split(' ').map((keywordObj) => keywordObj.toLowerCase());
        return searchKeywords.some((keyword) => keyword.includes(searchText));
      }
      return false;
    });

    this.checkCheckboxes();

    this.sortByPrice(valuePrice);
    this.sortByName(valueName);
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
    console.log(selectedMaterials);
    if (selectedMaterials.length === 0) {
      this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
        this.app.productContainer.appendChild(productDiv);
      });
    }
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
        console.log(allAttributeValues);
        return selectedMaterials.every((selectedMaterial) => allAttributeValues.includes(selectedMaterial));
      }

      return false;
    });

    this.app.productContainer.innerHTML = '';
    this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
      this.app.productContainer.appendChild(productDiv);
    });
  }

  private sortByPrice(order: string) {
    if (order === 'Price: Low to High') {
      this.app.products.filteredProductdivs.sort((a, b) => {
        const priceAElement = a.querySelector('.product__price');
        const priceA = priceAElement ? parseFloat(priceAElement.textContent!.replace('$', '')) : 0;
        const priceBElement = b.querySelector('.product__price');
        const priceB = priceBElement ? parseFloat(priceBElement.textContent!.replace('$', '')) : 0;
        return priceA - priceB;
      });
    } else if (order === 'Price: High to Low') {
      this.app.products.filteredProductdivs.sort((a, b) => {
        const priceAElement = a.querySelector('.product__price');
        const priceA = priceAElement ? parseFloat(priceAElement.textContent!.replace('$', '')) : 0;
        const priceBElement = b.querySelector('.product__price');
        const priceB = priceBElement ? parseFloat(priceBElement.textContent!.replace('$', '')) : 0;
        return priceB - priceA;
      });
    }

    this.app.products.filteredProductdivs.forEach((productDiv) => {
      this.app.productContainer.appendChild(productDiv);
    });
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

    this.app.products.filteredProductdivs.forEach((productDiv) => {
      this.app.productContainer.appendChild(productDiv);
    });
  }

  private addPriceSortListener() {
    this.app.sorting.priceSortDropdown?.addEventListener('change', () => {
      const value = this.app.sorting.priceSortDropdown?.value as string;
      this.sortByPrice(value);
      this.updateFiltersAndSearch();
      this.allHandlers();
    });
  }

  private addNameSortListener() {
    this.app.sorting.nameSortDropdown?.addEventListener('change', () => {
      const value = this.app.sorting.nameSortDropdown?.value as string;

      this.sortByName(value);
      this.updateFiltersAndSearch();
      this.allHandlers();
    });
  }

  private addSortingHandlers() {
    this.app.sorting.categoryDropdown?.addEventListener('change', () => {
      const cat = this.app.sorting.categoryDropdown?.value as string;
      console.log(cat);
      this.app.sorting.createFilters(cat);
      this.updateFiltersAndSearch();
      this.allHandlers();
    });
  }

  private addSearchHandlers() {
    this.app.sorting.searchInput.addEventListener('input', () => {
      this.updateFiltersAndSearch();
      this.allHandlers();
    });
  }

  private addSearchButtionHandlers() {
    const filterContainer = this.app.sorting.leftsideSortBlock?.querySelector('.filters__container');
    const checkboxes = filterContainer?.querySelectorAll('.checkbox');
    checkboxes?.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.checkCheckboxes();
        this.updateFiltersAndSearch();
      });
    });
  }

  private addProductsClick() {
    this.app.products.filteredProductdivs.forEach((productDiv) => {
      productDiv.addEventListener('click', (event) => {
        console.log('Child clicked');
        event.stopPropagation();
        this.routing.handleProductItemClick(event);
      });
    });
  }

  private allHandlers() {
    this.addProductsClick();
    this.addSearchButtionHandlers();
    this.addSearchHandlers();
    this.addSortingHandlers();
    this.addPriceSortListener();
    this.addNameSortListener();
  }

  public init() {
    this.addCategoryClickHandlers();
    this.addMenuClickHandlers();
    this.allHandlers();
  }
}
