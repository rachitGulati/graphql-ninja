import React from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/query';

const BookList = () => {
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
};

export default BookList;
