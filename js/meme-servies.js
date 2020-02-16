'use strict'

var gSwitchLine = 1;
var gLineIsAdd = false;
var prevX;
var prevY;

var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['blabla'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['blabla'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['blabla'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['blabla'] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['blabla'] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['blabla'] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['blabla'] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['blabla'] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['blabla'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['blabla'] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['blabla'] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['blabla'] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['blabla'] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['blabla'] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['blabla'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['blabla'] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['blabla'] },
];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 1,
    texts: [{
            txt: '',
            size: 30,
            align: 'center',
            color: '#000000',
            coordY: 50,
            coordX: 225,
        },
        {
            txt: '',
            size: 30,
            align: 'center',
            color: '#000000',
            coordY: 400,
            coordX: 225,
        },
        {
            txt: '',
            size: 30,
            align: 'center',
            color: '#000000',
            coordY: 225,
            coordX: 225,
        },
    ]
}

function getmeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function findLinkImg() {
    var imgIdx = gMeme.selectedImgId;
    var linkImg = gImgs[imgIdx - 1].url;
    return linkImg;
}

function toIncreaseText(elInputText) {
    if (!elInputText.value) return;
    let curridx = gMeme.selectedLineIdx;
    gMeme.texts[curridx - 1].size += 2;
    gCtx.font = `${gMeme.texts[curridx - 1].size}px Impact`;
}

function toDecreaseText(elInputText) {
    if (!elInputText.value) return;
    let curridx = gMeme.selectedLineIdx;
    gMeme.texts[curridx - 1].size -= 2;
    gCtx.font = `${gMeme.texts[curridx - 1].size}px Impact`;
}

function toSwitchLines(elTextInput, elColorInput) {
    var line;
    if (gSwitchLine === 1) {
        line = 2;
        gSwitchLine = 2;
    } else if (gSwitchLine === 2) {
        if (gLineIsAdd) {
            line = 3;
            gSwitchLine = 3;
        } else {
            line = 1;
            gSwitchLine = 1;
        }
    } else if (gSwitchLine === 3) {
        line = 1;
        gSwitchLine = 1;
    }
    gMeme.selectedLineIdx = line;
    elTextInput.value = gMeme.texts[line - 1].txt;
    elColorInput.value = gMeme.texts[line - 1].color;
}

function createColor(color) {
    let curridx = gMeme.selectedLineIdx;
    gMeme.texts[curridx - 1].color = color;
}

function toUpText() {
    let curridx = gMeme.selectedLineIdx;
    gMeme.texts[curridx - 1].coordY -= 10;
}

function toDownText() {
    let curridx = gMeme.selectedLineIdx;
    gMeme.texts[curridx - 1].coordY += 10;
}

function changeAlign(side) {
    let curridx = gMeme.selectedLineIdx;
    switch (side) {
        case 'left':
            {
                gMeme.texts[curridx - 1].align = 'left';
                gMeme.texts[curridx - 1].coordX = 10;
            }
            break;
        case 'center':
            {
                gMeme.texts[curridx - 1].align = 'center';
                gMeme.texts[curridx - 1].coordX = gElCanvas.width / 2;
            }
            break;
        case 'right':
            {
                gMeme.texts[curridx - 1].align = 'right';
                gMeme.texts[curridx - 1].coordX = gElCanvas.width - 10;
            }
            break;
    }
}

function addingNewLine() {
    gLineIsAdd = !gLineIsAdd;
    gSwitchLine = 2;
}


function clearCanvas() {
    gMeme.selectedLineIdx = 1;
    gLineIsAdd = false;
}

function drawRect(y) {
    let currLine = gMeme.selectedLineIdx;
    let currSize = gMeme.texts[currLine - 1].size;
    gCtx.beginPath();
    gCtx.rect(0, y - 30 - (currSize / 3), gElCanvas.width, 35 + (currSize / 2.5));
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.fillStyle = 'rgba(199, 191, 191, 0.15)';
    gCtx.fillRect(0, y - 30 - (currSize / 3), gElCanvas.width, 35 + (currSize / 2.5));
}

function markerLine() {
    let currLine = gMeme.selectedLineIdx;
    let y = gMeme.texts[currLine - 1].coordY;
    drawRect(y);
}

function offMarkLine() {
    let currLine = gMeme.selectedLineIdx;
    let y = gMeme.texts[currLine - 1].coordY;
    closeRect(y);
}

function closeRect(y) {
    let currLine = gMeme.selectedLineIdx;
    let currSize = gMeme.texts[currLine - 1].size;
    gCtx.beginPath();
    gCtx.rect(0, y - 30 - (currSize / 3), gElCanvas.width, 35 + (currSize / 2.5));
    gCtx.strokeStyle = '';
    gCtx.stroke();
    gCtx.fillStyle = 'rgba(199, 191, 191, 0)';
    gCtx.fillRect(0, y - 30 - (currSize / 3), gElCanvas.width, 35 + (currSize / 2.5));
}

function changeRectSize(num) {
    let currLine = gMeme.selectedLineIdx;
    gMeme.texts[currLine - 1].size += (1 * num);
}

function canvasClicked(ev) {
    prevX = ev.offsetX;
    prevY = ev.offsetY;
    let currLine = gMeme.selectedLineIdx;
    let currSize = gMeme.texts[currLine - 1].size;
    let y = gMeme.texts[currLine - 1].coordY;
    if (prevY >= (y - 30 - (currSize / 3)) && prevY <= (y + 35 + (currSize / 2.5))) {
        if (ev.type === 'mousedown') {
            gElCanvas.addEventListener('mousemove', moving);
            gElCanvas.addEventListener('mouseup', stopMoving);
            gElCanvas.addEventListener('touchmove', moving);
        }

    }

}


function moving(ev) {
    let currLine = gMeme.selectedLineIdx;
    gMeme.texts[currLine - 1].coordX = ev.offsetX;
    gMeme.texts[currLine - 1].coordY = ev.offsetY;
    drawImages();
}

function stopMoving() {
    gElCanvas.removeEventListener('mousemove', moving);
}