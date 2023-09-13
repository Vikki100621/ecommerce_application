// eslint-disable-next-line import/no-extraneous-dependencies

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { CustomerUpdateBody, PasswordUpdateBody, Options, LineItemAction } from './interfaces';

const CTP_PROJECT_KEY = 'rs-school-ecommerce-application';
const CTP_CLIENT_SECRET = 'xnIExDv_L553zLUH71kjVzANZ_7bfwyn';
const CTP_CLIENT_ID = 'n6NhHNp-SoFneLzkbs6qXWuu';
const CTP_AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CTP_API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const CTP_SCOPES = 'manage_project:rs-school-ecommerce-application';

export async function getRegularToken(): Promise<string> {
  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/token`,
    method: 'post',
    params: {
      grant_type: 'client_credentials',
      scope: CTP_SCOPES,
    },

    auth: {
      username: CTP_CLIENT_ID,
      password: CTP_CLIENT_SECRET,
    },
  };

  const response = await axios(config);
  return response.data.access_token;
}

export async function getAnonymusToken(): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token`,
    method: 'post',
    params: {
      grant_type: 'client_credentials',
      scope: CTP_SCOPES,
    },

    auth: {
      username: CTP_CLIENT_ID,
      password: CTP_CLIENT_SECRET,
    },
  };

  const response = await axios(config);
  return response.data.access_token;
}

export async function getBoundToken(userEmail: string, userPassword: string): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token`,
    method: 'post',
    data: `grant_type=password&username=${userEmail}&password=${userPassword}&scope=${CTP_SCOPES}`,
    auth: {
      username: CTP_CLIENT_ID,
      password: CTP_CLIENT_SECRET,
    },
  };

  const response = await axios(config);

  return response;
}

export async function postCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse> {
  let token;

  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  const response = await axios.post(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/signup`,
    { firstName, lastName, email, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function getCart(): Promise<AxiosResponse> {
  let token;
  console.log(token);
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`,
    method: 'post',
    data: {
      currency: 'USD',
      country: 'US',
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function updateCustomer(id: string, actions: CustomerUpdateBody): Promise<AxiosResponse> {
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`, actions, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function loginCustomer(email: string, password: string): Promise<AxiosResponse> {
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  console.log(token);
  const response = await axios.post(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`,
    { email, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function getProducts(): Promise<AxiosResponse> {
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  console.log(token);
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections`,
    method: 'get',
    params: {
      limit: 500,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getProduct(id: string): Promise<AxiosResponse> {
  // const token = (await getRegularToken()).toString();
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  console.log(token);
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/${id}`,
    method: 'get',
    params: {
      limit: 500,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getCategories(): Promise<AxiosResponse> {
  // const token = (await getRegularToken()).toString();
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  console.log(token);
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories`,
    method: 'get',
    params: {
      limit: 30,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getCustomer(id: string): Promise<AxiosResponse> {
  // const token = (await getRegularToken()).toString();
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  const response = await axios.get(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function updatePassword(body: PasswordUpdateBody): Promise<AxiosResponse> {
  // const token = (await getRegularToken()).toString();
  const token = localStorage.getItem('token');
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/password`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function searchProducts(options: Options): Promise<AxiosResponse> {
  // const token = (await getRegularToken()).toString();
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  const { data, value, categoryId, material, type, genre, priceRange, origin } = options;
  const filters = [];

  if (categoryId) {
    filters.push(`categories.id: subtree("${categoryId}")`);
  }
  if (material) {
    filters.push(`variants.attributes.material:"${material}"`);
  }

  if (type) {
    filters.push(`variants.attributes.type:"${type}"`);
  }

  if (origin) {
    filters.push(`variants.attributes.origin:"${origin}"`);
  }

  if (genre) {
    filters.push(`variants.attributes.genre:"${genre}"`); // Один фильтр для жанра
  }

  if (priceRange) {
    filters.push(`variants.price.centAmount:range (${priceRange.min * 100} to ${priceRange.max * 100})`);
  }
  const params: Record<string, string | number | string[]> = {
    limit: 500,
    filter: filters,
  };

  if (data && value) {
    params.sort = `${data} ${value}`;
  }
  console.log(params);
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search`,
    method: 'get',
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  console.log(response);
  return response;
}

const cartID = localStorage.getItem('cartId');
const versionnumber = Number(localStorage.getItem('cartVersion'));

export async function getCartbyId(actions: LineItemAction): Promise<AxiosResponse> {
  let token;
  if (!localStorage.getItem('token')) {
    token = (await getAnonymusToken()).toString();
    localStorage.setItem('token', token);
  } else {
    token = localStorage.getItem('token');
  }
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartID}`,
    method: 'post',

    data: {
      version: versionnumber,
      actions: [actions],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}
