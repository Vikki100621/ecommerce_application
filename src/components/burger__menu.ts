export default class BurgerMenu {
  private menu: HTMLElement | null;

  private menuIcon: HTMLElement | null;

  private overlay: HTMLElement | null;

  public body: HTMLBodyElement | null;

  private menuItems: NodeListOf<Element> | null;

  constructor() {
    this.body = document.querySelector('body');
    this.menuIcon = document.querySelector('.burger__menu-icon');
    this.overlay = document.querySelector('.burger__menu-overlay');
    this.menu = document.querySelector('.menu');
    this.menuItems = document.querySelectorAll('.menu-item');
  }

  public init(): void {
    if (this.menuIcon) {
      this.menuIcon.addEventListener('click', () => {
        this.toggleMenu();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.hideMenu();
      });
    }

    if (this.menuItems) {
      this.menuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
          this.hideMenu();
        });
      });
    }
  }

  private toggleMenu(): void {
    document.body.classList.toggle('_lock');
    this.menuIcon?.classList.toggle('_show');
    this.menu?.classList.toggle('_show');
    this.overlay?.classList.toggle('_show');
  }

  private hideMenu(): void {
    this.overlay?.classList.remove('_show');
    this.menu?.classList.remove('_show');
    this.menuIcon?.classList.remove('_show');
    document.body.classList.remove('_lock');
  }
}
