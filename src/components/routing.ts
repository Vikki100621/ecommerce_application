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
      this.navigateTo('/register');
    } else if (clickedElement.classList.contains('login')) {
      this.navigateTo('/login');
    } else {
      const selectedRoute = this.routes[index].path;
      this.navigateTo(selectedRoute);
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
        return () => this.app.showSignInPage();
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

    // Используйте popstate вместо hashchange
    window.addEventListener('popstate', () => this.router());
  }

  // ловим ошибку если путь неверный
  router() {
    const url = window.location.pathname || '/';
    const route = this.resolveRoute(url);
    route();
  }

  // функция для изменения URL без перезагрузки
  navigateTo(route: string) {
    const fullPath = route;
    window.history.pushState({}, '', fullPath);
    this.router(); // вызываем router() для обновления контента
  }

  resolveRoute(route: string) {
    try {
      const template = this.routes.find((r) => r.path === route)?.template as string;
      return this.app.getTemplateFunction(template);
    } catch (error) {
      throw new Error(`Route ${route} not found`);
    }
  }
}
