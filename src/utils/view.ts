import ElementBuilder from './elementBuilder';
import { ViewParametrs } from './interface';

export default class View {
  viewElementCreator: ElementBuilder;

  constructor(parametrs: ViewParametrs) {
    this.viewElementCreator = this.createView(parametrs);
  }

  getHtmlElement() {
    return this.viewElementCreator.getElement();
  }

  createView(parametrs: ViewParametrs) {
    const elementParams = {
      tag: parametrs.tag,
      classNames: parametrs.classNames,
    };
    this.viewElementCreator = new ElementBuilder(elementParams);

    return this.viewElementCreator;
  }
}
