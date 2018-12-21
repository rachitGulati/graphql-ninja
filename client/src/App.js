import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import BookList from './components/BookList';
// import AddBook from './components/AddBook';

// Apollo Client SetUp
const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <h1>Readings so far 😊</h1>
        <BookList />
        {/* <AddBook /> */}
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
