const schema = require('./schema/schema');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

app.use(cors());
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds131784.mlab.com:31784/graphql-ninja`);
mongoose.connection.once('open', ()=>{
    console.log('Connected to databse');
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log('Server is listing at ' + PORT);
})