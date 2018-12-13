const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;
const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        age: { type: GraphQLInt},
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authorId: parent.id })
            }
        }
    })
})
// const dummyBookData = [
//     { name: "Harry Potter and soccer stone", genre: "Cartoon Fiction", id: "1", authorId: '1'},
//     { name: "Harry Potter and the secret of chamber", genre: "Cartoon Fiction", id: "2", authorId: '1'},
//     { name: "Shiva Trilogy", genre: "Fiction", id: "3", authorId: '2'},
//     { name: "Alchemist", genre: "Helpbook", id: "4", authorId: '3'},
// ];
// const dummyAuthorData = [
//     { name: "J.K. Rowling", age: 45, id: "1"},
//     { name: "Amish", age: 39, id: "2"},
//     { name: "Paulo Coelho", age: 80, id: "3"},
// ];
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id : { type: GraphQLID }},
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor: {
            type:AuthorType,
            args: {
                age: { type: new GraphQLNonNull(GraphQLInt)},
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const { name, age} = args;
                let author = new Author({
                    name,
                    age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args : {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                const{ name, genre, authorId} = args;
                const book = new Book({
                    name,
                    genre,
                    authorId
                });
                return book.save();
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});