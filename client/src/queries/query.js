
import {gql} from 'apollo-boost';

export const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`;

export const getBooksQuery = gql`
    {
        books{
            name
            id
            url
        }
    }
`;

export const addBookQuery = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!, $url: String, $year: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId, url: $url, year: $year){
            name
            id
        }
    }
`;

export const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            name
            id
            genre
            url
            year
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;