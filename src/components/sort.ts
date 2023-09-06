/* eslint-disable class-methods-use-this */
import { getCategories } from './api/api';
import { Category } from './api/interfaces';

export default class Sorting {
  public sortBlock: HTMLDivElement | undefined;

  public categoryDropdown: HTMLSelectElement | undefined;

  public leftsideSortBlock: HTMLDivElement | undefined;

  public rightsideSortBlock: HTMLDivElement | undefined;

  public nameSortDropdown: HTMLSelectElement | undefined;

  public priceSortDropdown: HTMLSelectElement | undefined;

  public selectedCategory: string;

  public searchInput: HTMLInputElement;

  public rangeMinInput: HTMLInputElement;

  public rangeMaxInput: HTMLInputElement;

  public sortDropdown: HTMLSelectElement;

  constructor() {
    this.sortBlock = document.createElement('div');
    this.categoryDropdown = document.createElement('select');
    this.leftsideSortBlock = document.createElement('div');
    this.rightsideSortBlock = document.createElement('div');
    this.searchInput = document.createElement('input');
    this.rangeMinInput = document.createElement('input');
    this.rangeMaxInput = document.createElement('input');
    this.sortDropdown = document.createElement('select');
    this.selectedCategory = 'all products';
    this.setupSortBlock();
    this.createCategoryDropdown();
    this.createFilters('all products');
    this.createPriceAndNameSortDropdowns();
  }

  private setupSortBlock() {
    this.sortBlock?.classList.add('sort__container');
    this.categoryDropdown?.classList.add('category__dropdown');
    this.leftsideSortBlock?.classList.add('sort__container-left');
    this.rightsideSortBlock?.classList.add('sort__container-right');

    if (this.leftsideSortBlock) this.sortBlock?.appendChild(this.leftsideSortBlock);
    if (this.rightsideSortBlock) this.sortBlock?.appendChild(this.rightsideSortBlock);
    this.createSearchInput();
    this.createPriceRangeInputs();
  }

  private createPriceRangeInputs() {
    const priceRangeLabel = document.createElement('label');
    priceRangeLabel.textContent = 'Price range:';
    priceRangeLabel.classList.add('sort__label');

    const priceRangeContainer = document.createElement('div');
    priceRangeContainer.classList.add('price-range');

    this.rangeMinInput.type = 'number';
    this.rangeMinInput.placeholder = 'Min';
    this.rangeMinInput.min = '0';
    this.rangeMinInput.classList.add('range-min');
    this.rangeMaxInput.type = 'number';
    this.rangeMaxInput.placeholder = 'Max';
    this.rangeMaxInput.max = '1000000';
    this.rangeMaxInput.classList.add('range-max');
    const container = document.createElement('div');
    container.classList.add('price-range-container');
    priceRangeContainer.appendChild(this.rangeMinInput);
    priceRangeContainer.appendChild(this.rangeMaxInput);
    container.appendChild(priceRangeLabel);
    container.appendChild(priceRangeContainer);
    this.leftsideSortBlock?.appendChild(container);
  }

  private createSearchInput() {
    this.searchInput.type = 'text';
    this.searchInput.placeholder = 'I search...';
    this.searchInput.classList.add('search__input');
    this.nameSortDropdown = document.createElement('select');
    this.leftsideSortBlock?.appendChild(this.searchInput);
  }

  private async getCategory(): Promise<Record<string, string>> {
    const categoriesResponse = await getCategories();
    const categories: Array<Category> = categoriesResponse.data.results;

    const categoryMap: Record<string, string> = {};

    categories.forEach((categoryData: Category) => {
      const categoryId = categoryData.id;
      const categoryName = categoryData.name['en-US'];
      categoryMap[categoryName] = categoryId;
    });

    return categoryMap;
  }

  public async createCategoryDropdown() {
    const categoriesMap = await this.getCategory();
    const categories = Object.keys(categoriesMap);

    if (this.categoryDropdown) {
      this.categoryDropdown.innerHTML = '';
      const allproducts = document.createElement('option');
      allproducts.textContent = 'All products';
      allproducts.value = '';
      this.categoryDropdown.appendChild(allproducts);

      categories.forEach((categoryName) => {
        const option = document.createElement('option');
        option.value = categoriesMap[categoryName];
        option.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        this.categoryDropdown?.appendChild(option);
      });
    }

    if (this.categoryDropdown) this.leftsideSortBlock?.insertBefore(this.categoryDropdown, this.leftsideSortBlock?.firstChild);;
  }

  public createFilters(selectedCategory: string) {
    const existingFiltersContainer = this.leftsideSortBlock?.querySelector('.filters__container');
    if (existingFiltersContainer) {
      existingFiltersContainer.remove();
    }

    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters__container');

    if (selectedCategory === 'eb65d601-d77d-48fa-a7fa-7f5ef0d39454') {
      const materialFilter = this.createDropdownWithCheckboxes('Material', [
        'Venetian glass',
        'Porcelain',
        'Crystal',
        'Marble',
      ]);
      const typeFilter = this.createDropdownWithCheckboxes('Type', ['Plate', 'Teapot', 'Cup', 'Vase']);
      const originFilter = this.createDropdownWithCheckboxes('Origin', ['Asia', 'Europe', 'America']);

      filtersContainer.appendChild(materialFilter);
      filtersContainer.appendChild(typeFilter);
      filtersContainer.appendChild(originFilter);
    } else if (selectedCategory === 'b92cb37a-12a1-4fae-8c47-496f4540603c') {
      const originFilter = this.createDropdownWithCheckboxes('Origin', ['Asia', 'Europe', 'America']);
      const genreFilter = this.createDropdownWithCheckboxes('Genre', [
        'Portrait',
        'Landscape',
        'Seascape',
        'Caricature',
        'Still life',
        'Abstraction',
      ]);

      filtersContainer.appendChild(originFilter);
      filtersContainer.appendChild(genreFilter);
    } else if (selectedCategory === '12b137e5-341a-4d73-8fb5-ae453c745db4') {
      const typeFilter = this.createDropdownWithCheckboxes('Type', ['Ring', 'Necklace', 'Earrings']);
      const materialFilter = this.createDropdownWithCheckboxes('Material', [
        'Yellow gold',
        'White gold',
        'Silver',
        'Diamond',
        'Topaz',
        'Amethyst',
        'Zircon',
      ]);
      const originFilter = this.createDropdownWithCheckboxes('Origin', ['Asia', 'Europe', 'America']);
      filtersContainer.appendChild(typeFilter);
      filtersContainer.appendChild(materialFilter);
      filtersContainer.appendChild(originFilter);
    } else if (selectedCategory === '9a31e44b-6f15-4f3c-a633-0d4ebc2ae444') {
      const originFilter = this.createDropdownWithCheckboxes('Origin', ['Asia', 'Europe', 'America']);
      const materialFilter = this.createDropdownWithCheckboxes('Material', ['Yellow gold', 'Silver']);
      filtersContainer.appendChild(originFilter);
      filtersContainer.appendChild(materialFilter);
    } else {
      const allMaterials = [
        'Yellow gold',
        'Silver',
        'Diamond',
        'Topaz',
        'Amethyst',
        'Zircon',
        'Venetian glass',
        'Porcelain',
        'Crystal',
      ];
      const allTypes = ['Plate', 'Teapot', 'Cup', 'Vase', 'Ring', 'Necklace', 'Earrings'];
      const genreFilter = ['Portrait', 'Landscape', 'Seascape', 'Still life', 'Abstraction'];
      const OriginFilters = ['Asia', 'Europe', 'America'];

      const materialFilter = this.createDropdownWithCheckboxes('Material', allMaterials);
      const typeFilter = this.createDropdownWithCheckboxes('Type', allTypes);
      const gerneFiltersType = this.createDropdownWithCheckboxes('Genre', genreFilter);
      const originTypes = this.createDropdownWithCheckboxes('Origin', OriginFilters);

      filtersContainer.appendChild(gerneFiltersType);
      filtersContainer.appendChild(originTypes);
      filtersContainer.appendChild(materialFilter);
      filtersContainer.appendChild(typeFilter);
    }

    this.leftsideSortBlock?.appendChild(filtersContainer);
  }

  // eslint-disable-next-line class-methods-use-this
  private createDropdownWithCheckboxes(label: string, options: string[]): HTMLDivElement {
    const filterContainer = document.createElement('div');
    const filterLabel = document.createElement('p');
    filterLabel.textContent = `${label}:`;
    filterContainer.classList.add(`${label}`);
    filterContainer.appendChild(filterLabel);

    options.forEach((optionText) => {
      const checkboxContainer = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.classList.add('checkbox');
      checkbox.type = 'checkbox';
      checkbox.value = optionText;
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(document.createTextNode(optionText));
      filterContainer.appendChild(checkboxContainer);
    });

    return filterContainer;
  }

  // eslint-disable-next-line class-methods-use-this
  private createSortDropdown(options: string[], container: HTMLDivElement) {
    this.sortDropdown.classList.add('sort__dropdown');

    options.forEach((optionText) => {
      const option = document.createElement('option');
      option.textContent = optionText;
      this.sortDropdown.appendChild(option);
    });

    container.appendChild(this.sortDropdown);
  }

  private createPriceAndNameSortDropdowns() {
    const SortOptions = ['Sort', 'Price ⇧', 'Price ⇩', 'Name ⇧', 'Name ⇩'];
    const sortBlock = document.createElement('div');
    sortBlock.classList.add('sort__block');
    this.createSortDropdown(SortOptions, sortBlock);

    this.rightsideSortBlock?.appendChild(sortBlock);
  }
}
