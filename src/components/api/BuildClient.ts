// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = 'rs-school-ecommerce-application';
const scopes = [
  'manage_my_quote_requests:rs-school-ecommerce-application manage_my_orders:rs-school-ecommerce-application manage_my_profile:rs-school-ecommerce-application manage_my_shopping_lists:rs-school-ecommerce-application create_anonymous_token:rs-school-ecommerce-application view_categories:rs-school-ecommerce-application manage_my_payments:rs-school-ecommerce-application view_published_products:rs-school-ecommerce-application',
];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'PdesxBia-bIS_y4Hotpx4EJ3',
    clientSecret: 'qD0R_DhGpTziqQclaauZO209fk-ml3zP',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export default ctpClient;
