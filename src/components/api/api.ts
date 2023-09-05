import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CustomerUpdateBody } from './interfaces';

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

export async function getCategories(): Promise<AxiosResponse> {
  const token = (await getRegularToken()).toString();

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
