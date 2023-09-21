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
    tag: 'div',
    classNames: ['about__info'],
  },
  aboutInfo1: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent:
      'The journey of creating a successful product is often filled with challenges and obstacles. However, we proved that with effective collaboration and determination, anything is possible. The team consisted of a diverse group of individuals, each bringing their unique skill sets and expertise to the table.',
  },
  aboutInfo2: {
    tag: 'h3',
    classNames: ['about__subtitle'],
    textContent: 'Project Management:',
  },
  aboutInfo3: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent:
      'To effectively organize and distribute tasks, we utilized the "GitHub Projects" tool. This allowed us to create task boards, set priorities, track progress, and collaborate seamlessly within the team. Thanks to GitHub Projects, we were able to manage our projects in a more systematic and transparent manner, significantly enhancing our productivity and coordination.',
  },

  aboutInfo4: {
    tag: 'h3',
    classNames: ['about__subtitle'],
    textContent: 'Development Stack:',
  },
  aboutInfo5: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent: 'Webpack',
  },
  aboutInfo6: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent: 'TypeScript',
  },
  aboutInfo7: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent: 'Ecommerce Tool',
  },
  aboutInfo8: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent: 'Axios',
  },
  aboutInfo9: {
    tag: 'h3',
    classNames: ['about__subtitle'],
    textContent: 'Communication and Collaboration:',
  },
  aboutInfo10: {
    tag: 'h3',
    classNames: ['about__infoPart'],
    textContent:
      'To facilitate effective communication, we relied on Telegram, where daily meetings and information exchange took place.',
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

    this.members = new ElementBuilder(param.membersInfo).getElement();
    this.configureView();
    this.drawMembers(membersInfo);
  }

  configureView() {
    const header = new ElementBuilder(param.header).getElement();
    const titleWrapper = new ElementBuilder(param.titleWrapper).getElement();
    const title = new ElementBuilder(param.title).getElement();
    const schoolLink = new ElementBuilder(param.schoolLink).getElement();
    const schoolImg = new ElementBuilder(param.schoolImg).getElement();

    schoolLink.append(schoolImg);
    titleWrapper.append(title);

    const aboutInfo = new ElementBuilder(param.aboutInfo).getElement();
    const part1 = new ElementBuilder(param.aboutInfo1).getElement();
    const part2 = new ElementBuilder(param.aboutInfo2).getElement();
    const part3 = new ElementBuilder(param.aboutInfo3).getElement();
    const part4 = new ElementBuilder(param.aboutInfo4).getElement();
    const part5 = new ElementBuilder(param.aboutInfo5).getElement();
    const part6 = new ElementBuilder(param.aboutInfo6).getElement();
    const part7 = new ElementBuilder(param.aboutInfo7).getElement();
    const part8 = new ElementBuilder(param.aboutInfo8).getElement();
    const part9 = new ElementBuilder(param.aboutInfo9).getElement();
    const part10 = new ElementBuilder(param.aboutInfo10).getElement();
    aboutInfo.append(part1, part2, part3, part4, part5, part6, part7, part8, part9, part10);
    header.append(titleWrapper, aboutInfo);

    this.viewElement.addInnerElement([header, this.members, schoolLink]);
  }

  drawMembers(membersInfo: Member[]) {
    membersInfo.forEach((member) => {
      const currMember = new MemberView(member);
      currMember.photo.getElement().addEventListener('click', () => {
        const popup = new Popup(member);
        popup.open();
      });
      this.members.append(currMember.getHtmlElement());
    });
  }
}
