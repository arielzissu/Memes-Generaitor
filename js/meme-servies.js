'use strict'
var gSizeText = 30;
var gSwitchLine = true;

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
    texts: ['', ''],
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
    gSizeText += 10;
    gCtx.font = `${gSizeText}px Impact`;
}

function toDecreaseText(elInputText) {
    if (!elInputText.value) return;
    gSizeText -= 10;
    gCtx.font = `${gSizeText}px Impact`;
}


function toSwitchLines() {
    let line = gSwitchLine ? 2 : 1;
    gMeme.selectedLineIdx = line;
    gSwitchLine = !gSwitchLine;
}