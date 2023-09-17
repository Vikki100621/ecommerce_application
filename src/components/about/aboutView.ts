import ElementBuilder from '../../utils/elementBuilder';
import { Member } from '../../utils/interface';
import View from '../../utils/view';
import MemberView from './member';
import Popup from './popUp';
import logo from '../../assets/img/logo-rs.png';

const param = {
  header: {
    tag: 'div',
    classNames: ['about__header'],
  },
  titleWrapper: {
    tag: 'div',
    classNames: ['about__titleWrapper'],
  },
  title: {
    tag: 'h3',
    classNames: ['about__title'],
    textContent: 'About us',
  },
  subtitle: {
    tag: 'h3',
    classNames: ['about__subtitle'],
    textContent: 'The team was formed as part of the training at the school:',
  },
  schoolLink: {
    tag: 'a',
    classNames: ['about__schoolLink'],
    attributes: {
      href: 'https://rs.school/index.html',
    },
  },
  schoolImg: {
    tag: 'img',
    classNames: ['about__schoolImg'],
    attributes: {
      src: logo,
    },
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

  constructor(membersInfo: Member[]) {
    const parametrs = {
      tag: 'div',
      classNames: ['about__section'],
    };
    super(parametrs);

    this.configureView();
    this.members = new ElementBuilder(param.membersInfo).getElement();
    this.drawMembers(membersInfo);
    this.viewElement.addInnerElement([this.members]);
  }

  configureView() {
    const header = new ElementBuilder(param.header).getElement();
    const titleWrapper = new ElementBuilder(param.titleWrapper).getElement();
    const title = new ElementBuilder(param.title).getElement();
    const subtitle = new ElementBuilder(param.subtitle).getElement();
    const schoolLink = new ElementBuilder(param.schoolLink).getElement();
    const schoolImg = new ElementBuilder(param.schoolImg).getElement();

    schoolLink.append(schoolImg);
    titleWrapper.append(title, subtitle, schoolLink);

    const aboutInfo = new ElementBuilder(param.aboutInfo).getElement();
    header.append(titleWrapper, aboutInfo);

    this.viewElement.addInnerElement([header]);
  }

  drawMembers(membersInfo: Member[]) {
    membersInfo.forEach((member) => {
      const currMember = new MemberView(member).getHtmlElement();
      currMember.addEventListener('click', () => {
        const popup = new Popup(member);
        popup.open();
      });
      this.members.append(currMember);
    });
  }
}
