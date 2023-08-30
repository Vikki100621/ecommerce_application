import './assets/scss/style.scss';
import App from './components/app';
import BurgerMenu from './components/burger__menu';
import Controller from './components/controller';
import Routing from './components/routing';


const app = new App();

const routing = new Routing(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const controller = new Controller(routing);
const burger = new BurgerMenu();

routing.init();
burger.init();
