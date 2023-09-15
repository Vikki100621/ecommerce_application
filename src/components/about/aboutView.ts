import ElementBuilder from '../../utils/elementBuilder';
import { Member } from '../../utils/interface';
import View from '../../utils/view';
import MemberView from './member';

const param = {
  header: {
    tag: 'div',
    classNames: ['about__header'],
  },
  title: {
    tag: 'h3',
    classNames: ['about__title'],
    textContent: 'About us',
  },
  aboutInfo: {
    tag: 'p',
    classNames: ['about__info'],
    textContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim tortor in hac id imperdiet adipiscing. Pellentesque nisi, mi sit non sit sed fermentum. Felis adipiscing morbi sodales ac. Mauris dictumst risus pulvinar blandit elit. Vestibulum quam ultrices nascetur et viverra suscipit. Proin vitae aliquet leo aliquam amet rutrum. Lectus auctor purus ultrices enim ultrices. Augue fringilla tellus tortor orci ultrices sed. Viverra cras sapien, pellentesque viverra malesuada. Tellus dolor, eget vitae dignissim molestie eget sit duis. Vitae dui vel pretium euismod diam. Pellentesque amet, lacus, amet, quis risus. Pellentesque scelerisque nunc, orci aliquam quis.',
  },
  membersInfo: {
    tag: 'div',
    classNames: ['about__members'],
  },
};

export default class AboutView extends View {
  members: HTMLElement;

  constructor(team: Member[]) {
    const parametrs = {
      tag: 'div',
      classNames: ['about__section'],
    };
    super(parametrs);

    this.configureView();
    this.members = new ElementBuilder(param.membersInfo).getElement();
    this.drawMembers(team);
    this.viewElement.addInnerElement([this.members]);
  }

  configureView() {
    const header = new ElementBuilder(param.header).getElement();
    const title = new ElementBuilder(param.title).getElement();
    const aboutInfo = new ElementBuilder(param.aboutInfo).getElement();
    header.append(title, aboutInfo);

    this.viewElement.addInnerElement([header]);
  }

  drawMembers(team: Member[]) {
    team.forEach((member) => {
      const currMember = new MemberView(member).getHtmlElement();
      this.members.append(currMember);
    });
  }
}
