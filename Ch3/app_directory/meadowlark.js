/**
 * Created by Daniel on 3/16/2016.
 */

var express = require('express');
var app = express();

//  set up handlebars view engine
//  this creates a VIEW ENGINE and configures Express to use it by default

var handlebars = require('express3-handlebars')
    .create({defaultLayout:'main'});            //  Default Layout:  'main'  main.handlebars is the SHELL PAGE for every page

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//  VIEW ENGINE End


//  Static Files and Views:  Add the static middleware

app.use(express.static(__dirname + '/public'));  // static middleware creates a route for each static file you want to deliver
                                                 //  simpley reference /img/logo.jpg  do not specify 'public' directory as it is invisible to client


    var fortunes = [
        "Mookors likes to eat and sleep",
        "Nibbs is a snapper",
        "Koost likes to grind",
        "Barn is a stiff legger"
    ];


//  SET PORT

app.set('port', process.env.PORT || 3000);      //  This allows us to override the port by setting an environment value before you start the server
console.log("process.env.PORT: " + process.env.PORT);

//  DECLARE ROUTES:

app.get('/', function(req, res){        //  app.get(1,2)  is the METHOD to add ROUTES   (get and post)
                                        //  1.  The path is what defines the ROUTE
                                        //  DO NOT have to worry about the case or the trailing slash, and does not consider the query string!!!
                                        //  2.  The anonymous function is INVOKED when the route is matched!

    //res.type('text/plain');             //  Returning plaintext with status code of 200 - express defaults to 200
    //res.send('Meadowlark Travel')

    res.render('home');


});

app.get('/about', function(req, res){
    //res.type('text/plain');
    //res.send('About Meadowlark Travel')

    //res.render('about');

    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];  //  index of random number
    res.render('about', {fortune: randomFortune});                              //  'fortune' is the expression in the {{ }}  placeholder

});


//  ROUTES End

// custom 404 page - 404 HANDLER
app.use(function(req, res){     //  app.use(1)  Method Express uses to add middleware - Catch all handler for anything that didn't get matched by a route
                                //  The order in which routes and middleware are added is significant
                                //  If we put the 404 handler above the routes, the home page and about page would stop working - instead get 404
                                //  Express can distinguish between the 404 and 500 handlers by the numbers of arguments their functions take
    //res.type('text/plain');
    //res.status(404);
    //res.send('XXX 404 - Not Found');

    res.status(404);
    res.render('404');


});

// custom 500 page - 500 HANDLER
app.use(function(err, req, res, next){
    console.error(err.stack);
    //res.type('text/plain');
    //res.status(500);
    //res.send('XXX 500 - Server Error');

    res.status(500);
    res.render('500');

});

app.listen(app.get('port'), function(){

    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');

});




