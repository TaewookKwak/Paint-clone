'use strict'

const canvas = document.querySelector('#JsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const range = document.querySelector('#JsRange');
const mode = document.querySelector('#JsMode');
const save = document.querySelector('#JsSave');
const erase = document.querySelector('#JsModeforErase');
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE =700;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE; // 캔버스 사이즈 폭
canvas.height = CANVAS_SIZE; //캔버스 사이즈 높이
ctx.strokeStyle = "#INITIAL_COLOR"; //글씨 색깔
ctx.fillStyle = "white"; //필 색깔
ctx.lineWidth = 1; // 글씨 사이즈
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle =color;

}

function handleRangeChnage(e) {
    let lineSize = e.target.value;
    ctx.lineWidth = lineSize;
}

function hnadleModeClick () {
    if (filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText ="Paint";
    }
}

function handleCanvasClick (){
    if(filling)
    {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveImage(e){
    const image = canvas.toDataURL("image/");
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleEraseClick(e) {
    const tempColor = ctx.fillStyle;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    ctx.fillStyle = tempColor;
}

if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

colors.forEach(color => color.addEventListener('click', handleColorClick));

if(range){
    range.addEventListener('input', handleRangeChnage);
}

if(mode){
    mode.addEventListener('click', hnadleModeClick);
}

if(erase){
    erase.addEventListener('click', handleEraseClick);
}

if(save){
    save.addEventListener('click', handleSaveImage);
}