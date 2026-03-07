import React from 'react';
// ReactDOM.render was removed in React 18+; use createRoot from the client entrypoint
import { createRoot } from 'react-dom/client';
import App from './App';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
