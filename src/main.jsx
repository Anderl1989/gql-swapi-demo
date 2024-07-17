import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';

import App from './pages/app/App.jsx';
import People from './pages/people/People.jsx';
import './index.css';
import { relayStylePagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPeople: relayStylePagination(),
        },
      },
    },
  }),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App />,
  },
  {
    path: '/people',
    element: <People />,
  },
  {
    path: '/planets',
    element: <p>Planets</p>,
  },
]);

const theme = {
  cssVar: true,
  token: {
    'colorPrimary': '#34bfc9',
    'colorInfo': '#34bfc9',
    'colorTextBase': '#00323c8a',
    'colorBgBase': '#ffffff',
    'borderRadius': 0,
    'wireframe': false,
    'colorLink': '#34bfc9',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
