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

export async function getRegularToken(): Promise<string> {
  const config: AxiosRequestConfig = {
    url: `${CTP_AUTH_URL}/oauth/token`,
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
  return response.data.access_token;
}

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

export async function postCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }
  const response = await axios.post(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/signup`,
    { firstName, lastName, email, password },
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  return response;
}

export async function updateCustomer(id: string, actions: CustomerUpdateBody): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`, actions, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
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

export async function loginCustomer(email: string, password: string): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }

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
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function loginNewCustomer(email: string, password: string): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }

  const requestData: LoginRequestData = {
    email,
    password,
    activeCartSignInMode: 'UseAsNewActiveCustomerCart',
  };

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`,
    method: 'post',
    data: requestData,
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getProducts(): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections`,
    method: 'get',
    params: {
      limit: 500,
    },
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getProduct(id: string): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }

  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/${id}`,
    method: 'get',
    params: {
      limit: 500,
    },
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getCategories(): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/categories`,
    method: 'get',
    params: {
      limit: 30,
    },
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getCustomer(id: string): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }

  const response = await axios.get(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}}`,
    },
  });
  return response;
}

export async function updatePassword(body: PasswordUpdateBody): Promise<AxiosResponse> {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/password`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function searchProducts(options: Options): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
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
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search`,
    method: 'get',
    params,
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
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
  const token = localStorage.getItem('token');
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
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`,
    method: 'post',
    data: {
      currency: 'USD',
      country: 'US',
    },
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
}

export async function getUserCart(): Promise<AxiosResponse> {
  let tokens = {
    accessToken: localStorage.getItem('token')!,
    refreshToken: localStorage.getItem('refreshtoken')!,
  };

  if (!tokens.accessToken) {
    const tokenResponse = await getAnonymusToken();
    tokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
    };
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshtoken', tokens.refreshToken);
  }
  const config: AxiosRequestConfig = {
    url: `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/active-cart`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  };
  const response = await axios(config);
  return response;
}

export async function deleteCartbyId(cartID: string, versionnumber: number): Promise<AxiosResponse> {
  const token = localStorage.getItem('token');

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
