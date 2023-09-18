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
      'The journey of creating a successful product is often filled with challenges and obstacles. However, the team behind the antique store website project proved that with effective collaboration and determination, anything is possible. The team consisted of a diverse group of individuals, each bringing their unique skill sets and expertise to the table. Led by a mentor  the team consisted of three talented developers who also contributed to coding.',
  },
  aboutInfo2: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent:
      'Their mission was clear - to create an antique store website that would not only be visually appealing but also user-friendly. The team worked tirelessly, utilizing the latest technologies and tools to bring their vision to life. They chose Axios for database queries, recognizing its efficiency and reliability. ',
  },
  aboutInfo3: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent:
      'Each team member played a crucial role in the success of the project. The mentor provided guidance and support, while the team leader ensured that everyone was on track and working towards the same goal. The developers brought their technical expertise to the project, writing clean and efficient code that made the website run smoothly.',
  },
  aboutInfo4: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent:
      "The result of their hard work was a stunning website that featured registration and login forms, a product catalog,  user page, and shopping cart. The website was a testament to the team's dedication and commitment to excellence. It showcased their ability to work together seamlessly and produce exceptional results.",
  },
  aboutInfo5: {
    tag: 'p',
    classNames: ['about__infoPart'],
    textContent:
      "In conclusion, the antique store website project was a true testament to the power of collaboration and determination. The team's success was a result of their collective efforts, with each member contributing their unique skills and expertise.",
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
    aboutInfo.append(part1, part2, part3, part4, part5);
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
