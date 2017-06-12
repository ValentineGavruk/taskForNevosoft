export function getImage(data, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            var file = reader.result;
            cb(file, data);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', '/download/' + data);
    xhr.responseType = 'blob';
    xhr.send();
}