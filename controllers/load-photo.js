var multiparty = require('multiparty'),
    path = require('path'),
    fse = require('fs-extra'),
    serverFilesPath = path.resolve('./public/picture'),
    minSizeFiles = 1024; //bytes


module.exports = function (req, res) {

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {

            if (files.picture[0].size >= minSizeFiles) {
                var tmpPath = files.picture[0].path;
                var namePicture = tmpPath.split('/').slice(-1)[0];
                var newServerFilesPath = path.join(serverFilesPath, namePicture);
                fse.move(tmpPath, newServerFilesPath, function (err) {
                    if (err) return console.error(err);
                });
            }
        res.redirect('/');
    });

};