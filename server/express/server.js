const schema = require('../schema/schema');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

app.use(cors());
mongoose.connect(`mongodb://rachit:rachit1234@ds131784.mlab.com:31784/graphql-ninja`);
mongoose.connection.once('open', ()=>{
    console.log('connected to databse');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static(path.join(__dirname, '../client/build')));

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);