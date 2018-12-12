const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find( dummyAuthorData, { id: parent.authorId })
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
                return _.filter(dummyBookData, { authorId: parent.id})
            }
        }
    })
})
const dummyBookData = [
    { name: "Harry Potter and soccer stone", genre: "Cartoon Fiction", id: "1", authorId: '1'},
    { name: "Harry Potter and the secret of chamber", genre: "Cartoon Fiction", id: "2", authorId: '1'},
    { name: "Shiva Trilogy", genre: "Fiction", id: "3", authorId: '2'},
    { name: "Alchemist", genre: "Helpbook", id: "4", authorId: '3'},
];
const dummyAuthorData = [
    { name: "J.K. Rowling", age: 45, id: "1"},
    { name: "Amish", age: 39, id: "2"},
    { name: "Paulo Coelho", age: 80, id: "3"},
];
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return _.find(dummyBookData, { id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id : { type: GraphQLID }},
            resolve(parent, args){
                return _.find(dummyAuthorData, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return dummyBookData;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return dummyAuthorData;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});