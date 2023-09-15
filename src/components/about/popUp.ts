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
  photo: {
    tag: 'div',
    classNames: ['popup__photo'],
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
    const photo = new ElementBuilder(param.wrapper);
    const content = new ElementBuilder(param.content);

    const name = new ElementBuilder(param.name);
    name.setTextContent(member.name);
    const country = new ElementBuilder(param.country);
    country.setTextContent(member.country);
    const bio = new ElementBuilder(param.country);
    bio.setTextContent(member.bio);

    content.addInnerElement([name, country, bio]);
    wrapper.addInnerElement([photo, content]);

    this.element.addInnerElement([]);
  }
}
