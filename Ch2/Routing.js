/**
 * Created by Daniel on 3/16/2016.
 */


var http = require('http');

//  SERVE a minimal website consisting of Home page, About page and Not Found page:

var webServer = http.createServer(function(req,res){

    //  Normalize URL by removing querystring, optional trailing slash, and making it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path) {

        case '':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("HomePage");
            break;

        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("About");
            break;

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Not Found");
            break;
    }

});

webServer.listen(3000);

console.log("Server started on localhost: 3000; press Ctrl-C to terminate....");