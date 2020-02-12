'use strict'

var gMeme = getmeme();
var gImgs = getImgs();
var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    _renderImgs();

}


function _renderImgs() {
    let elgallery = document.querySelector('.container-gallery');
    let strHtml = ``;
    gImgs.forEach(img => {
        strHtml += `<img onclick="onOpenModal(${img.id})" class="box-img" src="${img.url}" >`;
    });
    elgallery.innerHTML = strHtml;
}



function onSaveText() {
    let elTextInput = document.querySelector('.text-input');
    if (gMeme.selectedLineIdx === 1) {
        gMeme.texts[0].txt = elTextInput.value;
    }
    if (gMeme.selectedLineIdx === 2) {
        gMeme.texts[1].txt = elTextInput.value;
    }

}

function drawImage() {
    let linkImg = findLinkImg();
    let image = new Image();
    image.onload = drawImage;
    image.src = linkImg;
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);
    createText();
}

function createText() {
    gCtx.font = `${gSizeText}px Impact`;
    gCtx.fillStyle = 'red';
    gCtx.fillText(gMeme.texts[0].txt, 50, 50);
    gCtx.fillText(gMeme.texts[1].txt, 50, gElCanvas.height - 50);
}



function onOpenModal(imgId) {
    let elModal = document.querySelector('.modal');
    gMeme.selectedImgId = imgId;
    elModal.hidden = false;
    drawImage();
}

function onCloseModal() {
    let elModal = document.querySelector('.modal');
    elModal.hidden = true;
}

function onIncreaseText() {
    let elInputText = document.querySelector('.text-input');
    toIncreaseText(elInputText);
}

function onDecreaseText() {
    let elInputText = document.querySelector('.text-input');
    toDecreaseText(elInputText);
}

function onSwitchLines() {
    let elTextInput = document.querySelector('.text-input');
    elTextInput.value = '';
    toSwitchLines(elTextInput);
}