
import React from 'react';
import { getBookQuery } from '../queries/query';
import { Query } from 'react-apollo';

const BookDetails = (props) => {
    if(!props.bookId){
        return <div id="book-details"> Select book from the left list to see details </div>
    }
    return(
        <div id="book-details">
             <Query query={getBookQuery} variables={{id: props.bookId}}>
                {({ loading, data, error}) => {
                    const { book } = data;
                    if(loading) return <div>Loading...</div>;
                    return (
                            <div>
                                <h2>{ book.name} </h2>
                                {book.url && <img src={book.url} alt="Book"/> }
                                <p>{book.genre}</p>
                                {book.year && <p>Read in {book.year}</p>}
                                <p> {book.author.name}</p>
                                <p> All books by this author</p>
                                <ul className="other-books">
                                    { book.author.books.map( eachBook => {
                                        return <li key={eachBook.id}> { eachBook.name }</li>
                                    })}
                                </ul>
                            </div>
                    );
            }}
        </Query>
        </div>
        )
}

export default BookDetails;