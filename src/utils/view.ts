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
    this.viewElement = new ElementBuilder(parametrs);

    return this.viewElement;
  }
}
