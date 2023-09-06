export interface CustomerUpdateAction {
  action: string;
  addressId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  address?: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  };
  // You can add more properties here if needed
}

export interface PasswordUpdateBody {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface CustomerUpdateBody {
  version: number;
  actions: CustomerUpdateAction[];
}
export interface CustomerUpdate {
  actions: CustomerUpdateAction[];
}
export interface CustomerResponse {
  customer: {
    id: string;
    version: number;
    addresses: CustomerAddress[];
    // Other properties as needed
  };
}

export interface CustomerAddress {
  id: string;
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface Price {
  value: {
    centAmount: number;
    currencyCode: string;
  };
  discounted?: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
}

export interface Product {
  id: string;
  name: {
    'en-US': string;
  };
  categories: Array<Category>;
  categoryId: string;
  masterVariant: {
    attributes: Array<{ name: string; value: string[] }>;
    images: Array<{ url: string }>;
    prices: Array<Price>;
    description: string;
  };
  searchKeywords: {
    'en-US': Array<{ text: string }>;
  };
}

export interface Category {
  id: string;
  name: {
    'en-US': string;
  };
}
