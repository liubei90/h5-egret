/**
 * Created by Administrator on 7/6 0006.
 */
class StoneManager {
    private static instance:StoneManager;
    private parent:MainGamePanel;
    private stonearray:StoneBmp[][] = [];
    private stonesrow:number = 8;
    private stonescol:number = 6;
    private stonW:number = 106;
    private stonH:number = 106;

    private choosestone:StoneBmp;
    private touchpostion:egret.Point = new egret.Point();
    private btouchone:boolean = false;


    public static getInstance():StoneManager {
        if(!this.instance) {
            this.instance = new StoneManager();
        }
        return this.instance;
    }

    public setContext(p:MainGamePanel):void {
        this.parent = p;
    }

    public initStone():void {
        this.stonearray = [];
        for(var i:number = 0; i < this.stonesrow; i++) {
            this.stonearray[i] = [];
            for(var j:number = 0; j < this.stonescol; j++) {
                var curstone:number = Math.floor(Math.random()*6);
                var curstonbmp:StoneBmp = StoneBmp.createStoneBmp(curstone);
                this.stonearray[i][j] = curstonbmp;
                curstonbmp.setPostion(j*this.stonW, i*this.stonH);
                curstonbmp.attachParent(this.parent);
            }
        }

        this.checkNeedRefresh();
    }

    public initStone2():void {
        var map:number[][] = [[0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1],
                               [0, 1, 0, 1, 0, 1]];
        this.stonearray = [];
        for(var i:number = 0; i < this.stonesrow; i++) {
            this.stonearray[i] = [];
            for(var j:number = 0; j < this.stonescol; j++) {
                var curstonbmp:StoneBmp = StoneBmp.createStoneBmp(map[i][j]);
                this.stonearray[i][j] = curstonbmp;
                curstonbmp.setPostion(j*this.stonW, i*this.stonH);
                curstonbmp.attachParent(this.parent);
            }
        }

        this.checkNeedRefresh();
    }

    public onTouchBegin(x:number, y:number):void {
        this.btouchone = true;
        this.touchpostion.x = x;
        this.touchpostion.y = y;
        var i:number = Math.floor(y/this.stonH);
        var j:number = Math.floor(x/this.stonW);
        var curstonebmp1:StoneBmp = this.stonearray[i][j];
        if(!this.choosestone) {
            this.choosestone = curstonebmp1;
        }
        else {
            if(this.choosestone == curstonebmp1) {
                ;
            }
            else {
                var ci:number = this.choosestone.getY()/this.stonH;
                var cj:number = this.choosestone.getX()/this.stonW;
                if(( Math.abs(ci - i) == 1 && cj == j ) || ( Math.abs(cj - j) == 1 && ci == i )) { //可以交换
                    if(this.choosestone.getIndex() == curstonebmp1.getIndex()) { //检测颜色是否相同
                        this.choosestone.moveAndBack(j*this.stonW, i*this.stonH);
                        curstonebmp1.moveAndBack(cj*this.stonW, ci*this.stonH);
                        return;
                    }
                    this.stonearray[i][j] = this.choosestone;
                    this.stonearray[ci][cj] = curstonebmp1;
                    var mc:StoneCallBack = new StoneCallBack(this.moveCallback, this, [i, j, ci, cj]);
                    this.choosestone.moveAndCheckStone(j*this.stonW, i*this.stonH, mc);
                    curstonebmp1.moveAndCheckStone(cj*this.stonW, ci*this.stonH, mc)
                    //console.log("in onTouchBegin i: "+i+" j: "+j+" ci: " + ci + " cj: "+cj);
                }
                else {
                    this.choosestone = curstonebmp1;
                }
            }
        }
    }

    public onTouchMove(x:number, y:number):void {
        if(!this.btouchone) {
            return;
        }
        if(this.choosestone && this.touchpostion) {
            if(Math.abs(x - this.touchpostion.x) > 30 ||Math.abs(y - this.touchpostion.y) > 30) {
                this.btouchone = false;
                var ci:number = this.choosestone.getY()/this.stonH;
                var cj:number = this.choosestone.getX()/this.stonW;
                var curstonebmp1:StoneBmp;
                var i:number, j:number;
                if(Math.abs(x - this.touchpostion.x) > Math.abs(y - this.touchpostion.y)) {
                    if((x - this.touchpostion.x) > 0) {
                        if(cj < (this.stonescol - 1)) {
                            i = ci;
                            j = cj + 1;
                            curstonebmp1 = this.stonearray[i][j];//右
                        }
                    }
                    else if((x - this.touchpostion.x) < 0){
                        if(cj > 0) {
                            i = ci;
                            j = cj-1;
                            curstonebmp1 = this.stonearray[i][j];//左
                        }
                    }
                }
                else {
                    if((y - this.touchpostion.y) > 0) {
                        if(ci < (this.stonesrow - 1)){
                            i = ci+1;
                            j = cj;
                            curstonebmp1 = this.stonearray[i][j];//下
                        }
                    }
                    else if((y - this.touchpostion.y) < 0){
                        if(ci > 0) {
                            i = ci-1;
                            j = cj;
                            curstonebmp1 = this.stonearray[i][j];//上
                        }
                    }
                }
                if(curstonebmp1) {
                    if(this.choosestone.getIndex() == curstonebmp1.getIndex()) { //检测颜色是否相同
                        this.choosestone.moveAndBack(j*this.stonW, i*this.stonH);
                        curstonebmp1.moveAndBack(cj*this.stonW, ci*this.stonH);
                        return;
                    }
                    this.stonearray[i][j] = this.choosestone;
                    this.stonearray[ci][cj] = curstonebmp1;
                    var mc:StoneCallBack = new StoneCallBack(this.moveCallback, this, [i, j, ci, cj]);
                    this.choosestone.moveAndCheckStone(j*this.stonW, i*this.stonH, mc);
                    curstonebmp1.moveAndCheckStone(cj*this.stonW, ci*this.stonH, mc)
                }
            }
        }
    }

    private dropStone():void {
        var mc:StoneCallBack = new StoneCallBack(this.checkNeedRefresh, this);
        for(var j:number = 0; j < this.stonescol; j++) {
            for(var i:number = 0; i < this.stonesrow; i++) {
                var curstonbmp:StoneBmp = this.stonearray[this.stonesrow-i-1][j];
                if(!curstonbmp) {
                    this.doDropcolStone(this.stonesrow-i-1, j, mc);
                    break;
                }
            }
        }
    }

    private doDropcolStone(i:number, j:number, c:StoneCallBack):void {
        var dur:number = 0;
        for(var m:number = 0; m < i; m++) {
            var curstone:StoneBmp = this.stonearray[i-m-1][j];
            if(curstone) {
                curstone.moveStone(j*this.stonW, (i-m+dur)*this.stonH, c);
                this.stonearray[i-m+dur][j] = curstone;
                this.stonearray[i-m-1][j] = null;
            }
            else {
                dur++;
            }
        }

        for(var n:number = 0; n < (dur+1); n++) {
            var cindex:number = Math.floor(Math.random()*6);
            var nston:StoneBmp = StoneBmp.createStoneBmp(cindex);
            this.stonearray[dur-n][j] = nston;
            nston.setPostion(j*this.stonW, -(n+1)*this.stonH);
            nston.moveStone(j*this.stonW, (dur-n)*this.stonH, c);
            nston.attachParent(this.parent);
        }
    }

    private moveCallback(i:number, j:number, ci:number, cj:number):void {
        //console.log("in moveCallback i: "+i+" j: "+j+" ci: " + ci + " cj: "+cj);

        var d1:number = 0, d2:number = 0;
        if(i == ci) {
            if(j > cj) {
                d1 = 1;
                d2 = 3;
            }
            else {
                d1 = 3;
                d2 = 1;
            }
        }
        if(j == cj) {
            if(i > ci){
                d1 = 4;
                d2 = 2;
            }
            else {
                d1 = 2;
                d2 = 4;
            }
        }



        var specialpos:egret.Point[] = [];
        var delarr1:StoneBmp[] = this.destoryStone(i, j, d1);
        if(delarr1.length > 3) {
            specialpos.push(new egret.Point(i, j));
        }
        var delarr2:StoneBmp[] = this.destoryStone(ci, cj, d2);
        if(delarr2.length > 3) {
            specialpos.push(new egret.Point(ci, cj));
        }

        delarr1 = delarr1.concat(delarr2);
        var mc:StoneCallBack = new StoneCallBack(this.ondestoryAndAddSpecial, this, [delarr1, specialpos]);
        for(var l:number = 0; l < delarr1.length; l++) {
            var nstone:StoneBmp = delarr1[l];
            this.stonearray[nstone.getY()/this.stonH][nstone.getX()/this.stonW] = null;
            nstone.scaleDestory(mc);
        }


        if((delarr1.length > 0) || (delarr2.length > 0)) { //有消除的
            this.choosestone = null;
        }
        else { //没有可消除的
            var firststone:StoneBmp = this.stonearray[i][j];
            var secondstone:StoneBmp = this.stonearray[ci][cj];
            this.stonearray[i][j] = secondstone;
            this.stonearray[ci][cj] = firststone;
            firststone.moveStone(cj*this.stonW, ci*this.stonH);
            secondstone.moveStone(j*this.stonW, i*this.stonH);
        }
    }

    /**
     * 此时已经完成交换,开始检测销毁。
     *
     * @param i
     * @param j
     * @param d 交换的方向，该方向不需要检测 1：左， 2：上， 3：右， 4：下。
     */
    private destoryStone(i:number, j:number, d:number):StoneBmp[] {
        //console.log("i: "+i+" j: "+j+" d: "+d);
        var res = false;
        var delarr:StoneBmp[] = [];
        var curstone:StoneBmp = this.stonearray[i][j];
        var curindex = curstone.getIndex();
        // 1
        var stone_1_1:StoneBmp = null, stone_1_2:StoneBmp = null;
        var index_1_1:number = 0, index_1_2:number = 0;
        // 2
        var stone_2_1:StoneBmp = null, stone_2_2:StoneBmp = null;
        var index_2_1:number = 0, index_2_2:number = 0;
        // 3
        var stone_3_1:StoneBmp = null, stone_3_2:StoneBmp = null;
        var index_3_1:number = 0, index_3_2:number = 0;

        if(d == 1) {
            if(i > 0) {
                stone_1_1 = this.stonearray[i - 1][j];
                index_1_1 = stone_1_1.getIndex();
                if(i > 1) {
                    stone_1_2 = this.stonearray[i - 2][j];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if(i < (this.stonesrow - 1)) {
                stone_3_1 = this.stonearray[i + 1][j];
                index_3_1 = stone_3_1.getIndex();
                if(i < (this.stonesrow - 2)) {
                    stone_3_2 = this.stonearray[i + 2][j];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if(j < (this.stonescol - 1)) {
                stone_2_1 = this.stonearray[i][j + 1];
                index_2_1 = stone_2_1.getIndex();
                if(j < (this.stonescol - 2)) {
                    stone_2_2 = this.stonearray[i][j + 2];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        else if(d == 2) {
            if(j > 0) {
                stone_1_1 = this.stonearray[i][j - 1];
                index_1_1 = stone_1_1.getIndex();
                if(j > 1) {
                    stone_1_2 = this.stonearray[i][j - 2];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if(j < (this.stonescol - 1)) {
                stone_3_1 = this.stonearray[i][j+1];
                index_3_1 = stone_3_1.getIndex();
                if(j < (this.stonescol - 2)) {
                    stone_3_2 = this.stonearray[i][j+2];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if(i > 0) {
                stone_2_1 = this.stonearray[i - 1][j];
                index_2_1 = stone_2_1.getIndex();
                if(i > 1) {
                    stone_2_2 = this.stonearray[i - 2][j];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        else if(d == 3) {
            if(i > 0) {
                stone_1_1 = this.stonearray[i - 1][j];
                index_1_1 = stone_1_1.getIndex();
                if(i > 1) {
                    stone_1_2 = this.stonearray[i - 2][j];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if(i < (this.stonesrow - 1)) {
                stone_3_1 = this.stonearray[i + 1][j];
                index_3_1 = stone_3_1.getIndex();
                if(i < (this.stonesrow - 2)) {
                    stone_3_2 = this.stonearray[i + 2][j];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if(j > 0) {
                stone_2_1 = this.stonearray[i][j - 1];
                index_2_1 = stone_2_1.getIndex();
                if(j > 1) {
                    stone_2_2 = this.stonearray[i][j - 2];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        else if(d == 4) {
            if(j > 0) {
                stone_1_1 = this.stonearray[i][j-1];
                index_1_1 = stone_1_1.getIndex();
                if(j > 1) {
                    stone_1_2 = this.stonearray[i][j-2];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if(j < (this.stonescol - 1)) {
                stone_3_1 = this.stonearray[i][j+1];
                index_3_1 = stone_3_1.getIndex();
                if(j < (this.stonescol - 2)) {
                    stone_3_2 = this.stonearray[i][j+2];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if(i < (this.stonesrow - 1)) {
                stone_2_1 = this.stonearray[i+1][j];
                index_2_1 = stone_2_1.getIndex();
                if(i < (this.stonesrow - 2)) {
                    stone_2_2 = this.stonearray[i+2][j];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }

        if(stone_2_1 && stone_2_2) {
            if((index_2_1 == curindex) && (index_2_2 == curindex)) {
                res = true;
                delarr.push(stone_2_1);
                delarr.push(stone_2_2);
            }
        }
        //console.log("index_2_1: "+index_2_1+" index_2_2: "+index_2_2);
        //console.log("index_1_2: "+index_1_2+" index_1_1: "+index_1_1+" curindex: "+curindex+" index_3_1: "+index_3_1+ " index_3_2: "+index_3_2);
        if(stone_1_2 && stone_1_1 && stone_3_1 && stone_3_2) {
            //console.log("1");
            if((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
                delarr.push(stone_3_1);
            }
            else if((index_1_2 != curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if((index_1_2 != curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
            else if((index_1_2 != curindex) && (index_1_1 != curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex != index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
            else if((index_1_2 == curindex) && (index_1_1 != curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex != index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
        }
        else if(stone_1_2 && stone_1_1 && stone_3_1 && !stone_3_2) {
            //console.log("2");
            if((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex == index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
                delarr.push(stone_3_1);
            }
            else if((index_1_2 != curindex) && (index_1_1 == curindex) && (curindex == index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
            else if((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex != index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
        }
        else if(!stone_1_2 && stone_1_1 && stone_3_1 && stone_3_2) {
            //console.log("3");
            if((index_1_1 == curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if((index_1_1 == curindex) && (curindex == index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
            else if((index_1_1 != curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
        }
        else if(!stone_1_2 && stone_1_1 && stone_3_1 && !stone_3_2) {
            //console.log("4");
            if((index_1_1 == curindex) && (curindex == index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
        }
        else if(stone_1_2 && stone_1_1 && !stone_3_1 && !stone_3_2) {
            //console.log("5");
            if((index_1_2 == curindex) && (index_1_1 == curindex)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
        }
        else if(!stone_1_2 && !stone_1_1 && stone_3_1 && stone_3_2) {
            //console.log("6");
            if((curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
        }

        if(res) {
            delarr.push(curstone);

            //var mc:StoneCallBack;
            //if(delarr.length > 3) {
            //    mc = new StoneCallBack(this.ondestoryAndAddSpecial, this, [delarr, [new egret.Point(i, j)]]);
            //}
            //else {
            //    mc = new StoneCallBack(this.ondestoryStone, this, [delarr]);
            //}
            //for(var l:number = 0; l < delarr.length; l++) {
            //    var nstone:StoneBmp = delarr[l];
            //    this.stonearray[nstone.getY()/this.stonH][nstone.getX()/this.stonW] = null;
            //    nstone.scaleDestory(mc);
            //}
        }
        return delarr;
    }

    private ondestoryStone(delarr:StoneBmp[]):void {
        //console.dir(delarr);
        if(delarr && delarr.length > 0) {
            while(delarr.length) {
                var nstone:StoneBmp = delarr.shift();
                nstone.unAttachParent(this.parent);
                StoneBmp.destoryStoneBmp(nstone);
            }
            delarr = [];
        }
        this.dropStone();
    }

    private ondestoryAndAddSpecial(delarr:StoneBmp[], parr:egret.Point[]):void {
        //console.dir(delarr);
        if(delarr && delarr.length > 0) {
            while(delarr.length) {
                var nstone:StoneBmp = delarr.shift();
                nstone.unAttachParent(this.parent);
                StoneBmp.destoryStoneBmp(nstone);
            }
            delarr = [];
        }

        if(parr.length <= 0) {
            this.dropStone();
            return;
        }

        var mc:StoneCallBack = new StoneCallBack(this.dropStone, this);
        while(parr.length) {
            var curpoint:egret.Point = parr.shift();
            var specialstone:StoneBmp = StoneBmp.createStoneBmp(Math.floor(Math.random()*6));
            this.stonearray[curpoint.x][curpoint.y] = specialstone;
            specialstone.setPostion(curpoint.y*this.stonW, curpoint.x*this.stonH);
            specialstone.attachParentWidthSpecial(this.parent);
            specialstone.scaleShowBoom(mc);
        }
    }

    /**
     * 检测是否还有可以被消除的组合。
     *
     * @returns {boolean}
     */
    private checkNeedRefresh():boolean {
        //console.log("checkNeedRefresh ");


        var rowspecialarr:StoneBmp[] = [];
        var rowspecialarrE:any[] = [];

        var delston:StoneBmp[] = [];
        var cachearr:StoneBmp[] = [];
        var cacheindex:number = 0;
        for(var i:number = 0; i < this.stonesrow; i++) {
            cachearr = [];
            cacheindex = 0;
            for(var j:number = 0; j < this.stonescol; j++) {
                var curston:StoneBmp = this.stonearray[i][j];
                if(cacheindex != curston.getIndex()) {
                    cacheindex = curston.getIndex();
                    if(cachearr.length > 2) {
                        delston = delston.concat(cachearr);
                        rowspecialarr = rowspecialarr.concat(cachearr);
                        rowspecialarrE[rowspecialarrE.length] = cachearr.concat();
                    }
                    cachearr = [];
                }
                cachearr.push(curston);
            }
            if(cachearr.length > 2) {
                delston = delston.concat(cachearr);
                rowspecialarr = rowspecialarr.concat(cachearr);
                rowspecialarrE[rowspecialarrE.length] = cachearr.concat();
            }
        }



        var colspecialarr:StoneBmp[] = [];
        var colspecialarrE:any[] = [];
        cachearr = [];
        cacheindex = 0;
        for(var n:number = 0; n < this.stonescol; n++) {
            cachearr = [];
            cacheindex = 0;
            for(var m:number = 0; m < this.stonesrow; m++) {
                var cston:StoneBmp = this.stonearray[m][n];
                if(cacheindex != cston.getIndex()) {
                    cacheindex = cston.getIndex();
                    if(cachearr.length > 2) {
                        colspecialarr = colspecialarr.concat(cachearr);
                        colspecialarrE[colspecialarrE.length] = cachearr.concat();
                        while(cachearr.length) {
                            var dston:StoneBmp = cachearr.shift();
                            if(delston.indexOf(dston) < 0) {
                                delston.push(dston);
                            }
                        }
                    }
                    cachearr = [];
                }
                cachearr.push(cston);
            }
            if(cachearr.length > 2) {
                colspecialarr = colspecialarr.concat(cachearr);
                colspecialarrE[colspecialarrE.length] = cachearr.concat();
                while(cachearr.length) {
                    var dston:StoneBmp = cachearr.shift();
                    if(delston.indexOf(dston) < 0) {
                        delston.push(dston);
                    }
                }
            }
        }

        //console.dir(rowspecialarrE);
        //console.dir(colspecialarrE);


        var finalspecialarr:StoneBmp[] = [];
        for(var ci:number = 0; ci < colspecialarr.length; ci++) {
            var curcolarr1:StoneBmp = colspecialarr[ci];
            if(rowspecialarr.indexOf(curcolarr1) >= 0) {
                finalspecialarr.push(curcolarr1);
            }
        }

        var ccfinalspecialarr:StoneBmp[] = [];
        for(var cei:number = 0; cei < colspecialarrE.length; cei++) {
            var curcolarr2 = colspecialarrE[cei];
            var iscolcross:boolean = false;
            for(var fi:number = 0; fi < finalspecialarr.length; fi++) {
                if(curcolarr2.indexOf(finalspecialarr[fi]) >= 0) {
                    iscolcross = true;
                    break;
                }
            }
            if(!iscolcross && curcolarr2.length > 3) {
                ccfinalspecialarr.push(curcolarr2[0]);
            }
        }

        for(var rei:number = 0; rei < rowspecialarrE.length; rei++) {
            var currowarr3 = rowspecialarrE[rei];
            var isrowcross:boolean = false;
            for(var fi:number = 0; fi < finalspecialarr.length; fi++) {
                if(currowarr3.indexOf(finalspecialarr[fi]) >= 0) {
                    isrowcross = true;
                    break;
                }
            }
            if(!isrowcross && currowarr3.length > 3) {
                ccfinalspecialarr.push(currowarr3[0]);
            }
        }
        finalspecialarr = finalspecialarr.concat(ccfinalspecialarr);
        console.dir(finalspecialarr.concat());

        if(delston.length > 0) {
            //console.log("sth is NeedRefresh ");

            var mc:StoneCallBack;
            if(finalspecialarr.length > 0) {
                var specialpointarr:egret.Point[] = [];
                while(finalspecialarr.length) {
                    var curspecialpoint:StoneBmp = finalspecialarr.shift();
                    specialpointarr.push(new egret.Point(curspecialpoint.getY()/this.stonH, curspecialpoint.getX()/this.stonW));
                }
                mc = new StoneCallBack(this.ondestoryAndAddSpecial, this, [delston, specialpointarr]);
            }
            else {
                mc = new StoneCallBack(this.ondestoryStone, this, [delston]);
            }


            //var mc:StoneCallBack = new StoneCallBack(this.ondestoryStone, this, [delston]);

            for(var l:number = 0; l < delston.length; l++) {
                var nstone:StoneBmp = delston[l];
                this.stonearray[nstone.getY()/this.stonH][nstone.getX()/this.stonW] = null;
                nstone.scaleDestory(mc);
            }
        }
        else {
            this.checkRefresh();
        }
        return false;
    }

    private checkRefresh():void {
        var isneed:boolean = true;
        var cacheindex:number = 0;
        var i:number = 0, j:number = 0;
        var rc:number = 1;
        do{
            if(rc == 1) {
                if(j == this.stonescol) {
                    j = 0;
                    i++
                    cacheindex = 0;
                    if(i == this.stonesrow) {
                        rc = 2;
                        i = 0;
                        j = 0;
                    }
                }
            }
            else if(rc == 2) {
                if(i == this.stonesrow) {
                    i = 0;
                    j++;
                    cacheindex = 0;
                    if(j == this.stonescol) {
                        break;
                    }
                }
            }


            isneed = this.checkEnableDestory(i, j, rc);
            if(isneed) {
                isneed = this.checkEnableDestory2(i, j, rc);
            }
            //console.log("isneed: " +isneed+" i: " +i +" j: "+j);

            //var curston:StoneBmp = this.stonearray[i][j];
            //if(cacheindex != curston.getIndex()) {
            //    cacheindex = curston.getIndex();
            //}
            //else {
            //    isneed = this.checkEnableDestory(i, j, rc);
            //    console.log("isneed: " +isneed+" i: " +i +" j: "+j);
            //}

            if(rc == 1) {
                j++;
            }
            else if(rc == 2) {
                i++;
            }
        }
        while(isneed);

        if(isneed) {
            this.refreshStone();
        }
    }

    /**
     *  验证两个相同的在一起，且能被消除的情况是否存在
     * @param i
     * @param j
     * @param d
     * @returns {boolean}
     */
    private checkEnableDestory(i:number, j:number, d:number):boolean {
        var curindex:number = this.stonearray[i][j].getIndex();
        if(d == 1) {
            if(j == 0) {
                return true;
            }
            else {
                var proindex:number = this.stonearray[i][j - 1].getIndex();
                if(proindex != curindex) {
                    return true;
                }
            }
        }
        else if(d == 2) {
            if(i == 0) {
                return true;
            }
            else {
                var proindex:number = this.stonearray[i - 1][j].getIndex();
                if(proindex != curindex) {
                    return true;
                }
            }
        }

        var stone_1_1:StoneBmp = null, stone_1_2:StoneBmp = null, stone_1_3:StoneBmp = null;
        var stone_2_1:StoneBmp = null, stone_2_2:StoneBmp = null, stone_2_3:StoneBmp = null;
        if(d == 1) {
            if((i - 1) >= 0 && (j - 2) >= 0) {
                stone_1_1 = this.stonearray[i - 1][j - 2];
                if(curindex == stone_1_1.getIndex()) {
                    return false;
                }
            }
            if((j - 3) >= 0) {
                stone_1_2 = this.stonearray[i][j - 3];
                if(curindex == stone_1_2.getIndex()) {
                    return false;
                }
            }
            if((i + 1) < this.stonesrow && (j - 2) >= 0) {
                stone_1_3 = this.stonearray[i + 1][j - 2];
                if(curindex == stone_1_3.getIndex()) {
                    return false;
                }
            }
            if((i - 1) >= 0 && (j + 1) < this.stonescol) {
                stone_2_1 = this.stonearray[i - 1][j + 1];
                if(curindex == stone_2_1.getIndex()) {
                    return false;
                }
            }
            if((j + 2) < this.stonescol) {
                stone_2_2 = this.stonearray[i][j + 2];
                if(curindex == stone_2_2.getIndex()) {
                    return false;
                }
            }
            if((i + 1) < this.stonesrow && (j + 1) < this.stonescol) {
                stone_2_3 = this.stonearray[i + 1][j + 1];
                if(curindex == stone_2_3.getIndex()) {
                    return false;
                }
            }
        }
        else if(d == 2) {
            if((i - 2) >= 0 && (j - 1) >= 0) {
                stone_1_1 = this.stonearray[i - 2][j - 1];
                if(curindex == stone_1_1.getIndex()) {
                    return false;
                }
            }
            if((i - 3) >= 0) {
                stone_1_2 = this.stonearray[i - 3][j];
                if(curindex == stone_1_2.getIndex()) {
                    return false;
                }
            }
            if((i - 2) >= 0 && (j + 1) < this.stonescol) {
                stone_1_3 = this.stonearray[i - 2][j + 1];
                if(curindex == stone_1_3.getIndex()) {
                    return false;
                }
            }
            if((i + 1) < this.stonesrow && (j - 1) >= 0) {
                stone_2_1 = this.stonearray[i + 1][j - 1];
                if(curindex == stone_2_1.getIndex()) {
                    return false;
                }
            }
            if((i + 2) < this.stonescol) {
                stone_2_2 = this.stonearray[i + 2][j];
                if(curindex == stone_2_2.getIndex()) {
                    return false;
                }
            }
            if((i + 1) < this.stonesrow && (j + 1) < this.stonescol) {
                stone_2_3 = this.stonearray[i + 1][j + 1];
                if(curindex == stone_2_3.getIndex()) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 验证三个相同，呈品字形能被消除的情况是否存在
     * @param i
     * @param j
     * @param d
     * @returns {boolean}
     */
    private checkEnableDestory2(i:number, j:number, d:number):boolean {
        var curindex:number = this.stonearray[i][j].getIndex();

        if(d == 1) {
            if(j == 0 || j == 1) {
                return true;
            }
            else {
                var proindex:number = this.stonearray[i][j - 2].getIndex();
                if(proindex != curindex) {
                    return true;
                }
            }
        }
        else if(d == 2) {
            if(i == 0 || i == 1) {
                return true;
            }
            else {
                var proindex:number = this.stonearray[i - 2][j].getIndex();
                if(proindex != curindex) {
                    return true;
                }
            }
        }

        if(d == 1) {
            if((i - 1) >= 0) {
                var nexindex:number = this.stonearray[i - 1][j - 1].getIndex();
                if(nexindex == curindex) {
                    return false;
                }
            }

            if((i + 1) < this.stonesrow) {
                var nexindex:number = this.stonearray[i + 1][j - 1].getIndex();
                if(nexindex == curindex) {
                    return false;
                }
            }
        }
        else if(d == 2) {
            if((j - 1) >= 0) {
                var nexindex:number = this.stonearray[i - 1][j - 1].getIndex();
                if(nexindex == curindex) {
                    return false;
                }
            }

            if((j + 1) < this.stonescol) {
                var nexindex:number = this.stonearray[i - 1][j + 1].getIndex();
                if(nexindex == curindex) {
                    return false;
                }
            }
        }
        return true;
    }

    private refreshStone():void {
        console.log("refreshStone ...");
        var mc:StoneCallBack = new StoneCallBack(this.onRefreshStone, this);
        for(var i:number = 0; i < this.stonesrow; i++) {
            for(var j:number = 0; j < this.stonescol; j++) {
                var curstone:StoneBmp = this.stonearray[i][j];
                curstone.scaleDestory(mc);
            }
        }
    }

    private onRefreshStone():void {
        this.clearStoneArr();
        this.stonearray = [];
        for(var i:number = 0; i < this.stonesrow; i++) {
            this.stonearray[i] = [];
            for(var j:number = 0; j < this.stonescol; j++) {
                var curstone:number = Math.floor(Math.random()*6);
                var curstonbmp:StoneBmp = StoneBmp.createStoneBmp(curstone);
                this.stonearray[i][j] = curstonbmp;
                curstonbmp.setPostion(j*this.stonW, i*this.stonH);
                curstonbmp.attachParent(this.parent);
            }
        }
        this.checkNeedRefresh();
    }

    private clearStoneArr():void {
        for(var i:number = 0; i < this.stonesrow; i++) {
            for(var j:number = 0; j < this.stonescol; j++) {
                var curstone:StoneBmp = this.stonearray[i][j];
                this.stonearray[i][j] = null;
                curstone.unAttachParent(this.parent);
                StoneBmp.destoryStoneBmp(curstone);
            }
        }
    }
}