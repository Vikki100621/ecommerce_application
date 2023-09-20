// eslint-disable-next-line import/no-extraneous-dependencies

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { CustomerUpdateBody, PasswordUpdateBody, Options, LineItemAction } from './interfaces';

const [CTP_PROJECT_KEY, CTP_CLIENT_SECRET, CTP_CLIENT_ID, CTP_AUTH_URL, CTP_API_URL, CTP_SCOPES] = [
  process.env.CTP_PROJECT_KEY,
  process.env.CTP_CLIENT_SECRET,
  process.env.CTP_CLIENT_ID,
  process.env.CTP_AUTH_URL,
  process.env.CTP_API_URL,
  process.env.CTP_SCOPES,
];

export async function getAnonymusToken(): Promise<{ accessToken: string; refreshToken: string }> {
  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token`,
    method: 'post',
    params: {
      grant_type: 'client_credentials',
      scope: CTP_SCOPES,
    },
    auth: {
      username: <string>CTP_CLIENT_ID,
      password: <string>CTP_CLIENT_SECRET,
    },
  };

  const response = await axios(config);
  const { access_token: accessToken, refresh_token: refreshToken } = response.data;
  return { accessToken, refreshToken };
}

export async function getBoundToken(userEmail: string, userPassword: string): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token`,
    method: 'post',
    data: `grant_type=password&username=${userEmail}&password=${userPassword}&scope=${CTP_SCOPES}`,
    auth: {
      username: <string>CTP_CLIENT_ID,
      password: <string>CTP_CLIENT_SECRET,
    },
  };

  const response = await axios(config);

  return response;
}

export async function getrefreshToken(refresh: string): Promise<AxiosResponse> {
  const data = new URLSearchParams();
  data.append('grant_type', 'refresh_token');
  data.append('refresh_token', refresh);

  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/token`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: <string>CTP_CLIENT_ID,
      password: <string>CTP_CLIENT_SECRET,
    },
  };

  const response = await axios(config);
  return response;
}

function getTokenToUse() {
  const token = localStorage.getItem('token');
  const newToken = localStorage.getItem('newtoken');
  return newToken || token;
}

let token = getTokenToUse();
// async function createToken() {
//   if (!token) {
//     const tokenResponse = await getAnonymusToken();
//     const { refreshToken } = tokenResponse;
//     const userToken = await getrefreshToken(refreshToken).then((refreshtoken) => refreshtoken);
//     token = userToken.data.access_token;
//     localStorage.setItem('token', userToken.data.access_token);
//   }
// }
// createToken();

export async function postCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse> {
  console.log('я создаю клиента', token)

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
  const newtoken = localStorage.getItem('newtoken')
  console.log('я делаю апдейт клиента', token)
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`, actions, {
    headers: {
      Authorization: `Bearer ${newtoken}`,
    },
  });
  return response;
}

interface LoginRequestData {
  email: string;
  password: string;
  anonymousCart?: {
    id: string;
    typeId: string;
  };
  activeCartSignInMode?: string;
  anonymousCartSignInMode?: string;
  anonymousId?: string;
}

export async function getProducts(): Promise<AxiosResponse> {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    token = localStorage.getItem('newtoken');
  }
  console.log('этот токен берем мы продукты', token);
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

export async function getProduct(id: string): Promise<AxiosResponse> {  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
if (isLoggedIn) {
  token = localStorage.getItem('newtoken');
}
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
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    token = localStorage.getItem('newtoken');
  }
  console.log('категории хотели взять', token);
  if (!token) {
    const tokenResponse = await getAnonymusToken();
    const { refreshToken } = tokenResponse;
    const userToken = await getrefreshToken(refreshToken).then((refreshtoken) => refreshtoken);
    console.log('Я засетовал токен');
    token = userToken.data.access_token as string;
    localStorage.setItem('token', token);
  }
  console.log('этот создала я категория', token);

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

export async function getCustomer(): Promise<AxiosResponse> {
  const newtoken = localStorage.getItem('newtoken')
  console.log('этот токен беру я профиль', newtoken);
  const response = await axios.get(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me`, {
    headers: {
      Authorization: `Bearer ${newtoken}`,
    },
  });
  return response;
}

export async function updatePassword(body: PasswordUpdateBody): Promise<AxiosResponse> {
  const newtoken = localStorage.getItem('newtoken')
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/password`, body, {
    headers: {
      Authorization: `Bearer ${newtoken}`,
    },
  });
  return response;
}

export async function searchProducts(options: Options): Promise<AxiosResponse> {
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
    filters.push(`variants.attributes.genre:"${genre}"`);
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
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    token = localStorage.getItem('newtoken');
  }
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

export async function getCartbyId(
  
  cartID: string,
  actions: LineItemAction,
  versionnumber: number
): Promise<AxiosResponse> {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    token = localStorage.getItem('newtoken');
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

export async function getCart(): Promise<AxiosResponse> {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    token = localStorage.getItem('newtoken');
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

export async function getUserCart(): Promise<AxiosResponse> {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    token = localStorage.getItem('newtoken');
  }
  console.log('этот токен беру я корзина', token);
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/active-cart`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response;
}

export async function deleteCartbyId(cartID: string, versionnumber: number): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartID}?version=${versionnumber}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function loginCustomer(email: string, password: string): Promise<AxiosResponse> {
  const responce = await getBoundToken(email, password);

  localStorage.removeItem('token');
  const refreshToken = responce.data.refresh_token;
  const userToken = await getrefreshToken(refreshToken).then((refreshtoken) => refreshtoken);
  console.log('я засетовал рефреш', userToken.data.access_token);
  localStorage.setItem('newtoken', userToken.data.access_token);

  const requestData: LoginRequestData = {
    email,
    password,
    activeCartSignInMode: 'MergeWithExistingCustomerCart',
  };

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`,
    method: 'post',
    data: requestData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function loginNewCustomer(email: string, password: string): Promise<AxiosResponse> {
  const newtoken = localStorage.getItem('newtoken')
  const requestData: LoginRequestData = {
    email,
    password,
    activeCartSignInMode: 'UseAsNewActiveCustomerCart',
  };

  // const cart = await getUserCart().then((cartdata) => cartdata);
  // if (cart.status === 404) {
  //   await getCart();
  // }

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`,
    method: 'post',
    data: requestData,
    headers: {
      Authorization: `Bearer ${newtoken}`,
    },
  };

  const response = await axios(config);
  return response;
}
