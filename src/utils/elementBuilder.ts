import { CallBackType, ParametrsWithAttributes, TagsAttributes } from './interface';

export default class ElementBuilder {
  element: HTMLElement;

  constructor(parametrs: ParametrsWithAttributes) {
    this.element = document.createElement(parametrs.tag);
    this.addAttributes(parametrs);
  }

  getElement() {
    return this.element;
  }

  addInnerElement(elementArray: Array<HTMLElement | ElementBuilder>) {
    elementArray.forEach((element) => {
      if (element instanceof ElementBuilder) {
        this.element.append(element.getElement());
      } else {
        this.element.append(element);
      }
    });
  }

  addAttributes(parametrs: ParametrsWithAttributes) {
    if (parametrs.classNames !== undefined) {
      this.setCssClasses(parametrs.classNames);
    }
    if (parametrs.textContent !== undefined) {
      this.setTextContent(parametrs.textContent);
    }
    if (parametrs.callback !== undefined && parametrs.event !== undefined) {
      this.setCallback(parametrs.event, parametrs.callback);
    }
    if (parametrs.attributes !== undefined) {
      this.setAttributes(parametrs.attributes);
    }
  }

  setCssClasses(arrayOfClasses: string[]) {
    this.element.classList.add(...arrayOfClasses);
  }

  setTextContent(text: string) {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = text;
    } else {
      this.element.textContent = text;
    }
  }

  setCallback(event: string, callback: CallBackType) {
    this.element.addEventListener(event, callback);
  }

  setAttributes(attributes: TagsAttributes) {
    Object.keys(attributes).forEach((key) => {
      this.element.setAttribute(key, attributes[key]);
    });
  }
}
