
var text;

var rnd = 0;
var ctx;
var w;
var h;
var day = 0;
var espesor = 1;
var iinit;

var bgrdColor = '#eeeeee';
var drawColor = '#000000';

var scale = 1;
//var branchLimit = 30;
var branchProb = 1.5;
var twigLimit = 30;
var twigProb = 0.6;

var tree;
var pen = [];

function penn(x,y,angle){
    
    this.x = x || 0.5+w/2;
    this.y = y || h-20*scale;
    this.angle = angle || -Math.PI/2;
}

function init(){
    
    
    ctx = document.getElementById("canvas").getContext("2d");
    
    w = canvas.width;
    h = canvas.height;
    ctx.fillStyle = bgrdColor;
	ctx.fillRect(0, 0, w, h);
    
    pen.push(new penn());
    tree = {
        heightMax: 450,
        espesorMax: 70
    };
    
    
    document.getElementById("txtfld").value = Math.round(Math.random()*10000);
    
    //Random preparation
    text = document.getElementById("txtfld");
    rnd = parseInt(text.value);
    for(var i=0;i<1000;i++){
        rnd = (rnd%1000)*1000+(rnd%1000)+(Math.round(rnd/1000)%1000);
    }
    
    document.getElementById("par").innerHTML = "Day " + day;
    
    
}

function clickBtn(){
    ctx.fillStyle = bgrdColor;
    ctx.fillRect(0, 0, w, h);
    
    rnd = parseInt(text.value);
    
    day+=10;
    document.getElementById("par").innerHTML = "Day " + day;
    
    
    /*
    // SHOW AVERAGE
    var k = 0;
    for(var i=1000;i>0;i--){
        k+=getRnd();
    }
    document.getElementById("par").innerHTML += " | " + k/1000;
    */
    
    //console.log(getRnd());
    
    
    //CRECIMIENTO
    if(day<tree.heightMax){
        iinit=day;
        for(var i=day;i>0;i--){

            drawTree(i);
            
        }
        ctx.fillStyle = bgrdColor;
        ctx.fillRect(0, h-20, w, h);
        
    }else{ //ENSANCHE
        if(espesor < tree.espesorMax){
            espesor += 1-(espesor/tree.espesorMax);
        }
        iinit=tree.heightMax;
        for(var i=tree.heightMax;i>0;i--){

            drawTree(i);

        }
        ctx.fillStyle = bgrdColor;
        ctx.fillRect(0, h-20, w, h);
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
    day=0;
    espesor = 1;
}
function drawBall(x,y,r){
    ctx.beginPath();
    ctx.arc(x, y, r,0,2*Math.PI);
    ctx.fillStyle = drawColor;
    ctx.fill();
}
function drawTree(i){
    //angle calculation
    pen[0].angle += -0.05+0.10*(getRnd()/100);
    if(pen[0].angle<-Math.PI/2){
        pen[0].angle += 0.003;
    }else{
        pen[0].angle -= 0.003;
    }
    pen[0].x += Math.cos(pen[0].angle);
    pen[0].y += Math.sin(pen[0].angle);
    drawBall(pen[0].x,pen[0].y,i/(80-espesor));
    
    //generate branch
    if(getRnd()<branchProb && iinit>100 && iinit<=tree.heightMax && i<iinit-100){
        pen.push(new penn(pen[0].x , pen[0].y , (-Math.PI+ getRnd()/100*Math.PI) ));
    }
    
    for(var k=1 ; k<pen.length ; k++){
        //Moving pen
        pen[k].x += Math.cos(pen[k].angle);
        pen[k].y += Math.sin(pen[k].angle);
        pen[k].angle += -0.1+0.20*(getRnd()/100);
        
        
        if(pen[k].angle <= -(Math.PI)){
            pen[k].angle+=2*Math.PI;
        }if(pen[k].angle >= Math.PI){
            pen[k].angle-=2*Math.PI;
        }
        
        if(pen[k].angle<Math.PI && pen[k].angle>Math.PI/2){
            pen[k].angle += 0.03;
        }if(pen[k].angle<=Math.PI/2 && pen[k].angle>0){
            pen[k].angle -= 0.03;
        }
        
        
        //Generate twig
        var rnd1 = getRnd();
        //end twigs
        if(rnd1<2 && pen.length<200 && iinit>tree.heightMax-100 && i<100-(tree.heightMax-iinit) && iinit<=tree.heightMax){
            pen.push(new penn(pen[k].x , pen[k].y , (getRnd()/100)*2*Math.PI ) );
        }//middle twigs
        else if(rnd1<twigProb && pen.length<twigLimit){
            pen.push(new penn(pen[k].x , pen[k].y , pen[k].angle-(Math.PI-2)+ (getRnd()/100*(Math.PI-1)) ) );
        }
                
        drawBall(pen[k].x,pen[k].y,i/(100-espesor));
    }
}

function getRnd(){
    rnd = (rnd%1000)*1000+((rnd%1000)+(Math.round(rnd/1000)%1000)+1234);
    return (rnd%1000)/10;
}

