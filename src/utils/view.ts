import ElementBuilder from './elementBuilder';
import { ViewParametrs } from './interface';

export default class View {
  viewElement: ElementBuilder;

  constructor(parametrs: ViewParametrs) {
    this.viewElement = this.createView(parametrs);
  }

  getHtmlElement() {
    return this.viewElement.getElement();
  }

  createView(parametrs: ViewParametrs) {
    const elementParams = {
      tag: parametrs.tag,
      classNames: parametrs.classNames,
    };
    this.viewElement = new ElementBuilder(elementParams);

    return this.viewElement;
  }
}
