import App from './app';

export default class Routing {
  private app: App;

  private routes: { path: string; template: string }[];

  constructor(app: App) {
    this.app = app;

    this.routes = [
      { path: '/', template: 'home' },
      { path: '/catalog', template: 'catalog' },
      { path: '/delivery', template: 'delivery' },
      { path: '/about', template: 'about' },
      { path: '/contacts', template: 'contacts' },
      { path: '/login', template: 'login' },
      { path: '/register', template: 'register' },
    ];
  }

  // клики на менюшку
  addMenuClickHandlers() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener('click', (event) => this.handleMenuItemClick(index, event));
    });
  }

  // роутинг(для register/login так как они в одном родителе)
  handleMenuItemClick(index: number, event: Event) {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.classList.contains('register')) {
      window.location.hash = '/register';
    } else if (clickedElement.classList.contains('login')) {
      window.location.hash = '/login';
    } else {
      const selectedRoute = this.routes[index].path;
      window.location.hash = selectedRoute;
    }
  }

  // отрисовываем шаблон
  registerTemplates() {
    this.routes.forEach(({ template, path }) => {
      this.app.registerTemplate(template, this.getTemplateFunctionForPath(path));
    });
  }

  // разные варианты отрисовки шаблона
  getTemplateFunctionForPath(path: string) {
    switch (path) {
      case '/':
        return () => this.app.showHomePage();
      case '/catalog':
        return () => this.app.showCatalogPage();
      case '/delivery':
        return () => this.app.showDeliveryPage();
      case '/about':
        return () => this.app.showAboutPage();
      case '/contacts':
        return () => this.app.showContactsPage();
      case '/login':
        if (localStorage.getItem('isLoggedIn') === 'true') {
          window.location.hash = '/';
          return () => this.app.showHomePage();
        }
          return () => this.app.showSignInPage();
        ;
      case '/register':
        return () => this.app.showRegisterPage();
      default:
        return () => this.app.showHomePage();
    }
  }

  init() {
    this.registerTemplates();
    this.addMenuClickHandlers();

    window.addEventListener('load', () => this.router());
    window.addEventListener('hashchange', () => this.router());
  }

  // ловим ошибку если путь неверный
  router() {
    const url = window.location.hash.slice(1) || '/';
    const route = this.resolveRoute(url);
    route();
  }

  resolveRoute(route: string) {
    try {
      const template = this.routes.find((r) => r.path === route)?.template as string;
      return this.app.getTemplateFunction(template);
    } catch (error) {
      this.app.show404Page();
      throw new Error(`Route ${route} not found`);
    }
  }
}
