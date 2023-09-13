import './assets/scss/style.scss';
// import { getCart } from './components/api/api';
import Controller from './components/controller';

const controller = new Controller();
controller.init();

// await getCart().then(responce => console.log(responce))
