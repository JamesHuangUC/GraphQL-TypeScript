import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from './config/config';

import './App.css';

import CatWrapper from './components/Cat/CatWrapper';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: config.gqURI,
    }),
    cache: new InMemoryCache(),
  });
};

const CatListWrapperComponent = () => {
  return <CatWrapper />;
};

const App: React.FC = () => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={CatListWrapperComponent} />} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
