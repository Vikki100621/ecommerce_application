import './assets/scss/style.scss';
import App from './components/app';
import Routing from './components/routing';

const app = new App('en');

const routing = new Routing(app);

routing.init();
