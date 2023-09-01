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
    this.burger = new BurgerMenu();
  }

  private addCategoryClickHandlers() {
    document.addEventListener('click', (event) => {
      event.stopPropagation();
      const clickedElement = event.target as HTMLElement;
      if (window.location.hash.includes('/catalog') && clickedElement.classList.contains('product__category')) {
        this.routing.handleCategoryItemClick(event);
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

    switch (selectedCategory) {
      case 'all':
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
      default:
        this.app.products.filteredProductdivs = this.app.products.productDivs;
        break;
    }

    this.app.products.filteredProductdivs = this.app.products.filteredProductdivs.filter((productDiv) => {
      const elID = productDiv.id;
      const product = this.app.products.data.find((item) => item.id === elID);
      if (product) {
        const searchKeywords = product.searchKeywords['en-US'].map((keywordObj) => keywordObj.text.toLowerCase());
        return searchKeywords.some((keyword) => keyword.includes(searchText));
      }
      return false;
    });

    const productContainer = document.querySelector('.product__container') as HTMLElement;
    productContainer.innerHTML = '';
    this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
      productContainer.appendChild(productDiv);
    });
  }

  // private updateFiltersAndSearch() {
  //   const selectedCategory = this.app.sorting.categoryDropdown?.value;
  //   const searchText = this.app.sorting.searchInput.value.toLowerCase().trim();

  //   switch (selectedCategory) {
  //     case 'all':
  //       if (this.hasSelectedCheckboxes()) {
  //         this.checkCheckboxes();
  //       } else {
  //         this.app.products.filteredProductdivs = this.app.products.productDivs;
  //         break;
  //       }
  //       break;
  //     case 'dishes':
  //       if (this.hasSelectedCheckboxes()) {
  //         this.checkCheckboxes();
  //       } else {
  //         this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
  //           const dataAttr = item.getAttribute('data-category');
  //           return dataAttr === 'eb65d601-d77d-48fa-a7fa-7f5ef0d39454';
  //         });
  //       }
  //       break;
  //     case 'paintings':
  //       if (this.hasSelectedCheckboxes()) {
  //         this.checkCheckboxes();
  //       } else {
  //         this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
  //           const dataAttr = item.getAttribute('data-category');
  //           return dataAttr === 'b92cb37a-12a1-4fae-8c47-496f4540603c';
  //         });
  //       }
  //       break;
  //     case 'jewellery':
  //       if (this.hasSelectedCheckboxes()) {
  //         this.checkCheckboxes();
  //       } else {
  //         this.app.products.filteredProductdivs = this.app.products.productDivs.filter((item) => {
  //           const dataAttr = item.getAttribute('data-category');
  //           return dataAttr === '12b137e5-341a-4d73-8fb5-ae453c745db4';
  //         });
  //       }
  //       break;
  //     default:
  //       this.app.products.filteredProductdivs = this.app.products.productDivs;
  //       break;
  //   }
  //   this.app.products.filteredProductdivs = this.app.products.filteredProductdivs.filter((productDiv) => {
  //     const elID = productDiv.id;
  //     const product = this.app.products.data.find((item) => item.id === elID);
  //     if (product) {
  //       const searchKeywords = product.searchKeywords['en-US'].map((keywordObj) => keywordObj.text.toLowerCase());
  //       return searchKeywords.some((keyword) => keyword.includes(searchText));
  //     }
  //     return false;
  //   });

  //   const productContainer = document.querySelector('.product__container') as HTMLElement;
  //   productContainer.innerHTML = '';
  //   this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
  //     productContainer.appendChild(productDiv);
  //   });
  // }

  // eslint-disable-next-line class-methods-use-this
  private hasSelectedCheckboxes() {
    const materialCheckboxes = document.querySelectorAll<HTMLInputElement>('.checkbox');
    return Array.from(materialCheckboxes).some((checkbox) => checkbox.checked);
  }

  private checkCheckboxes() {
    this.app.products.filteredProductdivs = this.app.products.productDivs.slice();

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
      }

      return false;
    });

    const productContainer = document.querySelector('.product__container') as HTMLElement;
    productContainer.innerHTML = '';
    this.app.products.filteredProductdivs.forEach((productDiv: HTMLElement) => {
      productContainer.appendChild(productDiv);
    });
  }

  private addSortingHandlers() {
    this.app.sorting.categoryDropdown?.addEventListener('change', () => {
      const cat = this.app.sorting.categoryDropdown?.value as string;
      this.app.sorting.createFilters(cat);
      this.updateFiltersAndSearch();
    });
  }

  private addSearchHandlers() {
    this.app.sorting.searchInput.addEventListener('input', () => {
      this.checkCheckboxes();
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
    this.addSearchHandlers();
    this.addCategoryClickHandlers();
    this.addMenuClickHandlers();
    this.addSortingHandlers();
    this.addSearchButtionHandlers();
  }
}
