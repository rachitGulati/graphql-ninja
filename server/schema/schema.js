const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        age: { type: GraphQLInt},
        id: { type: GraphQLID},
        name: { type: GraphQLString}
    })
})
const dummyBookData = [
    { name: "Harry Potter", genre: "Cartoon Fiction", id: "1"},
    { name: "Shiva Trilogy", genre: "Fiction", id: "2"},
    { name: "Alchemist", genre: "Helpbook", id: "3"},
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});