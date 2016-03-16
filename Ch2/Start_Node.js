/**
 * Created by Daniel on 3/16/2016.
 */

var http = require('http');

//  EVENT-DRIVEN Programming
//  The event that is being handled here is HTTP request
//  http.createServer(1)  1.  Is an anonymous function that is INVOKED every time an HTTP request is made!!
//  In this example, set the content type to plain text and send the string " Hello...  "

var webServer = http.createServer(function(req,res){

    console.log("This method is INVOKED every time an HTTP reqeust is made!");

    res.writeHead(200, {'Content-Type': 'text/plain'});         //  This statement transmits "plain text"
    //res.writeHead(200, {'Content-Type': 'text/html'});          //  This statement transmits "html"

    res.end("Hello Mookors");                                   //  plain text
    //res.end("<h2> Hello Mookors </h2>");                        //  HTML  (Bad to write HTML inside JS

});

webServer.listen(3000);

console.log("Server started on localhost: 3000; press Ctrl-C to terminate....");