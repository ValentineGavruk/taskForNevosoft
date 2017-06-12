var express = require('express'),
    path = require('path'),
    async = require('async'),
    fs = require('fs'),
    mime = require('mime'),
    fse = require('fs-extra'),
    router = express.Router();


router.post('/upload', require('./../controllers/load-photo'));
router.get('/', require('./../controllers/frontpage'));
router.get('/download/:image',  require('./../controllers/download-photo'));
router.get('/images',  require('./../controllers/images'));


module.exports = router;