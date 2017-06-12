import {loadPhoto} from './loadPhoto';
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

if (window.requestFileSystem) {
    loadPhoto();
}else{
    var content = document.getElementById('content');
    content.innerHTML = '<div class="alert alert-danger" role="alert">Простите,ваш браузер не поддерживает "File API" .</div>'
}

