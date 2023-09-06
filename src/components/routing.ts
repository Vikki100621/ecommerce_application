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
      { path: '/user', template: 'user' },
      { path: '/logout', template: 'log' },
      { path: '/catalog/dishes', template: 'dishes' },
      { path: '/catalog/paintings', template: 'paintings' },
      { path: '/catalog/jewellery', template: 'jewellery' },
      { path: '/catalog/allproducts', template: 'jewellery' },
    ];
  }

  // // клики на менюшку
  // addMenuClickHandlers() {
  //   const menuItems = document.querySelectorAll('.menu-item');
  //   menuItems.forEach((menuItem, index) => {
  //     menuItem.addEventListener('click', (event) => this.handleMenuItemClick(index, event));
  //   });
  // }

  // роутинг(для register/login так как они в одном родителе)

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
      case '/user':
        return () => this.app.showUserPage();
      case '/catalog/dishes':
        return () => this.app.showProductPage();
      case '/catalog/paintings':
        return () => this.app.showProductPage();
      case '/catalog/jewellery':
        return () => this.app.showProductPage();
      case '/catalog/allproducts':
        return () => this.app.showProductPage();
      default:
        return () => this.app.showHomePage();
    }
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

    if (clickedElement.classList.contains('register')) {
      if (clickedElement.textContent === 'LogOut') {
        localStorage.setItem('isLoggedIn', 'false');
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
    } else {
      const selectedRoute = this.routes[index].path;
      window.location.hash = selectedRoute;
    }
  }

  handleCategoryItemClick(event: Event) {
    if (window.location.hash === '#/catalog') {
      const clickedElement = event.target as HTMLElement;

      if (clickedElement.classList.contains('category__dishes')) {
        const selectedRoute = this.routes[9].path;
        window.location.hash = selectedRoute;
      } else if (clickedElement.classList.contains('category__painting')) {
        const selectedRoute = this.routes[10].path;
        window.location.hash = selectedRoute;
      } else if (clickedElement.classList.contains('category__jewellery')) {
        const selectedRoute = this.routes[11].path;
        window.location.hash = selectedRoute;
      } else if (clickedElement.classList.contains('category__allproducts')) {
        const selectedRoute = this.routes[12].path;
        window.location.hash = selectedRoute;
      }
    }
  }
}
