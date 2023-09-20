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
  id?: string;
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
  description: {
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

export type Options = {
  data?: string | undefined;
  value?: string | undefined;
  categoryId?: string | undefined;
  material?: string | undefined;
  type?: string | undefined;
  origin?: string | undefined;
  genre?: string | undefined;
  priceRange?:
    | {
        min: number;
        max: number;
      }
    | undefined;
};

export type CartType = {
  id: string;
};

export interface CartData {
  anonymousId?: string;
  customerId?: string;
  cartState: string;
  country: string;
  type: string;
  version: number;
  versionModifiedAt: string;
  lineItems: LineItem[];
  discountCodes: Array<{ discountCode: { id: string; typeId: string } }>;
}

export interface LineItemAction {
  action?: string;
  productId?: string;
  variantId?: number;
  sku?: string;
  quantity?: number;
  customerId?: string;
  activeCartSignInMode?: string;
}

interface DiscountedPrice {
  value: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
  };
  quantity: number;
}

export interface LineItem {
  discountedPricePerQuantity: {
    id: string;
    discountedPrice?: DiscountedPrice[];
  };
  id: string;
  discountedPrice?: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
  lastModifiedAt: string;
  lineItemMode: string;
  name: {
    'en-US': string;
  };
  variant: {
    images: { url: string }[];
  };
  state: [
    {
      quantity: number;
    },
  ];
  price: Price;
  priceMode: string;
  productId: string;
  productKey: string;
  productSlug: Record<string, string>;
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  quantity: number;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}
