import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { addBookQuery, getBooksQuery } from '../queries/query';

const displayAuthors = (props) => {
    const { loading, data} = props;
    if(loading){
        return <option disabled> Loading Authors... </option>
    } else {
        return data.authors.map(author => {
            return <option key={author.id} value={author.id}> {author.name}</option>
        })
    }

}
const submitBook = ({name, genre, authorId, url, year}, addBook) => {
addBook(
    { variables: { name, genre, authorId, url, year},
    refetchQueries: [{ query: getBooksQuery}]
    });
}
const AddBookForm = (props) => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [url, setUrl] = useState('');
    const [year, setYear] = useState('');
    return (
        <Mutation mutation={addBookQuery}>
        {(addBook, { data }) => (
            <form id="add-book" onSubmit={ (event) => {
                event.preventDefault();
                submitBook({name, genre, authorId, url, year}, addBook);
                event.target.reset();
                }}>
                <div className="field">
                    <label> BookName: </label>
                    <input type="text" onChange={ (e) => { setName(e.target.value)}}/>
                </div>
                <div className="field">
                    <label> Genre: </label>
                    <input type="text" onChange={ (e) => { setGenre(e.target.value)}}/>
                </div>
                <div className="field">
                    <label> Image URL: </label>
                    <input type="text" onChange={ (e) => { setUrl(e.target.value)}}/>
                </div>
                <div className="field">
                    <label> Year: </label>
                    <input type="text" onChange={ (e) => { setYear(e.target.value)}}/>
                </div>
                <div className="field">
                    <label> Author: </label>
                    <select onChange={ (e) => { setAuthorId(e.target.value)}}>
                        <option> Select Author</option>
                        { displayAuthors(props) }
                    </select>
                </div>
                <button>+</button>
            </form>
        )}
    </Mutation>
    );
}
export default AddBookForm;