import {getLinkPhoto} from './requests/getLinkPhoto';
import {getImage} from './requests/getImage';
import {writeFile} from './writeFile';

export function loadPhoto() {

    getLinkPhoto(null, downloadImage);

    function downloadImage(fileName) {
        getImage(fileName, writeFile);
    }
}