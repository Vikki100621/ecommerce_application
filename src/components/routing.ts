import App from './app';
// import State from './state';

export default class Routing {
  private app: App;

  private routes: { path: string; template: string }[];

  private id: string | null;

  constructor(app: App) {
    this.app = app;

    this.id = this.getIdFromUrl();

    this.routes = [
      { path: '/', template: 'home' },
      { path: '/catalog', template: 'catalog' },
      { path: '/about', template: 'about' },
      { path: '/login', template: 'login' },
      { path: '/register', template: 'register' },
      { path: '/user', template: 'user' },
      { path: '/logout', template: 'log' },
      { path: `/catalog/${this.id}`, template: 'product' },
      { path: '/cart', template: 'cart' },
    ];
  }

  registerTemplates() {
    this.routes.forEach(({ template, path }) => {
      this.app.registerTemplate(template, this.getTemplateFunctionForPath(path));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getIdFromUrl() {
    const parts = window.location.hash.split('/');
    if (parts.length > 2 && parts[1] === 'catalog') {
      const thirdPart = parts[2];
      return thirdPart;
    }
    return null;
  }

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
      case '/user':
        return () => this.app.showUserPage();
      case `/catalog/${this.id}`:
        return () => this.app.showProductPage(this.id);
      case '/cart':
        return () => this.app.showCartPage();
      default:
        return () => this.app.showHomePage();
    }
  }

  private updateIdRoutes() {
    if (this.id !== null) {
      const productRouteIndex = this.routes.findIndex((route) => route.template === 'product');
      if (productRouteIndex !== -1) {
        this.routes[productRouteIndex].path = `/catalog/${this.id}`;
      }
    }
  }

  updateId(id: string | null): void {
    this.id = id;
    this.updateIdRoutes();
  }

  init() {
    this.registerTemplates();
    // this.addMenuClickHandlers();

    const handleNavigation = () => {
      if (
        localStorage.getItem('isLoggedIn') === 'true' &&
        (window.location.hash === '#/login' || window.location.hash === '#/register')
      ) {
        window.location.hash = '/';
      } else {
        this.router();
      }
    };

    window.addEventListener('load', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
  }

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

  handleMenuItemClick(index: number, event: Event) {
    const clickedElement = event.target as HTMLElement;
    const parentElement = clickedElement.parentNode as HTMLElement;

    if (clickedElement.classList.contains('register')) {
      if (clickedElement.textContent === 'LogOut') {
        localStorage.setItem('customerID', '');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('token');
        localStorage.removeItem('cartId');
        localStorage.removeItem('customerID');
        localStorage.removeItem('cartVersion');
        localStorage.removeItem('anonymousId');
        localStorage.removeItem('refreshtoken');
        window.location.hash = '/';
        const itemuser = document.querySelector('.item-client .login');
        const itemlogout = document.querySelector('.item-client .register');
        if (itemuser && itemlogout) {
          const elUser = itemuser as HTMLElement;
          elUser.textContent = 'Login';
          const elLogOut = itemlogout as HTMLElement;
          elLogOut.textContent = 'Register';
        }
      } else if (!(localStorage.getItem('isLoggedIn') === 'true') || !localStorage.getItem('isLoggedIn')) {
        window.location.hash = '/register';
      }
    } else if (clickedElement.classList.contains('login')) {
      if (!(localStorage.getItem('isLoggedIn') === 'true') || !localStorage.getItem('isLoggedIn')) {
        window.location.hash = '/login';
      } else {
        window.location.hash = '/user';
      }
    } else if (clickedElement.classList.contains('item-basket') || parentElement.classList.contains('item-basket')) {
      window.location.hash = '/cart';
    } else {
      const selectedRoute = this.routes[index].path;
      window.location.hash = selectedRoute;
    }
  }

  handleProductItemClick(event: Event) {
    const clickedElement = event.target as HTMLElement;

    const { parentElement } = clickedElement;
    if (parentElement && parentElement.hasAttribute('id')) {
      this.id = parentElement.getAttribute('id');
      this.updateId(parentElement.getAttribute('id'));
      const selectedRoute = this.routes[7].path;
      window.location.hash = selectedRoute;
    }
  }
}
