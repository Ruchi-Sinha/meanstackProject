var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();
//Set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllersss
todoController(app);

var port = 3000;
//listening to port
app.listen(port, function(){
  console.log('Listening to port'+port);
});
