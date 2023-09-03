export default class Sorting {
  public sortBlock: HTMLDivElement | undefined;

  public categoryDropdown: HTMLSelectElement | undefined;

  public leftsideSortBlock: HTMLDivElement | undefined;

  public rightsideSortBlock: HTMLDivElement | undefined;

  public nameSortDropdown: HTMLSelectElement | undefined;

  public priceSortDropdown: HTMLSelectElement | undefined;

  public selectedCategory: string;

  public searchInput: HTMLInputElement;

  constructor() {
    this.sortBlock = document.createElement('div');
    this.categoryDropdown = document.createElement('select');
    this.leftsideSortBlock = document.createElement('div');
    this.rightsideSortBlock = document.createElement('div');
    this.searchInput = document.createElement('input');
    this.selectedCategory = 'all products';
    this.setupSortBlock();
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
    this.createCategoryDropdown();
    this.createFilters(this.selectedCategory);
  }

  private createSearchInput() {

    this.searchInput.type = 'text';
    this.searchInput.placeholder = 'I search...';
    this.searchInput.classList.add('search__input');
    this.nameSortDropdown = document.createElement('select');
    this.leftsideSortBlock?.appendChild(this.searchInput);
  }

  private createCategoryDropdown() {
    const categories = ['all products', 'dishes', 'paintings', 'jewellery', 'coins'];
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      this.categoryDropdown?.appendChild(option);
    });

    if (this.categoryDropdown) this.leftsideSortBlock?.appendChild(this.categoryDropdown);
  }

  public createFilters(selectedCategory: string) {
    const existingFiltersContainer = document.querySelector('.filters__container');
    if (existingFiltersContainer) {
      existingFiltersContainer.remove();
    }
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters__container');
    if (selectedCategory === 'dishes') {
      const materialFilter = this.createDropdownWithCheckboxes('Material', [
        'Venetian glass',
        'Porcelain',
        'Crystal',
        'Silver',
      ]);
      const typeFilter = this.createDropdownWithCheckboxes('Type', [
        'Plate',
        'Teapot',
        'Bowl',
        'Vase',
        'Cup'
      ]);

      filtersContainer.appendChild(materialFilter);
      filtersContainer.appendChild(typeFilter);
    } else if (selectedCategory === 'paintings') {
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
    } else if (selectedCategory === 'jewellery') {
      const typeFilter = this.createDropdownWithCheckboxes('Type', [
        'Ring',
        'Necklace',
        'Earrings'
      ]);
      const materialFilter = this.createDropdownWithCheckboxes('Material', [
        'Yellow gold',
        'White gold',
        'Diamond',
        'Topaz',
        'Amethyst',
        'Zircon',
      ]);

      filtersContainer.appendChild(typeFilter);
      filtersContainer.appendChild(materialFilter);
    } else if (selectedCategory === 'coins') {
      const originFilter = this.createDropdownWithCheckboxes('Origin', ['Asia', 'Europe', 'America']);
      const materialFilter = this.createDropdownWithCheckboxes('Material', [
        'Yellow gold',
        'Silver',
      ]);
      filtersContainer.appendChild(originFilter);
      filtersContainer.appendChild(materialFilter);
    } else {

      const allMaterials = [
        'Venetian glass',
        'Porcelain',
        'Crystal',
        'Silver',
        'Yellow gold',
        'White gold',
        'Red gold',
        'Diamond',
        'Topaz',
        'Amethyst',
        'Zircon',
      ];
      const allTypes = [
        'Plate',
        'Teapot',
        'Bowl',
        'Vase',
        'Cup',
        'Cutlery',
        'Portrait',
        'Landscape',
        'Seascape',
        'Caricature',
        'Still life',
        'Abstraction',
        'Ring',
        'Necklace',
      ];
      const materialFilter = this.createDropdownWithCheckboxes('Material', allMaterials);
      const typeFilter = this.createDropdownWithCheckboxes('Type', allTypes);
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
    filterContainer.appendChild(filterLabel);

    options.forEach((optionText) => {
      const checkboxContainer = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.classList.add('checkbox')
      checkbox.type = 'checkbox';
      checkbox.value = optionText;
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(document.createTextNode(optionText));
      filterContainer.appendChild(checkboxContainer);
    });

    return filterContainer;
  }

  // eslint-disable-next-line class-methods-use-this
  private createSortDropdown(options: string[], label: string, container: HTMLDivElement) {
    const sortLabel = document.createElement('label');
    sortLabel.textContent = label;
    sortLabel.classList.add('sort__label')

    const sortDropdown = document.createElement('select');
    sortDropdown.classList.add('sort__dropdown');

    options.forEach((optionText) => {
      const option = document.createElement('option');
      option.textContent = optionText;
      sortDropdown.appendChild(option);
    });

    sortLabel.appendChild(sortDropdown);
    container.appendChild(sortLabel);

    if (label === 'Price:') {
      this.priceSortDropdown = sortDropdown;
    } else if (label === 'Name:') {
      this.nameSortDropdown = sortDropdown;
    }
  }

  private createPriceAndNameSortDropdowns() {
    const priceSortOptions = ['Price: Low to High', 'Price: High to Low'];
    const nameSortOptions = ['Name: A to Z', 'Name: Z to A'];
    const sortBlock = document.createElement('div');
    sortBlock.classList.add('sort__block');
    this.createSortDropdown(priceSortOptions, 'Price:', sortBlock);
    this.createSortDropdown(nameSortOptions, 'Name:', sortBlock);
    this.rightsideSortBlock?.appendChild(sortBlock);
  }
}
