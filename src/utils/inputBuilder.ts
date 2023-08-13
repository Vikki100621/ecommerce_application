import ElementBuilder from './elementBuilder';
import { InputParametrs, TagsAttributes } from './interface';

// const InputClasses = {
//   CONTAINER: 'input__container',
// };

export default class InputFieldBuilder extends ElementBuilder {
  inputElement: HTMLInputElement;

  labelElement: HTMLLabelElement;

  constructor(parametrs: InputParametrs) {
    super(parametrs);
    this.inputElement = document.createElement('input');
    this.labelElement = document.createElement('label');
    this.addInputAndLabel(parametrs);
  }

  addAttributes(parametrs: InputParametrs) {
    if (parametrs.classNames !== undefined) {
      this.setCssClasses(parametrs.classNames);
    }
    if (parametrs.callback !== undefined && parametrs.event !== undefined) {
      this.setCallback(parametrs.event, parametrs.callback);
    }
  }

  addInputAndLabel(parametrs: InputParametrs) {
    if (parametrs.textContent !== undefined) {
      this.setTextContent(parametrs.textContent);
    }
    if (parametrs.attributes !== undefined) {
      this.setAttributes(parametrs.attributes);
    }

    this.element.append(this.labelElement, this.inputElement);
  }

  setValue(value: string) {
    this.inputElement.value = value;
  }

  setTextContent(text: string) {
    this.labelElement.textContent = text;
  }

  setAttributes(attributes: TagsAttributes) {
    Object.keys(attributes).forEach((key) => {
      this.inputElement.setAttribute(key, attributes[key]);
    });
  }
}
