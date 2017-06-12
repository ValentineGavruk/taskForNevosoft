var multiparty = require('multiparty'),
    path = require('path'),
    fs = require('fs');


module.exports = function (req, res) {

    var image = req.params.image;

    var file = path.resolve('public/picture/' + image);


    var img = fs.readFileSync(file);

    res.writeHead(200, {'Content-Type': 'image/jpg'});

    res.end(img, 'binary');


};