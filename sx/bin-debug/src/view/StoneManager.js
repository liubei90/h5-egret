/**
 * Created by Administrator on 7/6 0006.
 */
var StoneManager = (function () {
    function StoneManager() {
        this.stonearray = [];
        this.stonesrow = 8;
        this.stonescol = 6;
        this.stonW = 106;
        this.stonH = 106;
        this.touchpostion = new egret.Point();
        this.btouchone = false;
    }
    var __egretProto__ = StoneManager.prototype;
    StoneManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new StoneManager();
        }
        return this.instance;
    };
    __egretProto__.setContext = function (p) {
        this.parent = p;
    };
    __egretProto__.initStone = function () {
        this.stonearray = [];
        for (var i = 0; i < this.stonesrow; i++) {
            this.stonearray[i] = [];
            for (var j = 0; j < this.stonescol; j++) {
                var curstone = Math.floor(Math.random() * 6);
                var curstonbmp = StoneBmp.createStoneBmp(curstone);
                this.stonearray[i][j] = curstonbmp;
                curstonbmp.setPostion(j * this.stonW, i * this.stonH);
                curstonbmp.attachParent(this.parent);
            }
        }
        this.checkNeedRefresh();
    };
    __egretProto__.initStone2 = function () {
        var map = [[0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1]];
        this.stonearray = [];
        for (var i = 0; i < this.stonesrow; i++) {
            this.stonearray[i] = [];
            for (var j = 0; j < this.stonescol; j++) {
                var curstonbmp = StoneBmp.createStoneBmp(map[i][j]);
                this.stonearray[i][j] = curstonbmp;
                curstonbmp.setPostion(j * this.stonW, i * this.stonH);
                curstonbmp.attachParent(this.parent);
            }
        }
        this.checkNeedRefresh();
    };
    __egretProto__.onTouchBegin = function (x, y) {
        this.btouchone = true;
        this.touchpostion.x = x;
        this.touchpostion.y = y;
        var i = Math.floor(y / this.stonH);
        var j = Math.floor(x / this.stonW);
        var curstonebmp1 = this.stonearray[i][j];
        if (!this.choosestone) {
            this.choosestone = curstonebmp1;
        }
        else {
            if (this.choosestone == curstonebmp1) {
                ;
            }
            else {
                var ci = this.choosestone.getY() / this.stonH;
                var cj = this.choosestone.getX() / this.stonW;
                if ((Math.abs(ci - i) == 1 && cj == j) || (Math.abs(cj - j) == 1 && ci == i)) {
                    if (this.choosestone.getIndex() == curstonebmp1.getIndex()) {
                        this.choosestone.moveAndBack(j * this.stonW, i * this.stonH);
                        curstonebmp1.moveAndBack(cj * this.stonW, ci * this.stonH);
                        return;
                    }
                    this.stonearray[i][j] = this.choosestone;
                    this.stonearray[ci][cj] = curstonebmp1;
                    var mc = new StoneCallBack(this.moveCallback, this, [i, j, ci, cj]);
                    this.choosestone.moveAndCheckStone(j * this.stonW, i * this.stonH, mc);
                    curstonebmp1.moveAndCheckStone(cj * this.stonW, ci * this.stonH, mc);
                }
                else {
                    this.choosestone = curstonebmp1;
                }
            }
        }
    };
    __egretProto__.onTouchMove = function (x, y) {
        if (!this.btouchone) {
            return;
        }
        if (this.choosestone && this.touchpostion) {
            if (Math.abs(x - this.touchpostion.x) > 30 || Math.abs(y - this.touchpostion.y) > 30) {
                this.btouchone = false;
                var ci = this.choosestone.getY() / this.stonH;
                var cj = this.choosestone.getX() / this.stonW;
                var curstonebmp1;
                var i, j;
                if (Math.abs(x - this.touchpostion.x) > Math.abs(y - this.touchpostion.y)) {
                    if ((x - this.touchpostion.x) > 0) {
                        if (cj < (this.stonescol - 1)) {
                            i = ci;
                            j = cj + 1;
                            curstonebmp1 = this.stonearray[i][j]; //��
                        }
                    }
                    else if ((x - this.touchpostion.x) < 0) {
                        if (cj > 0) {
                            i = ci;
                            j = cj - 1;
                            curstonebmp1 = this.stonearray[i][j]; //��
                        }
                    }
                }
                else {
                    if ((y - this.touchpostion.y) > 0) {
                        if (ci < (this.stonesrow - 1)) {
                            i = ci + 1;
                            j = cj;
                            curstonebmp1 = this.stonearray[i][j]; //��
                        }
                    }
                    else if ((y - this.touchpostion.y) < 0) {
                        if (ci > 0) {
                            i = ci - 1;
                            j = cj;
                            curstonebmp1 = this.stonearray[i][j]; //��
                        }
                    }
                }
                if (curstonebmp1) {
                    if (this.choosestone.getIndex() == curstonebmp1.getIndex()) {
                        this.choosestone.moveAndBack(j * this.stonW, i * this.stonH);
                        curstonebmp1.moveAndBack(cj * this.stonW, ci * this.stonH);
                        return;
                    }
                    this.stonearray[i][j] = this.choosestone;
                    this.stonearray[ci][cj] = curstonebmp1;
                    var mc = new StoneCallBack(this.moveCallback, this, [i, j, ci, cj]);
                    this.choosestone.moveAndCheckStone(j * this.stonW, i * this.stonH, mc);
                    curstonebmp1.moveAndCheckStone(cj * this.stonW, ci * this.stonH, mc);
                }
            }
        }
    };
    __egretProto__.dropStone = function () {
        var mc = new StoneCallBack(this.checkNeedRefresh, this);
        for (var j = 0; j < this.stonescol; j++) {
            for (var i = 0; i < this.stonesrow; i++) {
                var curstonbmp = this.stonearray[this.stonesrow - i - 1][j];
                if (!curstonbmp) {
                    this.doDropcolStone(this.stonesrow - i - 1, j, mc);
                    break;
                }
            }
        }
    };
    __egretProto__.doDropcolStone = function (i, j, c) {
        var dur = 0;
        for (var m = 0; m < i; m++) {
            var curstone = this.stonearray[i - m - 1][j];
            if (curstone) {
                curstone.moveStone(j * this.stonW, (i - m + dur) * this.stonH, c);
                this.stonearray[i - m + dur][j] = curstone;
                this.stonearray[i - m - 1][j] = null;
            }
            else {
                dur++;
            }
        }
        for (var n = 0; n < (dur + 1); n++) {
            var cindex = Math.floor(Math.random() * 6);
            var nston = StoneBmp.createStoneBmp(cindex);
            this.stonearray[dur - n][j] = nston;
            nston.setPostion(j * this.stonW, -(n + 1) * this.stonH);
            nston.moveStone(j * this.stonW, (dur - n) * this.stonH, c);
            nston.attachParent(this.parent);
        }
    };
    __egretProto__.moveCallback = function (i, j, ci, cj) {
        //console.log("in moveCallback i: "+i+" j: "+j+" ci: " + ci + " cj: "+cj);
        var d1 = 0, d2 = 0;
        if (i == ci) {
            if (j > cj) {
                d1 = 1;
                d2 = 3;
            }
            else {
                d1 = 3;
                d2 = 1;
            }
        }
        if (j == cj) {
            if (i > ci) {
                d1 = 4;
                d2 = 2;
            }
            else {
                d1 = 2;
                d2 = 4;
            }
        }
        var specialpos = [];
        var delarr1 = this.destoryStone(i, j, d1);
        if (delarr1.length > 3) {
            specialpos.push(new egret.Point(i, j));
        }
        var delarr2 = this.destoryStone(ci, cj, d2);
        if (delarr2.length > 3) {
            specialpos.push(new egret.Point(ci, cj));
        }
        delarr1 = delarr1.concat(delarr2);
        var mc = new StoneCallBack(this.ondestoryAndAddSpecial, this, [delarr1, specialpos]);
        for (var l = 0; l < delarr1.length; l++) {
            var nstone = delarr1[l];
            this.stonearray[nstone.getY() / this.stonH][nstone.getX() / this.stonW] = null;
            nstone.scaleDestory(mc);
        }
        if ((delarr1.length > 0) || (delarr2.length > 0)) {
            this.choosestone = null;
        }
        else {
            var firststone = this.stonearray[i][j];
            var secondstone = this.stonearray[ci][cj];
            this.stonearray[i][j] = secondstone;
            this.stonearray[ci][cj] = firststone;
            firststone.moveStone(cj * this.stonW, ci * this.stonH);
            secondstone.moveStone(j * this.stonW, i * this.stonH);
        }
    };
    /**
     * ��ʱ�Ѿ����ɽ���,��ʼ�������١�
     *
     * @param i
     * @param j
     * @param d �����ķ��򣬸÷�������Ҫ���� 1������ 2���ϣ� 3���ң� 4���¡�
     */
    __egretProto__.destoryStone = function (i, j, d) {
        //console.log("i: "+i+" j: "+j+" d: "+d);
        var res = false;
        var delarr = [];
        var curstone = this.stonearray[i][j];
        var curindex = curstone.getIndex();
        // 1
        var stone_1_1 = null, stone_1_2 = null;
        var index_1_1 = 0, index_1_2 = 0;
        // 2
        var stone_2_1 = null, stone_2_2 = null;
        var index_2_1 = 0, index_2_2 = 0;
        // 3
        var stone_3_1 = null, stone_3_2 = null;
        var index_3_1 = 0, index_3_2 = 0;
        if (d == 1) {
            if (i > 0) {
                stone_1_1 = this.stonearray[i - 1][j];
                index_1_1 = stone_1_1.getIndex();
                if (i > 1) {
                    stone_1_2 = this.stonearray[i - 2][j];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if (i < (this.stonesrow - 1)) {
                stone_3_1 = this.stonearray[i + 1][j];
                index_3_1 = stone_3_1.getIndex();
                if (i < (this.stonesrow - 2)) {
                    stone_3_2 = this.stonearray[i + 2][j];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if (j < (this.stonescol - 1)) {
                stone_2_1 = this.stonearray[i][j + 1];
                index_2_1 = stone_2_1.getIndex();
                if (j < (this.stonescol - 2)) {
                    stone_2_2 = this.stonearray[i][j + 2];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        else if (d == 2) {
            if (j > 0) {
                stone_1_1 = this.stonearray[i][j - 1];
                index_1_1 = stone_1_1.getIndex();
                if (j > 1) {
                    stone_1_2 = this.stonearray[i][j - 2];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if (j < (this.stonescol - 1)) {
                stone_3_1 = this.stonearray[i][j + 1];
                index_3_1 = stone_3_1.getIndex();
                if (j < (this.stonescol - 2)) {
                    stone_3_2 = this.stonearray[i][j + 2];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if (i > 0) {
                stone_2_1 = this.stonearray[i - 1][j];
                index_2_1 = stone_2_1.getIndex();
                if (i > 1) {
                    stone_2_2 = this.stonearray[i - 2][j];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        else if (d == 3) {
            if (i > 0) {
                stone_1_1 = this.stonearray[i - 1][j];
                index_1_1 = stone_1_1.getIndex();
                if (i > 1) {
                    stone_1_2 = this.stonearray[i - 2][j];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if (i < (this.stonesrow - 1)) {
                stone_3_1 = this.stonearray[i + 1][j];
                index_3_1 = stone_3_1.getIndex();
                if (i < (this.stonesrow - 2)) {
                    stone_3_2 = this.stonearray[i + 2][j];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if (j > 0) {
                stone_2_1 = this.stonearray[i][j - 1];
                index_2_1 = stone_2_1.getIndex();
                if (j > 1) {
                    stone_2_2 = this.stonearray[i][j - 2];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        else if (d == 4) {
            if (j > 0) {
                stone_1_1 = this.stonearray[i][j - 1];
                index_1_1 = stone_1_1.getIndex();
                if (j > 1) {
                    stone_1_2 = this.stonearray[i][j - 2];
                    index_1_2 = stone_1_2.getIndex();
                }
            }
            if (j < (this.stonescol - 1)) {
                stone_3_1 = this.stonearray[i][j + 1];
                index_3_1 = stone_3_1.getIndex();
                if (j < (this.stonescol - 2)) {
                    stone_3_2 = this.stonearray[i][j + 2];
                    index_3_2 = stone_3_2.getIndex();
                }
            }
            if (i < (this.stonesrow - 1)) {
                stone_2_1 = this.stonearray[i + 1][j];
                index_2_1 = stone_2_1.getIndex();
                if (i < (this.stonesrow - 2)) {
                    stone_2_2 = this.stonearray[i + 2][j];
                    index_2_2 = stone_2_2.getIndex();
                }
            }
        }
        if (stone_2_1 && stone_2_2) {
            if ((index_2_1 == curindex) && (index_2_2 == curindex)) {
                res = true;
                delarr.push(stone_2_1);
                delarr.push(stone_2_2);
            }
        }
        //console.log("index_2_1: "+index_2_1+" index_2_2: "+index_2_2);
        //console.log("index_1_2: "+index_1_2+" index_1_1: "+index_1_1+" curindex: "+curindex+" index_3_1: "+index_3_1+ " index_3_2: "+index_3_2);
        if (stone_1_2 && stone_1_1 && stone_3_1 && stone_3_2) {
            //console.log("1");
            if ((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if ((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
                delarr.push(stone_3_1);
            }
            else if ((index_1_2 != curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if ((index_1_2 != curindex) && (index_1_1 == curindex) && (curindex == index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
            else if ((index_1_2 != curindex) && (index_1_1 != curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if ((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex != index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
            else if ((index_1_2 == curindex) && (index_1_1 != curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if ((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex != index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
        }
        else if (stone_1_2 && stone_1_1 && stone_3_1 && !stone_3_2) {
            //console.log("2");
            if ((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex == index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
                delarr.push(stone_3_1);
            }
            else if ((index_1_2 != curindex) && (index_1_1 == curindex) && (curindex == index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
            else if ((index_1_2 == curindex) && (index_1_1 == curindex) && (curindex != index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
        }
        else if (!stone_1_2 && stone_1_1 && stone_3_1 && stone_3_2) {
            //console.log("3");
            if ((index_1_1 == curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
            else if ((index_1_1 == curindex) && (curindex == index_3_1) && (curindex != index_3_2)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
            else if ((index_1_1 != curindex) && (curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
        }
        else if (!stone_1_2 && stone_1_1 && stone_3_1 && !stone_3_2) {
            //console.log("4");
            if ((index_1_1 == curindex) && (curindex == index_3_1)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_3_1);
            }
        }
        else if (stone_1_2 && stone_1_1 && !stone_3_1 && !stone_3_2) {
            //console.log("5");
            if ((index_1_2 == curindex) && (index_1_1 == curindex)) {
                res = true;
                delarr.push(stone_1_1);
                delarr.push(stone_1_2);
            }
        }
        else if (!stone_1_2 && !stone_1_1 && stone_3_1 && stone_3_2) {
            //console.log("6");
            if ((curindex == index_3_1) && (curindex == index_3_2)) {
                res = true;
                delarr.push(stone_3_1);
                delarr.push(stone_3_2);
            }
        }
        if (res) {
            delarr.push(curstone);
        }
        return delarr;
    };
    __egretProto__.ondestoryStone = function (delarr) {
        //console.dir(delarr);
        if (delarr && delarr.length > 0) {
            while (delarr.length) {
                var nstone = delarr.shift();
                nstone.unAttachParent(this.parent);
                StoneBmp.destoryStoneBmp(nstone);
            }
            delarr = [];
        }
        this.dropStone();
    };
    __egretProto__.ondestoryAndAddSpecial = function (delarr, parr) {
        //console.dir(delarr);
        if (delarr && delarr.length > 0) {
            while (delarr.length) {
                var nstone = delarr.shift();
                nstone.unAttachParent(this.parent);
                StoneBmp.destoryStoneBmp(nstone);
            }
            delarr = [];
        }
        if (parr.length <= 0) {
            this.dropStone();
            return;
        }
        var mc = new StoneCallBack(this.dropStone, this);
        while (parr.length) {
            var curpoint = parr.shift();
            var specialstone = StoneBmp.createStoneBmp(Math.floor(Math.random() * 6));
            this.stonearray[curpoint.x][curpoint.y] = specialstone;
            specialstone.setPostion(curpoint.y * this.stonW, curpoint.x * this.stonH);
            specialstone.attachParentWidthSpecial(this.parent);
            specialstone.scaleShowBoom(mc);
        }
    };
    /**
     * �����Ƿ����п��Ա����������ϡ�
     *
     * @returns {boolean}
     */
    __egretProto__.checkNeedRefresh = function () {
        //console.log("checkNeedRefresh ");
        var rowspecialarr = [];
        var rowspecialarrE = [];
        var delston = [];
        var cachearr = [];
        var cacheindex = 0;
        for (var i = 0; i < this.stonesrow; i++) {
            cachearr = [];
            cacheindex = 0;
            for (var j = 0; j < this.stonescol; j++) {
                var curston = this.stonearray[i][j];
                if (cacheindex != curston.getIndex()) {
                    cacheindex = curston.getIndex();
                    if (cachearr.length > 2) {
                        delston = delston.concat(cachearr);
                        rowspecialarr = rowspecialarr.concat(cachearr);
                        rowspecialarrE[rowspecialarrE.length] = cachearr.concat();
                    }
                    cachearr = [];
                }
                cachearr.push(curston);
            }
            if (cachearr.length > 2) {
                delston = delston.concat(cachearr);
                rowspecialarr = rowspecialarr.concat(cachearr);
                rowspecialarrE[rowspecialarrE.length] = cachearr.concat();
            }
        }
        var colspecialarr = [];
        var colspecialarrE = [];
        cachearr = [];
        cacheindex = 0;
        for (var n = 0; n < this.stonescol; n++) {
            cachearr = [];
            cacheindex = 0;
            for (var m = 0; m < this.stonesrow; m++) {
                var cston = this.stonearray[m][n];
                if (cacheindex != cston.getIndex()) {
                    cacheindex = cston.getIndex();
                    if (cachearr.length > 2) {
                        colspecialarr = colspecialarr.concat(cachearr);
                        colspecialarrE[colspecialarrE.length] = cachearr.concat();
                        while (cachearr.length) {
                            var dston = cachearr.shift();
                            if (delston.indexOf(dston) < 0) {
                                delston.push(dston);
                            }
                        }
                    }
                    cachearr = [];
                }
                cachearr.push(cston);
            }
            if (cachearr.length > 2) {
                colspecialarr = colspecialarr.concat(cachearr);
                colspecialarrE[colspecialarrE.length] = cachearr.concat();
                while (cachearr.length) {
                    var dston = cachearr.shift();
                    if (delston.indexOf(dston) < 0) {
                        delston.push(dston);
                    }
                }
            }
        }
        //console.dir(rowspecialarrE);
        //console.dir(colspecialarrE);
        var finalspecialarr = [];
        for (var ci = 0; ci < colspecialarr.length; ci++) {
            var curcolarr1 = colspecialarr[ci];
            if (rowspecialarr.indexOf(curcolarr1) >= 0) {
                finalspecialarr.push(curcolarr1);
            }
        }
        var ccfinalspecialarr = [];
        for (var cei = 0; cei < colspecialarrE.length; cei++) {
            var curcolarr2 = colspecialarrE[cei];
            var iscolcross = false;
            for (var fi = 0; fi < finalspecialarr.length; fi++) {
                if (curcolarr2.indexOf(finalspecialarr[fi]) >= 0) {
                    iscolcross = true;
                    break;
                }
            }
            if (!iscolcross && curcolarr2.length > 3) {
                ccfinalspecialarr.push(curcolarr2[0]);
            }
        }
        for (var rei = 0; rei < rowspecialarrE.length; rei++) {
            var currowarr3 = rowspecialarrE[rei];
            var isrowcross = false;
            for (var fi = 0; fi < finalspecialarr.length; fi++) {
                if (currowarr3.indexOf(finalspecialarr[fi]) >= 0) {
                    isrowcross = true;
                    break;
                }
            }
            if (!isrowcross && currowarr3.length > 3) {
                ccfinalspecialarr.push(currowarr3[0]);
            }
        }
        finalspecialarr = finalspecialarr.concat(ccfinalspecialarr);
        console.dir(finalspecialarr.concat());
        if (delston.length > 0) {
            //console.log("sth is NeedRefresh ");
            var mc;
            if (finalspecialarr.length > 0) {
                var specialpointarr = [];
                while (finalspecialarr.length) {
                    var curspecialpoint = finalspecialarr.shift();
                    specialpointarr.push(new egret.Point(curspecialpoint.getY() / this.stonH, curspecialpoint.getX() / this.stonW));
                }
                mc = new StoneCallBack(this.ondestoryAndAddSpecial, this, [delston, specialpointarr]);
            }
            else {
                mc = new StoneCallBack(this.ondestoryStone, this, [delston]);
            }
            for (var l = 0; l < delston.length; l++) {
                var nstone = delston[l];
                this.stonearray[nstone.getY() / this.stonH][nstone.getX() / this.stonW] = null;
                nstone.scaleDestory(mc);
            }
        }
        else {
            this.checkRefresh();
        }
        return false;
    };
    __egretProto__.checkRefresh = function () {
        var isneed = true;
        var cacheindex = 0;
        var i = 0, j = 0;
        var rc = 1;
        do {
            if (rc == 1) {
                if (j == this.stonescol) {
                    j = 0;
                    i++;
                    cacheindex = 0;
                    if (i == this.stonesrow) {
                        rc = 2;
                        i = 0;
                        j = 0;
                    }
                }
            }
            else if (rc == 2) {
                if (i == this.stonesrow) {
                    i = 0;
                    j++;
                    cacheindex = 0;
                    if (j == this.stonescol) {
                        break;
                    }
                }
            }
            isneed = this.checkEnableDestory(i, j, rc);
            if (isneed) {
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
            if (rc == 1) {
                j++;
            }
            else if (rc == 2) {
                i++;
            }
        } while (isneed);
        if (isneed) {
            this.refreshStone();
        }
    };
    /**
     *  ��֤������ͬ����һ�������ܱ������������Ƿ�����
     * @param i
     * @param j
     * @param d
     * @returns {boolean}
     */
    __egretProto__.checkEnableDestory = function (i, j, d) {
        var curindex = this.stonearray[i][j].getIndex();
        if (d == 1) {
            if (j == 0) {
                return true;
            }
            else {
                var proindex = this.stonearray[i][j - 1].getIndex();
                if (proindex != curindex) {
                    return true;
                }
            }
        }
        else if (d == 2) {
            if (i == 0) {
                return true;
            }
            else {
                var proindex = this.stonearray[i - 1][j].getIndex();
                if (proindex != curindex) {
                    return true;
                }
            }
        }
        var stone_1_1 = null, stone_1_2 = null, stone_1_3 = null;
        var stone_2_1 = null, stone_2_2 = null, stone_2_3 = null;
        if (d == 1) {
            if ((i - 1) >= 0 && (j - 2) >= 0) {
                stone_1_1 = this.stonearray[i - 1][j - 2];
                if (curindex == stone_1_1.getIndex()) {
                    return false;
                }
            }
            if ((j - 3) >= 0) {
                stone_1_2 = this.stonearray[i][j - 3];
                if (curindex == stone_1_2.getIndex()) {
                    return false;
                }
            }
            if ((i + 1) < this.stonesrow && (j - 2) >= 0) {
                stone_1_3 = this.stonearray[i + 1][j - 2];
                if (curindex == stone_1_3.getIndex()) {
                    return false;
                }
            }
            if ((i - 1) >= 0 && (j + 1) < this.stonescol) {
                stone_2_1 = this.stonearray[i - 1][j + 1];
                if (curindex == stone_2_1.getIndex()) {
                    return false;
                }
            }
            if ((j + 2) < this.stonescol) {
                stone_2_2 = this.stonearray[i][j + 2];
                if (curindex == stone_2_2.getIndex()) {
                    return false;
                }
            }
            if ((i + 1) < this.stonesrow && (j + 1) < this.stonescol) {
                stone_2_3 = this.stonearray[i + 1][j + 1];
                if (curindex == stone_2_3.getIndex()) {
                    return false;
                }
            }
        }
        else if (d == 2) {
            if ((i - 2) >= 0 && (j - 1) >= 0) {
                stone_1_1 = this.stonearray[i - 2][j - 1];
                if (curindex == stone_1_1.getIndex()) {
                    return false;
                }
            }
            if ((i - 3) >= 0) {
                stone_1_2 = this.stonearray[i - 3][j];
                if (curindex == stone_1_2.getIndex()) {
                    return false;
                }
            }
            if ((i - 2) >= 0 && (j + 1) < this.stonescol) {
                stone_1_3 = this.stonearray[i - 2][j + 1];
                if (curindex == stone_1_3.getIndex()) {
                    return false;
                }
            }
            if ((i + 1) < this.stonesrow && (j - 1) >= 0) {
                stone_2_1 = this.stonearray[i + 1][j - 1];
                if (curindex == stone_2_1.getIndex()) {
                    return false;
                }
            }
            if ((i + 2) < this.stonescol) {
                stone_2_2 = this.stonearray[i + 2][j];
                if (curindex == stone_2_2.getIndex()) {
                    return false;
                }
            }
            if ((i + 1) < this.stonesrow && (j + 1) < this.stonescol) {
                stone_2_3 = this.stonearray[i + 1][j + 1];
                if (curindex == stone_2_3.getIndex()) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * ��֤������ͬ����Ʒ�����ܱ������������Ƿ�����
     * @param i
     * @param j
     * @param d
     * @returns {boolean}
     */
    __egretProto__.checkEnableDestory2 = function (i, j, d) {
        var curindex = this.stonearray[i][j].getIndex();
        if (d == 1) {
            if (j == 0 || j == 1) {
                return true;
            }
            else {
                var proindex = this.stonearray[i][j - 2].getIndex();
                if (proindex != curindex) {
                    return true;
                }
            }
        }
        else if (d == 2) {
            if (i == 0 || i == 1) {
                return true;
            }
            else {
                var proindex = this.stonearray[i - 2][j].getIndex();
                if (proindex != curindex) {
                    return true;
                }
            }
        }
        if (d == 1) {
            if ((i - 1) >= 0) {
                var nexindex = this.stonearray[i - 1][j - 1].getIndex();
                if (nexindex == curindex) {
                    return false;
                }
            }
            if ((i + 1) < this.stonesrow) {
                var nexindex = this.stonearray[i + 1][j - 1].getIndex();
                if (nexindex == curindex) {
                    return false;
                }
            }
        }
        else if (d == 2) {
            if ((j - 1) >= 0) {
                var nexindex = this.stonearray[i - 1][j - 1].getIndex();
                if (nexindex == curindex) {
                    return false;
                }
            }
            if ((j + 1) < this.stonescol) {
                var nexindex = this.stonearray[i - 1][j + 1].getIndex();
                if (nexindex == curindex) {
                    return false;
                }
            }
        }
        return true;
    };
    __egretProto__.refreshStone = function () {
        console.log("refreshStone ...");
        var mc = new StoneCallBack(this.onRefreshStone, this);
        for (var i = 0; i < this.stonesrow; i++) {
            for (var j = 0; j < this.stonescol; j++) {
                var curstone = this.stonearray[i][j];
                curstone.scaleDestory(mc);
            }
        }
    };
    __egretProto__.onRefreshStone = function () {
        this.clearStoneArr();
        this.stonearray = [];
        for (var i = 0; i < this.stonesrow; i++) {
            this.stonearray[i] = [];
            for (var j = 0; j < this.stonescol; j++) {
                var curstone = Math.floor(Math.random() * 6);
                var curstonbmp = StoneBmp.createStoneBmp(curstone);
                this.stonearray[i][j] = curstonbmp;
                curstonbmp.setPostion(j * this.stonW, i * this.stonH);
                curstonbmp.attachParent(this.parent);
            }
        }
        this.checkNeedRefresh();
    };
    __egretProto__.clearStoneArr = function () {
        for (var i = 0; i < this.stonesrow; i++) {
            for (var j = 0; j < this.stonescol; j++) {
                var curstone = this.stonearray[i][j];
                this.stonearray[i][j] = null;
                curstone.unAttachParent(this.parent);
                StoneBmp.destoryStoneBmp(curstone);
            }
        }
    };
    return StoneManager;
})();
StoneManager.prototype.__class__ = "StoneManager";
