
function getElemPos(obj){
    var pos = {"top":0, "left":0};
    if (obj.offsetParent){
        while (obj.offsetParent){
            pos.top += obj.offsetTop;
            pos.left += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    }else if(obj.x){
        pos.left += obj.x;
    }else if(obj.x){
        pos.top += obj.y;
    }
    return {x:pos.left, y:pos.top};
}

function offset(ele) {
    var top = ele.offsetTop;
    var left = ele.offsetLeft;
    while (ele.offsetParent) {
        ele = ele.offsetParent;
        if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
            top += ele.offsetTop;
            left += ele.offsetLeft;
        } else {
            top += ele.offsetTop + ele.clientTop;
            left += ele.offsetLeft + ele.clientLeft;
        }
    }
    return {
        left: left,
        top: top
    }

}

var GAME={
    stage:document.getElementById("stage"),
    map:[],
    blkArr:[],
    maxNum:0,
    score:0,
    isKeyDown:0,
    isMove:0,
    init:function(){
        this.map=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        this.createBlock();
        this.createBlock();
        this.createBlock();
        window.onkeydown=function(event){
            if(GAME.isKeyDown) return;
            var e=event||window.event;
            if(e){
                GAME.isKeyDown=1;
                GAME.slide(e.keyCode);
            }
        };
        window.onkeyup=function(){
            GAME.isKeyDown=0;
        };
        setInterval(function(){
            var score=document.getElementById("score");
            score.innerHTML=GAME.score;
        })
    },
    createBlock:function(){
        var blk=new Block(),
            x,y;
        this.blkArr.push(blk);
        x=Math.floor(Math.random()*4);
        y=Math.floor(Math.random()*4);
        while(this.map[y][x]!=0 || x==4 || y==4){
            x=Math.floor(Math.random()*4);
            y=Math.floor(Math.random()*4);
        }
        blk.create(x,y);
        this.map[y][x]=blk;
    },
    merge:function(prevBlock,currBlock){
        var prev=prevBlock.block.innerHTML;
        var curr=currBlock.block.innerHTML;
        //console.log(prev,curr);
        if(prev==curr){
            if(!this.isMove) this.isMove=1;
            reset();
            animateBlobs(1);
            var blockLeft = getElemPos(currBlock).x;
            var blockTop = getElemPos(currBlock).y;
            var top = getTop(currBlock.block);
            var left = getLeft(currBlock.block);
            top += currBlock.height / 2;
            left += currBlock.width / 2;
            setPosition(left,top);

            // console.log(currBlock.x);

            var prevx=prevBlock.x,
                prevy=prevBlock.y;
            prevBlock.position(currBlock.x,currBlock.y);
            currBlock.setNumber(curr * 2);
            prevBlock.block.style.zIndex=-1;
            this.map[prevy][prevx]=0;
            this.score+=curr*2;
            setTimeout(function(){
                this.stage.removeChild(prevBlock.block);
                delete prevBlock;
            },300);
            return true;
        }
        return false;
    },
    slide:function(keycode){
        var i, j, k, curr;
        if(keycode==37){//Left
            for(i=0;i<4;i++){
                k=0;
                for(j=0;j<3;j++){//所有块先移动
                    if(this.map[i][j]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[i][k]==0 && k++);
                        if(k==4) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
                for(j=0;j<3;j++){//相邻等值块合并
                    if(this.map[i][j]!=0 && this.map[i][j+1]!=0) {
                        if(this.merge(this.map[i][j + 1], this.map[i][j])){
                            //防止相邻两两合并时方块无动画消失
                            curr=k=j+1;
                            while(k<4){
                                if(this.map[i][k]!=0){
                                    this.map[i][k].position(curr,i);



                                    this.map[i][curr++]=this.map[i][k];
                                    this.map[i][k]=0;
                                }
                                k++;
                            }
                        }
                    }
                }
                k=0;
                for(j=0;j<3;j++){//消除合并后可能产生的空块
                    if(this.map[i][j]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[i][k]==0 && k++);
                        if(k==4) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
            }
        }
        if(keycode==38){//Top
            for(i=0;i<4;i++){
                k=0;
                for(j=0;j<3;j++){//所有块先移动
                    if(this.map[j][i]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[k][i]==0 && k++);
                        if(k==4) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
                for(j=0;j<3;j++){//相邻等值块合并
                    if(this.map[j][i]!=0 && this.map[j+1][i]!=0) {
                        if(this.merge(this.map[j+1][i], this.map[j][i])){
                            //防止相邻两两合并时方块无动画消失
                            curr=k=j+1;
                            while(k<4){
                                if(this.map[k][i]!=0){
                                    this.map[k][i].position(i,curr);
                                    this.map[curr++][i]=this.map[k][i];
                                    this.map[k][i]=0;
                                }
                                k++;
                            }
                        }
                    }
                }
                k=0;
                for(j=0;j<3;j++){//消除合并后可能产生的空块
                    if(this.map[j][i]==0){
                        if(k==0) k=j+1;
                        while(k<4 && this.map[k][i]==0 && k++);
                        if(k==4) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
            }
        }
        if(keycode==39){//Right
            for(i=0;i<4;i++){
                k=3;
                for(j=3;j>=1;j--){//所有块先移动
                    if(this.map[i][j]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[i][k]==0 && k--);
                        if(k==-1) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
                for(j=3;j>=1;j--){//相邻等值块合并
                    if(this.map[i][j]!=0 && this.map[i][j-1]!=0) {
                        if(this.merge(this.map[i][j - 1], this.map[i][j])){
                            //防止相邻两两合并时方块无动画消失
                            curr=k=j-1;
                            while(k>=0){
                                if(this.map[i][k]!=0){
                                    this.map[i][k].position(curr,i);
                                    this.map[i][curr--]=this.map[i][k];
                                    this.map[i][k]=0;
                                }
                                k--;
                            }
                        }
                    }
                }
                k=3;
                for(j=3;j>=1;j--){//消除合并后可能产生的空块
                    if(this.map[i][j]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[i][k]==0 && k--);
                        if(k==-1) break;
                        this.map[i][k].position(j,i);
                        this.map[i][j]=this.map[i][k];
                        this.map[i][k]=0;
                    }
                }
            }
        }
        if(keycode==40){//Down
            for(i=0;i<4;i++){
                k=3;
                for(j=3;j>=1;j--){//所有块先移动
                    if(this.map[j][i]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[k][i]==0 && k--);
                        if(k==-1) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
                for(j=3;j>=1;j--){//相邻等值块合并
                    if(this.map[j][i]!=0 && this.map[j-1][i]!=0) {
                        if(this.merge(this.map[j-1][i], this.map[j][i])){
                            //防止相邻两两合并时方块无动画消失
                            curr=k=j-1;
                            while(k>=0){
                                if(this.map[k][i]!=0){
                                    this.map[k][i].position(i,curr);
                                    this.map[curr--][i]=this.map[k][i];
                                    this.map[k][i]=0;
                                }
                                k--;
                            }
                        }
                    }
                }
                k=3;
                for(j=3;j>=1;j--){//消除合并后可能产生的空块
                    if(this.map[j][i]==0){
                        if(k==3) k=j-1;
                        while(k>=0 && this.map[k][i]==0 && k--);
                        if(k==-1) break;
                        this.map[k][i].position(i,j);
                        this.map[j][i]=this.map[k][i];
                        this.map[k][i]=0;
                    }
                }
            }
        }
        if(keycode<=40 && keycode>=37) {
            setTimeout(function () {
                var numOfBlock = 0;
                for (i = 0; i < 4; i++) {
                    for (j = 0; j < 4; j++) {
                        if (GAME.map[i][j] != 0){
                            numOfBlock++;
                            if(GAME.map[i][j].block.innerHTML>GAME.maxNum){
                                GAME.maxNum=GAME.map[i][j].block.innerHTML
                            }
                        }
                    }
                }
                //console.log(numOfBlock)
                if (numOfBlock == 16 && !GAME.isMove) {
                    alert("游戏结束!");
                    window.location.reload();
                }
                else {
                    GAME.isMove=0;
                    GAME.createBlock();
                }
            }, 300)
        }
    }
};
GAME.init();


$(function() {
    var numberOfStars = 20;

    for (var i = 0; i < numberOfStars; i++) {
        $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
    }
    //animateBlobs();
    setPosition();
});

function reset() {
    $.each($('.blob'), function(i) {
        TweenMax.set($(this), { x: 0, y: 0, opacity: 1 });
    });

    TweenMax.set($('h1'), { scale: 1, opacity: 1, rotation: 0 });
}

function setPosition(x,y) {
    $.each($('.blob'),function () {
        var $b = $(this);
        $b.css('left',x);
        $b.css('top',y);
    })
}
//获取元素的纵坐标
function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    return offset;
}
//获取元素的横坐标
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
    return offset;
}

// function animateBlobs() {
//
//     var xSeed = _.random(1, 2);
//     var ySeed = _.random(120, 170);
//
//
//     $.each($('.blob'), function() {
//         var $blob = $(this);
//         var speed = _.random(1, 5);
//         var rotation = _.random(5, 100);
//         var scale = _.random(0.8, 1.5);
//         var x = _.random(-xSeed, xSeed);
//         var y = _.random(-ySeed, ySeed);
//
//         TweenMax.to($blob, speed, {
//             x: x,
//             y: y,
//             ease: Power1.easeOut,
//             opacity: 0,
//             rotation: rotation,
//             scale: scale,
//             onStartParams: [$blob],
//             onStart: function($element) {
//                 $element.css('display', 'block');
//             },
//             onCompleteParams: [$blob],
//             onComplete: function($element) {
//                 $element.css('display', 'none');
//             }
//         });
//     });
// }

var oImg = document.getElementById('scoreBox');
// console.log(offset(oImg).top, offset(oImg).left);

// console.log(rect);