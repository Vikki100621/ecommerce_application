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

export interface Addresses {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}
export interface Customer {
  id: string;
  version: number;
  createdAt: string;
  dateOfBirth: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: Addresses[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  lastMessageSequenceNumber: number;
  versionModifiedAt: string;
}
