interface IElemData {
  tag: string;
  classes?: string[];
  id?: string;
  attrib?: { name: string; value: string }[];
  textContent?: string;
}

export default function returnElement(elemData: IElemData): HTMLElement {
  const element = document.createElement(elemData.tag);
  if (elemData.classes !== undefined) {
    elemData.classes.forEach((item) => {
      element.classList.add(item);
    });
  }
  if (elemData.id) {
    element.id = elemData.id;
  }
  if (elemData.attrib?.length) {
    elemData.attrib.forEach((i) => {
      element.setAttribute(i.name, i.value);
    });
  }
  if (elemData.textContent) {
    element.textContent = elemData.textContent;
  }
  return element;
}
