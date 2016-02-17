/**
 * Created by Administrator on 7/7 0007.
 */
var StoneBmp = (function () {
    function StoneBmp() {
        this.bmpindex = 0;
        this.isattach = false;
        this.movecallback = null;
        this.stonW = 106;
        this.stonH = 106;
        this.isboomattach = false;
        this.diffW = 0;
        this.diffH = 0;
    }
    var __egretProto__ = StoneBmp.prototype;
    StoneBmp.createStoneBmp = function (i) {
        var res;
        if (this.stonepool.length > 0) {
            res = this.stonepool.shift();
        }
        else {
            res = new StoneBmp();
        }
        res.setIndex(i);
        return res;
    };
    __egretProto__.oncreate = function () {
        ;
    };
    StoneBmp.destoryStoneBmp = function (d) {
        if (this.stonepool.indexOf(d) < 0) {
            this.stonepool.push(d);
        }
        d.ondestory();
    };
    __egretProto__.ondestory = function () {
        ;
    };
    __egretProto__.attachParent = function (p) {
        if (p && this.bmp) {
            p.addChild(this.bmp);
            this.isattach = true;
        }
    };
    __egretProto__.unAttachParent = function (p) {
        if (this.isattach && p && this.bmp) {
            if (p.getChildIndex(this.bmp) >= 0) {
                p.removeChild(this.bmp);
            }
            this.isattach = false;
            this.destoryBoom(p);
        }
    };
    __egretProto__.setIndex = function (i) {
        if (!this.bmp) {
            this.bmp = new egret.Bitmap();
        }
        var t = this.getStone(i);
        if (t) {
            this.bmp.texture = t;
        }
        this.bmpindex = i;
        this.bmp.scaleX = 1;
        this.bmp.scaleY = 1;
    };
    __egretProto__.getIndex = function () {
        return this.bmpindex + 1;
    };
    __egretProto__.setPostion = function (x, y) {
        this.bmp.x = x;
        this.bmp.y = y;
    };
    __egretProto__.getStone = function (i) {
        var b = null;
        switch (i) {
            case 0:
                b = RES.getRes("stone0_png");
                break;
            case 1:
                b = RES.getRes("stone1_png");
                break;
            case 2:
                b = RES.getRes("stone2_png");
                break;
            case 3:
                b = RES.getRes("stone3_png");
                break;
            case 4:
                b = RES.getRes("stone4_png");
                break;
            case 5:
                b = RES.getRes("stone5_png");
                break;
        }
        return b;
    };
    __egretProto__.moveStone = function (tx, ty, c) {
        this.addMoveCallback(c);
        if (this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({ x: tx + this.diffW, y: ty + this.diffH }, 200);
        }
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({ x: tx, y: ty }, 200).call(this.onMoveCallBack, this);
    };
    __egretProto__.moveAndBack = function (tx, ty, c) {
        this.addMoveCallback(c);
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        var px = this.bmp.x;
        var py = this.bmp.y;
        if (this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({ x: tx + this.diffW, y: ty + this.diffH }, 200).to({ x: px + this.diffW, y: py + this.diffH }, 200);
        }
        tw.to({ x: tx, y: ty }, 200).to({ x: px, y: py }, 200).call(this.onMoveCallBack, this);
    };
    __egretProto__.moveAndCheckStone = function (tx, ty, c) {
        this.addMoveCallback(c);
        if (this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({ x: tx + this.diffW, y: ty + this.diffH }, 200);
        }
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({ x: tx, y: ty }, 200).call(this.onMoveCallBack, this);
    };
    __egretProto__.scaleDestory = function (c) {
        this.addMoveCallback(c);
        var px = this.bmp.x + this.stonW * 0.4;
        var py = this.bmp.y + this.stonH * 0.4;
        if (this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({ scaleX: 0.2, scaleY: 0.2, x: px + this.diffW, y: py + this.diffH }, 2000);
        }
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({ scaleX: 0.2, scaleY: 0.2, x: px, y: py }, 2000).call(this.onMoveCallBack, this);
    };
    //public moveAndCheckStone(tx:number, ty:number, cakkback:Function, obj:any, params: Array<any>):void {
    //    GameContent.STONE_MOVEING++;
    //    egret.Tween.removeTweens(this.bmp);
    //    var tw = egret.Tween.get(this.bmp);
    //    tw.to({x: tx, y: ty}, 250)
    //        .call(cakkback, obj, params);
    //}
    __egretProto__.onMoveCallBack = function () {
        c; //onsole.log("onMoveCallBack ");
        GameContent.STONE_MOVEING--;
        var c = this.movecallback;
        this.movecallback = null;
        if (c) {
            c.resCount();
        }
    };
    __egretProto__.addMoveCallback = function (c) {
        //console.log("addMoveCallback ");
        GameContent.STONE_MOVEING++;
        if (this.movecallback) {
            console.log("addMoveCallback is err ");
            return;
        }
        if (c) {
            this.movecallback = c;
            this.movecallback.addCount();
        }
    };
    __egretProto__.getX = function () {
        return this.bmp.x;
    };
    __egretProto__.getY = function () {
        return this.bmp.y;
    };
    __egretProto__.attachParentWidthSpecial = function (p) {
        if (p && this.bmp) {
            p.addChild(this.bmp);
            this.isattach = true;
            this.showBoom(p);
        }
    };
    __egretProto__.showBoom = function (p) {
        if (!this.boombmp) {
            this.boombmp = new egret.Bitmap();
            this.boombmp.texture = RES.getRes("boom_png");
            this.diffW = (this.bmp.texture.textureWidth - this.boombmp.texture.textureWidth) * 0.5;
            this.diffH = (this.bmp.texture.textureHeight - this.boombmp.texture.textureHeight) * 0.5;
        }
        if (p.getChildIndex(this.boombmp) < 0) {
            p.addChild(this.boombmp);
            this.isboomattach = true;
        }
    };
    __egretProto__.destoryBoom = function (p) {
        if (!this.boombmp) {
            return;
        }
        if (p.getChildIndex(this.boombmp) >= 0) {
            p.removeChild(this.boombmp);
            this.isboomattach = false;
        }
    };
    __egretProto__.scaleShowBoom = function (c) {
        if (!this.boombmp) {
            console.log("sth is err in scaleShowBoom");
            return;
        }
        this.addMoveCallback(c);
        var tx = this.bmp.x, ty = this.bmp.y;
        var bx = this.bmp.x + (this.bmp.texture.textureWidth - this.boombmp.texture.textureWidth) * 0.5;
        var by = this.bmp.y + (this.bmp.texture.textureHeight - this.boombmp.texture.textureHeight) * 0.5;
        this.bmp.x = this.bmp.x + this.stonW * 0.4;
        this.bmp.y = this.bmp.y + this.stonH * 0.4;
        this.bmp.scaleX = 0.2;
        this.bmp.scaleY = 0.2;
        this.boombmp.x = this.bmp.x;
        this.boombmp.y = this.bmp.y;
        this.boombmp.scaleX = 0.2;
        this.boombmp.scaleY = 0.2;
        egret.Tween.removeTweens(this.boombmp);
        var twboom = egret.Tween.get(this.boombmp);
        twboom.to({ scaleX: 1, scaleY: 1, x: bx, y: by }, 2000);
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({ scaleX: 1, scaleY: 1, x: tx, y: ty }, 2000).call(this.onMoveCallBack, this);
    };
    StoneBmp.stonepool = [];
    return StoneBmp;
})();
StoneBmp.prototype.__class__ = "StoneBmp";
