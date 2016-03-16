/**
 * Created by Daniel on 3/16/2016.
 */


var http = require('http'),
    fs = require('fs');

//  SERVE a minimal website consisting of Home page, About page and Not Found page:

function serveStaticFile(res, path, contentType, responseCode) {        //  Helper Function

    if(!responseCode) responseCode = 200;


    //  fs.readFile(1,2)  ASYNCHRONOUS METHOD  1.  path  2.  CallBack(1,2)
    fs.readFile(__dirname + path, function(err, data){       // fs.readFile is an asynchronous method for reading file contents  (synch version:  fs.readFileSync)
                                                             // fs.readFile executes the CB function when the file has been read
                                                             //  if the file didn't exist or there were persmission issues reading the file, the err variable is set
                                                             //  CB function takes 1.  error  2.  data:  contents of file
                                                             //  __dirname >>  The name of the directory that the currently executing script resides in.
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('XXX: 500 - Internal Error');
        }else{
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    })
}

var webServer = http.createServer(function(req,res){                        //  Create Web Node Web Server

    //  Normalize URL by removing querystring, optional trailing slash, and making it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path) {                                                         //  ROUTING

        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');        //  Invoke serveStaticFile(1,2,3)
            break;

        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;

        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpg');
            break;

        default:
            serveStaticFile(res, '/public/notfound.html', 'text/html');
            break;
    }
});

webServer.listen(3000);

console.log("Server started on localhost: 3000; press Ctrl-C to terminate....");