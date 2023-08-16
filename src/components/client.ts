import {
  // ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import ctpClient from './api/BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'rs-school-ecommerce-application',
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools
// Composable Commerce API without any endpoints.
const getProject = () => apiRoot.get().execute();

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);
