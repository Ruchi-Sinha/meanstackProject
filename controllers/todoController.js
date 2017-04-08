var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
//connect to database
//we are using cloud hosted mongodb mlab
mongoose.connect('mongodb://test:test@ds137730.mlab.com:37730/sampledbb')

//create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

//Middleware for body-parser
var urlencodedParser = bodyParser.urlencoded({extended : false});

//var data = [{'item' : 'get Milk'},{'item' : 'walk dog'},{'item' : 'complete coding'}]
module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongodb and pass it to the view
  Todo.find({}, function(err, data){
    if(err) throw err;
    res.render('todo', {todos : data});
  });
});

app.post('/todo', urlencodedParser, function(req, res){
//get data from view and add it to the mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', function(req, res){
  //delete the requested data from the mongodb databse
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

}
