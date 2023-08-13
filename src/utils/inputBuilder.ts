import ElementBuilder from './elementBuilder';
import { ParametrsWithAttributes, TagsAttributes } from './interface';

export default class InputFieldBuilder extends ElementBuilder {
  inputElement: HTMLInputElement;

  labelElement: HTMLLabelElement;

  constructor(parametrs: ParametrsWithAttributes) {
    super(parametrs);
    this.inputElement = document.createElement('input');
    this.labelElement = document.createElement('label');
    this.addInputAndLabel(parametrs);
  }

  addAttributes(parametrs: ParametrsWithAttributes) {
    if (parametrs.classNames !== undefined) {
      this.setCssClasses(parametrs.classNames);
    }
    if (parametrs.callback !== undefined && parametrs.event !== undefined) {
      this.setCallback(parametrs.event, parametrs.callback);
    }
  }

  addInputAndLabel(parametrs: ParametrsWithAttributes) {
    if (parametrs.textContent !== undefined) {
      this.setTextContent(parametrs.textContent);
    }
    if (parametrs.attributes !== undefined) {
      this.setInputAttributes(parametrs.attributes);
    }
    if (parametrs.attributes?.name) {
      this.setLabelAttributes(parametrs.attributes.name);
    }

    this.element.append(this.labelElement, this.inputElement);
  }

  setValue(value: string) {
    this.inputElement.value = value;
  }

  setTextContent(text: string) {
    this.labelElement.textContent = text;
  }

  setInputAttributes(attributes: TagsAttributes) {
    Object.keys(attributes).forEach((key) => {
      this.inputElement.setAttribute(key, attributes[key]);
    });
  }

  setLabelAttributes(attribute: string) {
    this.labelElement.setAttribute('for', attribute);
  }
}
