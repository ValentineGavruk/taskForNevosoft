export function getLinkPhoto(data, cb) {
    $.ajax({
        url: '/images',
        method: 'GET',
        crossDomain: true,
        complete: function( jqXHR, textStatus){
            var paths = JSON.parse(jqXHR.responseText);
            var files = paths.path;
            files.forEach(function (file) {
                cb(file);
            });
        }
    });



}