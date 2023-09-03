import UserProfileView from '../user/userProfileView';
import View from '../utils/view';
import UserAddressesView from '../user/userAddressesView';

export default class UserView extends View {
  constructor() {
    const parametrs = {
      tag: 'div',
      classNames: ['user__section'],
    };
    super(parametrs);
    this.configureView();
  }

  configureView() {
  const user = new UserProfileView();
  const userHTML = user.getHtmlElement();
  const adresses = new UserAddressesView();
  const adressesHTML = adresses.getHtmlElement();
  

  this.viewElement.addInnerElement([userHTML, adressesHTML])
}

}