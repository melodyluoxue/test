/**
 * Created by luoxue on 17/5/22.
 */
var pos = 0;
var currentId = 1;
var speed = 7;//速度
var maxNum = 7;//层数量
var ele;
var loc = 0;
var autoSpeed = 500;


function getOldLeft(e){
    var oldLeft = document.getElementById(e).style.left;
    oldLeft = parseInt(oldLeft);
    return oldLeft;
}

function getOldTop(e){
    var oldTop = document.getElementById(e).style.top;
    oldTop = parseInt(oldTop);
    return oldTop;
}


function Get(s) {
    var element = document.getElementById(s);
    return element;
}

function addGraph(index, left ,top) {

  var thisClass = `graph${index - 1}`;

  $('.onWheel').append(`
        <div id="${index}" class="graph ${thisClass}">
          <div id="${index + 4}7"
            style="position: absolute;left:${left[0]}%;top: ${top[0]}%;z-index: ${index};"><img src="img/${index + 4}7l.png"></div>
          <div id="${index + 4}77"
            style="position: absolute;left:${left[1]}%;top: ${top[1]}%;z-index: ${index};"><img src="img/${index + 4}7.png"></div>
          <div id="p${index + 4}7"
            style="position: absolute;left:${left[2]}%;top: ${top[2]}%;z-index: ${index};"><img src="img/${index + 4}7t.png"></div>
        </div>`);

  addMenu($(`.${thisClass}`), index);
}

function addMenu(father, index) {
  var _index = index == 2 ? '' : index - 2;
  father.append(`
            <div class="wrap">
              <div class="menu"><img class="icon_menu" src="img/logo${_index}-03.png" /><span></span></div>
              <div class="btn btn1" data-num="1"><a href="pages.html" target="_blank"><span>历史</span></a></div>
              <div class="btn btn2" data-num="2"><a href="su2048.html" target="_blank"><span>樱花</span></a></div>
              <div class="btn btn3" data-num="3"><a href="index.html" target="_blank"><span>music</span></a></div>
              <div class="btn btn4" data-num="4"><a href="comments.html" target="_blank"><span>comments</span></a></div>
            </div>`)
}

addGraph(2, [25, 60, 65], [25, 13, 23]);
addGraph(3, [75, 27, 20], [25, 16, 27]);
addGraph(4, [80, 22, 13], [25, 16, 27]);
addGraph(5, [80, 28, 13], [25, 20, 30]);
addGraph(6, [80, 50, 63], [25, 17, 34]);
addGraph(7, [17, 28, 66], [30, 12, 22]);

var old67 = getOldLeft(67);
var oldP = getOldLeft("p67");
var old677 = getOldTop(677);

var old777 = getOldTop(777);
var old77 = getOldLeft(77);
var oldP77 = getOldLeft("p77");

var old877 = getOldLeft(877);
var old87 = getOldLeft(87);
var oldP87 = getOldLeft("p87");

var old97 = getOldLeft(97);
var old977 = getOldTop(977);
var oldP97 = getOldLeft("p97");

var old1077 = getOldTop(1077);
var old107 = getOldLeft(107);

var old117 = getOldLeft(117);
var old1177 = getOldTop(1177);
var oldP117 = getOldLeft("p117");
document.getElementById("max").onclick = click;
function click() {

    var id = window.setInterval(function () {
        if(pos >= 90) {
            window.clearInterval(id);
        }
        OnScroll({deltaY:autoSpeed*0.02});
    },20)
}
function OnScroll(e) {
    var delta = e.deltaY;
    pos += delta * 0.01*speed;

    var value = pos - (currentId - 1) * 100;
    if(currentId == 1) {
        var angle = 70 / 100 * value;
        if(angle < 0)
            angle = 0;
        var el = document.getElementById(1);
        el.style.transform = "translate(-27%,-20%) rotate(" + angle + "deg)";
        max = document.getElementById("max");
        var scale = (1 + 10 / 100 * value);
        if(scale < 1 )
            scale = 1;
        max.style.transform = "translate(-50%,-50%) scale(" + scale+"," + scale + ")";
    max.style.opacity = 1 - value / 100 *2;
        if(value >= 50) {
            max.style.display = "none";
        }
        else {
            max.style.display = "inline";
        }

    }
    if(value > 100) {
        ele = document.getElementById(currentId+1);
        ele.style.clipPath = "circle(100% at 50% 50%)";
        currentId++;
        if(currentId >= maxNum) {
            currentId = maxNum-1;
            pos = 20;
            value = 20;
            var id = window.setInterval(function () {
                if(pos <= 0) {
                    window.clearInterval(id);
                }
                OnScroll({deltaY:-autoSpeed*0.02});
            },20)
        }
        ele = document.getElementById(currentId+1);
        ele.style.clipPath = "circle(" + value-100 + " at 50% 50%)";
    }
    else if(value < 0) {
        ele = document.getElementById(currentId+1);
        ele.style.clipPath = "circle(0% at 50% 50%)";
        currentId--;
        if(currentId <= 0) {
            currentId = 1;
            pos = 0;
            value = -100;
        }
        ele = document.getElementById(currentId+1);
        ele.style.clipPath = "circle(" + value+100 + "% at 50% 50%)";
    }
    else {
        ele = document.getElementById(currentId+1);
        ele.style.clipPath = "circle(" + value + "% at 50% 50%)";
    }



    function setLeft(e,speed,limit,old) {
        var temp1 = Get(e);
        var current =  parseInt(temp1.style.zIndex);

        var currentPos = parseInt(temp1.style.left);
        if (delta < 0) speed = -speed;
        if(currentId == current) {

            currentPos -= speed;

            if (currentPos <= limit) {
                currentPos = limit;
            }
            if(currentPos >= old) {
                currentPos = old;
            }
            temp1.style.left = currentPos + "%";
        }
    }

    function setTop(e,speed,limit,old) {
        var temp1 = Get(e);
        var current =  parseInt(temp1.style.zIndex);
        var currentPos = parseInt(temp1.style.top);
        if (delta < 0) speed = -speed;
        if(currentId == current) {
            currentPos -= speed;
            if (currentPos <= limit) {
                currentPos = limit;
            }
            if(currentPos >= old) {
                currentPos = old;
            }
            temp1.style.top = currentPos + "%";
        }
    }
    function setRight(e,speed,limit,old) {
        var temp1 = Get(e);
        var current =  parseInt(temp1.style.zIndex);
        var currentPos = parseInt(temp1.style.left);
        if (delta < 0) speed = -speed;
        if(currentId == current) {

            currentPos += speed;

            if (currentPos >= limit) {
                currentPos = limit;
            }
            if(currentPos <= old) {
                currentPos = old;
            }
            temp1.style.left = currentPos + "%";
        }
    }

    loc -= delta*0.0005;

    setLeft(67,1,0,old67);setTop(677,1,0,old677);setRight("p67",1,100,oldP);
    setRight(77,1,99,old77); setTop(777,1,0,old777);setLeft("p77",1,0,oldP77);
    setLeft(877,1,0,old877); setRight(87,1,98,old87);setLeft("p87",1,0,oldP87);
    setRight(97,1,98,old97); setTop(977,1,0,old977);setLeft("p97",1,0,oldP97);
    setLeft(107,1,98,old107); setTop(1077,1,0,old1077);
    setTop(1177,1,0,old1177); setLeft(117,1,0,old117);setLeft("p117",1,98,oldP117);
}