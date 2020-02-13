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
    drawImages();
}

function drawImages() {
    var linkImg = findLinkImg();
    var img = new Image();
    img.src = linkImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        createText();
    }
}




function createText() {
    // drawRect(30);
    gCtx.fillStyle = gMeme.texts[0].color;
    gCtx.font = `${gMeme.texts[0].size}px Impact`;
    gCtx.textAlign = gMeme.texts[0].align;
    gCtx.fillText(gMeme.texts[0].txt, gMeme.texts[0].idxStart, gMeme.texts[0].coordY);

    gCtx.fillStyle = gMeme.texts[1].color;
    gCtx.font = `${gMeme.texts[1].size}px Impact`;
    gCtx.textAlign = gMeme.texts[1].align;
    gCtx.fillText(gMeme.texts[1].txt, gMeme.texts[1].idxStart, gMeme.texts[1].coordY);
}



function onOpenModal(imgId) {
    let elModal = document.querySelector('.modal');
    gMeme.selectedImgId = imgId;
    elModal.hidden = false;
    drawImages();
}

function onCloseModal() {
    let elModal = document.querySelector('.modal');
    elModal.hidden = true;
}

function onIncreaseText() {
    let elInputText = document.querySelector('.text-input');
    toIncreaseText(elInputText);
    drawImages();
}

function onDecreaseText() {
    let elInputText = document.querySelector('.text-input');
    toDecreaseText(elInputText);
    drawImages();
}

function onSwitchLines() {
    let elTextInput = document.querySelector('.text-input');
    elTextInput.value = '';
    var elColorInput = document.querySelector('.color-input');
    toSwitchLines(elTextInput, elColorInput);
}

function onChangeColor(color) {
    createColor(color)
    drawImages();
}

function onUpText() {
    toUpText();
    drawImages();
}


function onDownText() {
    toDownText();
    drawImages();
}

function onChangeAlign(side) {
    changeAlign(side);
    drawImages();
}

function drawRect(y) {
    gCtx.beginPath();
    gCtx.rect(0, y - 10, gElCanvas.width, y + 10);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.fillStyle = 'grey';
    gCtx.fillRect(0, y - 10, gElCanvas.width, y + 10);
}