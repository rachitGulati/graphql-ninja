import React, {useState} from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/query';
import BookDetails from './BookDetails';

const BookList = () => {
    const [currentBook, setCurrentBook] = useState(null);
    return (
      <div className="main">
      <Query query={getBooksQuery}>
        {
            ({ loading, error, data}) => {
                if(loading) { return <div> Loading... </div>}
                return(
                <>
                    <ul id="book-list"> 
                        { data.books.map( book => {
                            return <li 
                            key={book.id}
                            className={(currentBook === book.id ? 'active': '')}
                            onClick={ () => { setCurrentBook(book.id)}}
                            > 
                                {book.name}
                            </li>
                        })
                        }
                    </ul>
                    <BookDetails bookId={currentBook} />
                </>
                );
            }
        }
      </Query>
      </div>       
    );
};

export default BookList;
