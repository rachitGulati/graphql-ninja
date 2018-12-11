const schema = require('./schema/schema');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const PORT = 4000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log('Server is listing at ' + PORT);
})