import './assets/scss/style.scss';
import App from './components/app';
import BurgerMenu from './components/burger__menu';
import Routing from './components/routing';

const app = new App();

const routing = new Routing(app);
const burger = new BurgerMenu();
routing.init();
burger.init();
