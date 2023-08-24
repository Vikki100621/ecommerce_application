interface IElemData {
  tag: string;
  classes?: string[];
  id?: string[];
  textContent?: string;
}

function returnElement(elemData: IElemData): HTMLElement {
  const element = document.createElement(elemData.tag);
  if (elemData.classes !== undefined) {
    elemData.classes.forEach((item) => {
      element.classList.add(item);
    });
  }
  if (elemData.textContent) {
    element.textContent = elemData.textContent;
  }
  return element;
}

function drawElement(parentElem: HTMLElement, childElem: HTMLElement) {
  parentElem.appendChild(childElem);
}

export default class View {
  main: HTMLElement;

  constructor() {
    this.main = <HTMLElement>document.getElementById('main');
  }

  drawRegistration() {
    const section = returnElement({ tag: 'section', classes: ['registration'] });
    drawElement(this.main, section);
    const sectionTitle = returnElement({ tag: 'h2', classes: ['registration__title'], textContent: 'Registration' });
    drawElement(section, sectionTitle);
    const registrForm = returnElement({ tag: 'form', classes: ['registration__form', 'reg-form'] });
    drawElement(section, registrForm);
    const fieldsetUser = returnElement({ tag: 'fieldset', classes: ['reg-form__user', 'fieldset'] });
    drawElement(registrForm, fieldsetUser);
    const legendUser = returnElement({ tag: 'legend', classes: ['fieldset__legend'], textContent: 'User' });
    drawElement(fieldsetUser, legendUser);
  }
}
