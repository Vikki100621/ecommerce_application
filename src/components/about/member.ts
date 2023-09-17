import ElementBuilder from '../../utils/elementBuilder';
import { Member } from '../../utils/interface';
import View from '../../utils/view';

export default class MemberView extends View {
  constructor(currMember: Member) {
    const parametrs = {
      tag: 'div',
      classNames: ['member__container'],
      id: `${currMember.id}`,
    };
    super(parametrs);
    this.configureView(currMember);
  }

  configureView(currMember: Member) {
    const photo = document.createElement('div');
    photo.className = 'member__photo';
    photo.classList.add(`member__photo-${currMember.id}`);
    const name = new ElementBuilder({
      tag: 'h3',
      classNames: ['member__name'],
      textContent: `${currMember.name}`,
    }).getElement();
    const country = new ElementBuilder({
      tag: 'h3',
      classNames: ['member__country'],
      textContent: `${currMember.country}`,
    }).getElement();
    this.viewElement.addInnerElement([photo, name, country]);
  }
}
