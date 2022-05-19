const chart = document.querySelector(".chart");

const canvas = document.createElement("canvas");
canvas.width = 70;
canvas.height = 70;

chart.appendChild(canvas);

const ctx = canvas.getContext("2d");

ctx.lineWidth = 15;

const R = 25;

function drawCircle(color,ratio,anitclockwise){

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(canvas.width/2,canvas.height/2,R,0,ratio * 2 * Math.PI,anitclockwise);
    ctx.stroke();
}

function updateChart(income,outcome){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    let ratio = income/(income+outcome);

    drawCircle("#0f0",-ratio,true);
    drawCircle("#f00",1-ratio);
}


