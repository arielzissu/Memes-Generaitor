'use strict'

var gMeme = getmeme();
var gImgs = getImgs();
var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    _renderImgs();
    // gElCanvas.addEventListener('touchmove', (ev) => { ev.defaultPrevented() }, event);
    // gElCanvas.addEventListener('touchstart', (ev) => { ev.defaultPrevented() }, event);
    // var hammerTime = new Hammer(gElCanvas);
    // hammerTime.on('panup pandown panleft panright', touchMove);

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
    if (gMeme.selectedLineIdx === 3) {
        gMeme.texts[2].txt = elTextInput.value;
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
    gMeme.texts.forEach(text => {
        gCtx.fillStyle = text.color;
        gCtx.font = `${text.size}px Impact`;
        gCtx.textAlign = text.align;
        gCtx.fillText(text.txt, text.coordX, text.coordY);
    });
    markerLine();
}

function onOpenModal(imgId) {
    let elModal = document.querySelector('.modal');
    gMeme.selectedImgId = imgId;
    elModal.hidden = false;
    drawImages();
    let elBody = document.querySelector('body');
    elBody.style.overflow = 'hidden';
}

function onCloseModal() {
    let elModal = document.querySelector('.modal');
    elModal.hidden = true;
    let elBody = document.querySelector('body');
    elBody.style.overflow = 'scroll';
}

function onIncreaseText() {
    let elInputText = document.querySelector('.text-input');
    toIncreaseText(elInputText);
    drawImages();
    changeRectSize(1);
}

function onDecreaseText() {
    let elInputText = document.querySelector('.text-input');
    toDecreaseText(elInputText);
    drawImages();
    changeRectSize(-1);
}

function onSwitchLines() {
    let elTextInput = document.querySelector('.text-input');
    elTextInput.value = '';
    var elColorInput = document.querySelector('.color-input');
    offMarkLine();
    drawImages();
    toSwitchLines(elTextInput, elColorInput);
    markerLine();
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

function onAddLine() {
    addingNewLine();
    onSwitchLines();
}

function onResizeCanvas() {
    var elContainer = document.querySelector('.canvas');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    gMeme.texts.forEach(text => {
        text.txt = '';
        text.size = 30;
        text.color = '#000000';
        text.align = 'center';
        text.coordX = 225;
    });
    let elTextInput = document.querySelector('.text-input');
    elTextInput.value = '';
    var linkImg = findLinkImg();
    var img = new Image();
    img.src = linkImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    var elColorInput = document.querySelector('.color-input');
    elColorInput.value = '#000000';
    clearCanvas();
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL('image/jpg');
    elLink.href = data;
}


function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

// function touchMove(ev) {
//     let currLine = gMeme.selectedLineIdx;
//     gMeme.texts[currLine - 1].coordX = ev.offsetX;
//     gMeme.texts[currLine - 1].coordY = ev.offsetY;
//     drawImages();
// }