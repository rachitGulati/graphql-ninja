import React from 'react';

const displayAuthors = (props) => {
    const { loading, data} = props;
    if(loading){
        return <option disabled> Loading Authors... </option>
    } else {
        return data.authors.map(author => {
            return <option key={author.id}> {author.name}</option>
        })
    }

}
const AddBookForm = (props) => {
    return (
    <form id="add-book">
        <div className="field">
            <label> BookName: </label>
            <input type="text"/>
        </div>
        <div className="field">
            <label> Genre: </label>
            <input type="text"/>
        </div>
        <div className="field">
            <label> Author: </label>
            <select>
                <option> Select Author</option>
                { displayAuthors(props) }
            </select>
        </div>
        <button>+ </button>
    </form>
    )
}
export default AddBookForm;