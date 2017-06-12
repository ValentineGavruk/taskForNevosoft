var http = require('http'),
    express = require('express'),
    path = require('path'),
    routes = require('./routes/index'),
    app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var server = new http.createServer(app);

const port = 3000;

server.listen(port, function () {
    console.log('Server is start on ' + port + ' port');
});

