const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const app = express();

//Settings
app.set('port', config.port);

//Middlewares
app.use(morgan(':method :url :status - :response-time'));
app.use(express.json());

app.use(cors({
  origin:config.host
}));

//Routes
app.use('/api/items',require('./routes/items.routes'));

//start server
if(!module.parent){
  app.listen(app.get('port'),()=>{
    console.log("Run server on port  = ", app.get('port'));
  });
}

module.exports = app;