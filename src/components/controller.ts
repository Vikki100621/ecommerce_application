import Routing from './routing';

export default class Controller {
  private routing: Routing;

  constructor(routing: Routing) {
    this.routing = routing;
    this.addCategoryClickHandlers();
    this.addMenuClickHandlers();
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
}
