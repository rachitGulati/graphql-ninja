const schema = require('./schema/schema');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const PORT = 4000;
const app = express();

mongoose.connect("mongodb://root:root1234@ds131784.mlab.com:31784/graphql-ninja");
mongoose.connection.once('open', ()=>{
    console.log('connected to databse');
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log('Server is listing at ' + PORT);
})