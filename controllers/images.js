var multiparty = require('multiparty'),
    path = require('path'),
    fse = require('fs-extra'),
    async = require('async'),
    dir = path.resolve('./public/picture');


module.exports = function (req, res) {
 
    async.parallel([
            function (callback) {
                var links = [];
                fse.readdir(dir, function (err, files) {
                    files.forEach(function (file) {
                        links.push(file);
                    });

                    if(files.length == links.length){
                        callback(null, links);
                    }
                });
            }
        ],
        function (err, results) {
            res.send({path: results[0]});
        });

};