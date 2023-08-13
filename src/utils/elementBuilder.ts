import { CallBackType, ElementParametrs } from './interface';

export default class ElementBuilder {
  element: HTMLElement;

  constructor(parametrs: ElementParametrs) {
    this.element = document.createElement(parametrs.tag);
    this.addAttributes(parametrs);
  }

  getElement() {
    return this.element;
  }

  addInnerElement(element: HTMLElement) {
    this.element.append(element);
  }

  addAttributes(parametrs: ElementParametrs) {
    if (parametrs.classNames !== undefined) {
      this.setCssClasses(parametrs.classNames);
    }
    if (parametrs.textContent !== undefined) {
      this.setTextContent(parametrs.textContent);
    }
    if (parametrs.callback !== undefined && parametrs.event !== undefined) {
      this.setCallback(parametrs.event, parametrs.callback);
    }
  }

  setCssClasses(arrayOfClasses: string[]) {
    this.element.classList.add(...arrayOfClasses);
  }

  setTextContent(text: string) {
    this.element.textContent = text;
  }

  setCallback(event: string, callback: CallBackType) {
    this.element.addEventListener(event, (e) => callback(e));
  }
}
