import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import { Query } from 'react-apollo';

const getBooksQuery = gql`
    {
        books{
            name
            id
            author{
                name
            }

        }
    }
`;
class BookList extends Component {
  render() {
    return (
      <div className="main">
      <Query query={getBooksQuery}>
        {
            ({ loading, error, data}) => {
                if(loading) { return <div> Loading... </div>}
                return(
                <ul id="book-list"> 
                    { data.books.map( book => {
                        return <li key={book.id}> {book.name} ({book.author.name})</li>
                    })
                    }
                </ul>
                );
            }
        }
      </Query>
      </div>       
    );
  }
}

export default BookList;
