
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
                                <h2 className="book__title">{ book.name} </h2>
                                {book.url && <div className="book__thumb"><img src={book.url} alt="Book"/> </div>}
                                <div className="book__details">
                                    <p>Genre: <span className="book__info">{book.genre}</span></p>
                                    {book.year && <p>Read in <span className="book__info">{book.year}</span></p>}
                                    <p> Author: <span className="book__info">{book.author.name}</span></p>
                                    <p> All books I have read by this author</p>
                                    <ul className="other-books">
                                        { book.author.books.map( eachBook => {
                                            return <li key={eachBook.id}> { eachBook.name }</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                    );
            }}
        </Query>
        </div>
        )
}

export default BookDetails;