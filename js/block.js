function Block(){
    this.position=function(x,y){
        this.x=x;
        this.y=y;
        this.block.style.marginLeft=x*(this.width+this.offset)+"px";
        this.block.style.marginTop=y*(this.height+this.offset)+"px";
    };
    this.create=function(x,y){
        var nwBlock=document.createElement("div");
        nwBlock.className="block";
        this.block=nwBlock;
        this.width=this.height=100;
        this.x=x;
        this.y=y;
        this.offset=7;
        this.position(x,y);
        this.setNumber();
        GAME.stage.appendChild(nwBlock);
    };
    this.setNumber=function(){
        if(arguments[0]){
            this.number=arguments[0];
            this.block.innerHTML=arguments[0];
        }
        else {
            var rand = Math.random();
            this.number = rand <= 0.6 ? 2 : 4;//4的概率稍小
            this.block.innerHTML = this.number;
        }
        switch(parseInt(this.number)){
            case 2:this.block.style.background="url(./img/f-01.png) center no-repeat";
                this.block.style.color="#c69dba";
                this.block.style.fontSize="28px";
                break;
            case 4:this.block.style.background="url(./img/f1-01.png) center no-repeat";
                this.block.style.color="white";
                this.block.style.fontSize="28px";
                break;
            case 8:this.block.style.background="url(./img/f2-01.png) center no-repeat";
                this.block.style.color="#c65885";
                this.block.style.fontSize="28px";
                break;
            case 16:this.block.style.background="url(./img/f3-01.png) center no-repeat";
                this.block.style.color="#546660";
                this.block.style.fontSize="28px";
                break;
            case 32:this.block.style.background="url(./img/f4-01.png) center no-repeat";
                this.block.style.color="#757776";
                this.block.style.fontSize="28px";
                break;
            case 64:this.block.style.background="url(./img/f5-01.png)  center no-repeat";
                this.block.style.color="＃bc93b2";
                this.block.style.fontSize="25px";
                break;
            case 128:this.block.style.background="url(./img/f-01.png) center no-repeat";
                this.block.style.color="#c69dba";
                this.block.style.fontSize="28px";
                break;
            case 256:this.block.style.background="url(./img/f1-01.png) center no-repeat";
                this.block.style.color="white";
                this.block.style.fontSize="28px";
                break;
            case 512:this.block.style.background="url(./img/f2-01.png) center no-repeat";
                this.block.style.color="#c65885";
                this.block.style.fontSize="28px";
                break;
            case 1024:this.block.style.background="url(./img/f3-01.png) center no-repeat";
                this.block.style.color="#546660";
                this.block.style.fontSize="28px";
                break;
            case 2048:this.block.style.background="url(./img/f4-01.png) center no-repeat";
                this.block.style.color="#757776";
                this.block.style.fontSize="28px";
                break;
            case 4096:this.block.style.background="url(./img/f5-01.png) center no-repeat";
                this.block.style.color="＃bc93b2";
                this.block.style.fontSize="25px";
                break;
            case 8192:this.block.style.background="url(./img/f-01.png) center no-repeat";
                this.block.style.color="#c69dba";
                this.block.style.fontSize="28px";
                break;
            case 16384:this.block.style.background="url(./img/f2-01.png) center no-repeat";
                this.block.style.color="#c65885";
                this.block.style.fontSize="28px";
                break;
            case 32768:this.block.style.background="url(./img/f3-01.png) center no-repeat";
                this.block.style.color="#546660";
                this.block.style.fontSize="28px";
                break;
            case 65536:this.block.style.background="url(./img/f4-01.png) center no-repeat";
                this.block.style.color="#757776";
                this.block.style.fontSize="28px";
                break;
            case 131072:this.block.style.background="url(./img/f5-01.png) center no-repeat";
                this.block.style.color="＃bc93b2";
                this.block.style.fontSize="25px";
                break;
            case 262144:this.block.style.background="url(./img/f-01.png) center no-repeat";
                this.block.style.color="#c69dba";
                this.block.style.fontSize="28px";
                break;
            case 524288:this.block.style.background="url(./img/f1-01.png) center no-repeat";
                this.block.style.color="white";
                this.block.style.fontSize="28px";
                break;
        }
    };
}
