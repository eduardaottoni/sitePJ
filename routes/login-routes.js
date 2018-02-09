var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'eduardaottoni',
    password: '123456',
    database: 'data',
    port: '1207'
  });

connection.connect(function(error){
if(!error) {
    console.log("Connected to database.");
} else {
    console.log("An error occured while trying to reach the database");
}
});

exports.register = function(req,res){

    var users="('" + req.body.email +"', '" + req.body.password+"')";

    connection.query('INSERT INTO app_data.users VALUES '+ users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send('An error ocurred');
    }else{
      console.log('success', results);
      res.send('The user is registered');
    }
    });
  }

  exports.login = function(req,res){
    var email= "'" + req.body.email + "'";
    var password = req.body.password;
    connection.query('SELECT * FROM app_data.users WHERE email = ' + email, function (error, results, fields) {
    if (error) {
     console.log("error ocurred",error);
      res.send('An error ocurred');
    }else{
      console.log('success', results);
      if(results.length >0){
        if(results[0].password == password){
          res.send('Login successful');
        }
        else{
          res.send('Email and password dont match');
        }
      }
      else{
        res.send('Email does not exist');
      }
    }
    });
  }
