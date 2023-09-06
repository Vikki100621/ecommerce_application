// eslint-disable-next-line import/no-extraneous-dependencies

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CustomerUpdateBody, Options } from './interfaces';

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

export async function getBoundToken(userEmail: string, userPassword: string): Promise<string> {
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
  return response.data.refresh_token;
}

export async function postCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();
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

export async function updateCustomer(id: string, actions: CustomerUpdateBody): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`, actions, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function loginCustomer(email: string, password: string): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();
  const refreshToken = (await getBoundToken(email, password)).toString();
  localStorage.setItem('refresh_token', refreshToken);
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

export async function getCategories(): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories`,
    method: 'get',
    params: {
      limit: 30,
      expand: 'parent',
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getProducts(): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

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
  const token = (await getRegularToken()).toString();

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

export async function getSortedProducts(data: string): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/?sort=name.en-us ${data}`,
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

export async function getSortedProductsByPrice(data: string, categoryId: string): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search`,
    method: 'get',
    params: {
      limit: 500,
      sort: `price ${data}`,
      filter: `categories.id: subtree("${categoryId}")`,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function Sort(): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search`,
    method: 'get',
    params: {
      limit: 50,
      filter: 'categories.id',
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getSortedProductsByAtributes(material: string): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

  const params = {
    filter: [`variants.attributes.genre:"${material}"`],
  };

  console.log('Параметры запроса:', params);

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search`,
    method: 'get',
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}
export async function searchProducts(options: Options): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

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
