const app = require('./express/server');
const PORT = 4000;

app.listen(PORT, ()=>{
    console.log('Server is listing at ' + PORT);
})