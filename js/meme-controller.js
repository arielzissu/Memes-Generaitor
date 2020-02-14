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
        gCtx.fillText(text.txt, text.idxStart, text.coordY);
    });
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
    consolelog('a:::', gMeme.texts[0].coordY);
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
        text.idxStart = 225;
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
    const data = gElCanvas.toDataURL('image/jpeg', 1.0);
    elLink.href = data;
    elLink.download = 'Your Meme';
}


function toggleMenu() {
    document.body.classList.toggle('menu-open');
}



// function uploadImg(elForm, ev) {
//     ev.preventDefault();
//     document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

//     // A function to be called if request succeeds
//     function onSuccess(uploadedImgUrl) {
//         uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
//         document.querySelector('.share-container').innerHTML = `
//         <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//            Share   
//         </a>`
//     }

//     doUploadImg(elForm, onSuccess);
// }

// function doUploadImg(elForm, onSuccess) {
//     var formData = new FormData(elForm);
//     fetch('http://ca-upload.com/here/upload.php', {
//             method: 'POST',
//             body: formData
//         })
//         .then(function(res) {
//             return res.text()
//         })
//         .then(onSuccess)
//         .catch(function(err) {
//             console.error(err)
//         })
// }