export function writeFile(file, name) {

    var change = false;

    window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, onReadFile, errorHandler);

    function errorHandler(err) {

        switch (err.code) {
            case 8:
                change = true;
                window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, onInitFs, errorHandler);
                window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, onReadFile, errorHandler);
                break;
        }
        ;

    };


    function onInitFs(fs) {
        fs.root.getFile(name, {create: true}, function (fileEntry) {

            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function (e) {
                    console.log('Write completed.');
                };

                fileWriter.onerror = function (e) {
                    console.log('Write failed: ' + e.toString());
                };
                var blob = new Blob([file], {type: 'image/jpg'});

                fileWriter.write(blob);

            }, errorHandler);

        }, errorHandler);

    }


    function onReadFile(fs) {
        fs.root.getFile(name, {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var span = document.createElement('span');
                    if (change) {
                        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', file.name, '"/><i class="icon-change fa fa-check fa-2x" aria-hidden="true"></i>'].join('');
                    } else {
                        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', file.name, '"/>'].join('');
                    }
                    document.getElementById('list').insertBefore(span, null);

                };
                reader.readAsText(file);
            }, errorHandler);
        }, errorHandler);
    }


}