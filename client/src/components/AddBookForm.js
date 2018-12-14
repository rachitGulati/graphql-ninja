import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { addBookQuery } from '../queries/query';

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
const submitBook = ({name, genre, authorId}, addBook) => {
console.log(name, genre, authorId);
addBook( { variables: { name, genre, authorId}});
}
const AddBookForm = (props) => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    return (
        <Mutation mutation={addBookQuery}>
        {(addBook, { data }) => (
            <form id="add-book" onSubmit={ (event) => {
                event.preventDefault();
                submitBook({name, genre, authorId}, addBook);
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
                    <label> Author: </label>
                    <select onChange={ (e) => { setAuthorId(e.target.value)}}>
                        <option> Select Author</option>
                        { displayAuthors(props) }
                    </select>
                </div>
                <button> [+] </button>
            </form>
        )}
    </Mutation>
    );
}
export default AddBookForm;