import './assets/scss/style.scss';

import Controller from './components/controller';

const controller = new Controller();
controller.init();

const removeButtons = document.querySelectorAll('.remove__button');
removeButtons.forEach((removeButton) => {
  removeButton.addEventListener('click', () => {
    console.log('fgbgfb');

    //  if (removeButton) {
    // const quantity = removeButton.nextElementSibling as HTMLDivElement;
    // const parentID = removeButton.closest('div')?.id as string;
    // const number = parseInt(quantity.textContent || '0', 10);
    // this.cart.changeCartQunity(number, parentID);
    // this.app.showCartPage();
    //  }
  });
});
