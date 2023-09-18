import ElementBuilder from '../../utils/elementBuilder';
import { Member } from '../../utils/interface';

const param = {
  popup: {
    tag: 'div',
    classNames: ['popup'],
  },
  wrapper: {
    tag: 'div',
    classNames: ['popup__wrapper'],
  },
  content: {
    tag: 'div',
    classNames: ['popup__content'],
  },
  name: {
    tag: 'h3',
    classNames: ['popup__name'],
  },
  country: {
    tag: 'h4',
    classNames: ['popup__country'],
  },
  bio: {
    tag: 'p',
    classNames: ['popup__bio'],
  },
};

export default class Popup {
  element: ElementBuilder;

  constructor(member: Member) {
    this.element = new ElementBuilder(param.popup);

    this.drawPopUp(member);
  }

  drawPopUp(member: Member) {
    const wrapper = new ElementBuilder(param.wrapper);
    const photo = new ElementBuilder({
      tag: 'div',
      classNames: ['popup__photo', `popup__photo-${member.id}`],
    });
    const content = new ElementBuilder(param.content);

    wrapper.addInnerElement([photo, content]);

    const name = new ElementBuilder(param.name);
    name.setTextContent(member.name);
    const country = new ElementBuilder(param.country);
    country.setTextContent(member.country);
    const bio = new ElementBuilder(param.bio);
    bio.setTextContent(member.bio);

    content.addInnerElement([name, country, bio]);

    this.element.addInnerElement([wrapper]);
  }

  open() {
    const popup = this.element.getElement();
    document.body.appendChild(popup);
    document.body.classList.add('noscroll');
    popup.addEventListener('click', this.handlePopupClick);
  }

  close() {
    const popup = this.element.getElement();
    document.body.removeChild(this.element.getElement());
    document.body.classList.remove('noscroll');
    popup.removeEventListener('click', this.handlePopupClick);
  }

  handlePopupClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('popup')) {
      this.close();
    }
  };
}
