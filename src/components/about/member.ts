import ElementBuilder from '../../utils/elementBuilder';
import { Member } from '../../utils/interface';
import View from '../../utils/view';

export default class MemberView extends View {
  photo: ElementBuilder;

  constructor(currMember: Member) {
    const parametrs = {
      tag: 'div',
      classNames: ['member__container'],
      id: `${currMember.id}`,
    };
    super(parametrs);

    this.photo = new ElementBuilder({
      tag: 'div',
      classNames: ['member__photo', `member__photo-${currMember.id}`],
    });
    this.configureView(currMember);
  }

  configureView(currMember: Member) {
    const name = new ElementBuilder({
      tag: 'a',
      classNames: ['member__name'],
      textContent: `${currMember.name}`,
      attributes: {
        href: `${currMember.github}`,
      },
    }).getElement();
    const role = new ElementBuilder({
      tag: 'h3',
      classNames: ['member__role'],
      textContent: `${currMember.role}`,
    }).getElement();
    this.viewElement.addInnerElement([this.photo, name, role]);
  }
}
