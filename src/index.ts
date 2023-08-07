import './assets/scss/style.scss';
import img from './assets/img/pic.jpg';

const wrapper: HTMLDivElement = <HTMLDivElement>document.querySelector('.wrapper');

wrapper.innerHTML = `<img src=${img}>`;

// eslint-disable-next-line no-console
console.log('Hello!');
