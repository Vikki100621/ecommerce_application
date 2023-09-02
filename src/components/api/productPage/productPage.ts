export default class ProductPage {
  main: HTMLElement;

  id: string;

  constructor(id: string) {
    this.id = id;
    this.main = <HTMLElement>document.getElementById(`${id}`);
  }

  // draw() {

  // }
}
