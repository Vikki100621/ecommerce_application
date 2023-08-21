export type CallBackType = (e: Event) => void;

export type TagsClasses = string[];
export type TagsAttributes = Record<string, string>;

export interface ViewParametrs {
  tag: string;
  classNames?: string[];
}

export interface ElementParametrs extends ViewParametrs {
  textContent?: string;
  callback?: CallBackType;
  event?: string;
}

export interface ParametrsWithAttributes extends ElementParametrs {
  attributes?: TagsAttributes;
}
