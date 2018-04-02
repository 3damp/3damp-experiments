
var text;

var rnd = 0;
var ctx;
var w;
var h;

var scale = 1;

var pen = [];

function penn(x,y,angle){
    
    this.x = typeof x !== 'undefined' ? x : 0.5+w/2;
    this.y = typeof y !== 'undefined' ? y : h-20*scale;
    this.angle = typeof angle !== 'undefined' ? angle : -Math.PI/2;
}

function init(){
    
    
    ctx = document.getElementById("canvas").getContext("2d");
    
    w = canvas.width;
    h = canvas.height;
    ctx.fillStyle = "#111111";
	ctx.fillRect(0, 0, w, h);
    
    
    
    tree = {
        heightMax: 450,
        espesorMax: 70
    };
    
    
    document.getElementById("txtfld").value = Math.round(Math.random()*100000000);
    
    //Random preparation
    text = document.getElementById("txtfld");
    rnd = parseInt(text.value);
    for(var i=0;i<1000;i++){
        rnd = (rnd%1000)*1000+(rnd%1000)+(Math.round(rnd/1000)%1000);
    }
    
}

function clickBtn(){
    
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, w, h);
    
    rnd = parseInt(text.value);
    
    
    // SHOW AVERAGE
    /*
    var k = 0;
    for(var i=10000;i>0;i--){
        k+=getRnd();
    }
    document.getElementById("par").innerHTML += " | " + Math.round(k/10000);
    */
    
    pen = [];
    for(var i=0;i<100;i++){
        pen.push(new penn(0+(i*8)));
    }
    for(var i=0;i<30000;i++){
        
        var rnd1 = (Math.round(getRnd()*100))%100;
        //console.log(rnd1);
        pen[rnd1].y -= 1;
        ctx.fillStyle = "#bfff00";
        ctx.fillRect(pen[rnd1].x, pen[rnd1].y, 6, -1);
        //console.log(getRnd());
    }
    
    //reset pen
    pen = [];
    pen[0] = new penn();
    
}

function changeText(){
    
    //seed change
    text = document.getElementById("txtfld");
    rnd = parseInt(text.value);
    for(var i=0;i<10;i++){
        rnd = (rnd%100)*100+(rnd%100)+(Math.round(rnd/100)%100);
    }
}
function drawBall(x,y,r){
    ctx.beginPath();
    ctx.arc(x, y, r,0,2*Math.PI);
    ctx.fillStyle = "#ffffff";
    /*ctx.shadowBlur=15;
    ctx.shadowColor='#ccff00';
    */
    ctx.fill();
}
function drawTree(i){
    
}

function getRnd(){
    rnd = (rnd%10000)*10000+((rnd%10000)+(Math.round(rnd/10000)%10000));
    return (rnd%100000)/100000;
}

