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
        url: { type: GraphQLString},
        year: { type: GraphQLID},
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
                url: { type: GraphQLString },
                year: { type: GraphQLID },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                const { name, genre, authorId, year, url} = args;
                const book = new Book({
                    name,
                    genre,
                    url,
                    year,
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