/**
 * Created by Administrator on 7/7 0007.
 */
class StoneBmp {
    private static stonepool:StoneBmp[] = [];

    private bmp:egret.Bitmap;
    private bmpindex:number = 0;
    private isattach:boolean = false;
    private movecallback:StoneCallBack = null;
    private stonW:number = 106;
    private stonH:number = 106;
    private boombmp:egret.Bitmap;
    private isboomattach:boolean = false;
    private diffW:number = 0;
    private diffH:number = 0;


    public static createStoneBmp(i:number):StoneBmp {
        var res:StoneBmp;
        if(this.stonepool.length > 0) {
            res = this.stonepool.shift();
        }
        else {
            res = new StoneBmp();
        }
        res.setIndex(i);
        return res;
    }

    private oncreate():void {
        ;
    }

    public static destoryStoneBmp(d:StoneBmp):void {
        if(this.stonepool.indexOf(d) < 0) {
            this.stonepool.push(d);
        }
        d.ondestory();
    }

    private ondestory():void {
        ;
    }

    public attachParent(p:egret.DisplayObjectContainer):void {
        if(p && this.bmp) {
            p.addChild(this.bmp);
            this.isattach = true;
        }
    }

    public unAttachParent(p:egret.DisplayObjectContainer):void {
        if(this.isattach && p && this.bmp) {
            if(p.getChildIndex(this.bmp) >= 0) {
                p.removeChild(this.bmp);
            }
            this.isattach = false;

            this.destoryBoom(p);
        }
    }

    public setIndex(i:number):void {
        if(!this.bmp) {
            this.bmp = new egret.Bitmap();
        }
        var t:egret.Texture = this.getStone(i);
        if(t) {
            this.bmp.texture = t;
        }
        this.bmpindex = i;
        this.bmp.scaleX = 1;
        this.bmp.scaleY = 1;
    }

    public getIndex():number {
        return this.bmpindex+1;
    }

    public setPostion(x:number, y:number):void {
        this.bmp.x = x;
        this.bmp.y = y;
    }

    private getStone(i:number):egret.Texture {
        var b:egret.Texture = null;
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
    }

    public moveStone(tx:number, ty:number, c?:StoneCallBack):void {
        this.addMoveCallback(c);

        if(this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({x: tx + this.diffW, y: ty + this.diffH}, 200);
        }
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({x: tx, y: ty}, 200)
            .call(this.onMoveCallBack, this);
    }


    public moveAndBack(tx:number, ty:number, c?:StoneCallBack):void {
        this.addMoveCallback(c);
        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        var px:number = this.bmp.x;
        var py:number = this.bmp.y;

        if(this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({x: tx + this.diffW, y: ty + this.diffH}, 200)
                .to({x: px + this.diffW, y: py + this.diffH}, 200);
        }
        tw.to({x: tx, y: ty}, 200)
            .to({x:px, y:py}, 200)
            .call(this.onMoveCallBack, this);
    }

    public moveAndCheckStone(tx:number, ty:number, c?:StoneCallBack):void {
        this.addMoveCallback(c);

        if(this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({x: tx + this.diffW, y: ty + this.diffH}, 200);
        }

        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({x: tx, y: ty}, 200)
            .call(this.onMoveCallBack, this);
    }

    public scaleDestory(c?:StoneCallBack):void {
        this.addMoveCallback(c);
        var px:number = this.bmp.x + this.stonW*0.4;
        var py:number = this.bmp.y + this.stonH*0.4;

        if(this.isboomattach) {
            egret.Tween.removeTweens(this.boombmp);
            var twboom = egret.Tween.get(this.boombmp);
            twboom.to({scaleX: 0.2, scaleY: 0.2, x: px + this.diffW, y: py + this.diffH}, 2000);
        }

        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({scaleX: 0.2, scaleY: 0.2, x: px, y: py}, 2000)
            .call(this.onMoveCallBack, this);
    }

    //public moveAndCheckStone(tx:number, ty:number, cakkback:Function, obj:any, params: Array<any>):void {
    //    GameContent.STONE_MOVEING++;
    //    egret.Tween.removeTweens(this.bmp);
    //    var tw = egret.Tween.get(this.bmp);
    //    tw.to({x: tx, y: ty}, 250)
    //        .call(cakkback, obj, params);
    //}

    private onMoveCallBack():void {
        c//onsole.log("onMoveCallBack ");
        GameContent.STONE_MOVEING--;
        var c:StoneCallBack = this.movecallback;
        this.movecallback = null;
        if(c) {
            c.resCount();
        }
    }

    public addMoveCallback(c:StoneCallBack):void {
        //console.log("addMoveCallback ");
        GameContent.STONE_MOVEING++;
        if(this.movecallback) {
            console.log("addMoveCallback is err ");
            return;
        }
        if(c) {
            this.movecallback = c;
            this.movecallback.addCount();
        }
    }

    public getX():number {
        return this.bmp.x;
    }

    public getY():number {
        return this.bmp.y;
    }

    public attachParentWidthSpecial(p:egret.DisplayObjectContainer):void {
        if(p && this.bmp) {
            p.addChild(this.bmp);
            this.isattach = true;

            this.showBoom(p);
        }
    }

    public showBoom(p:egret.DisplayObjectContainer):void {
        if(!this.boombmp) {
            this.boombmp = new egret.Bitmap();
            this.boombmp.texture = RES.getRes("boom_png");
            this.diffW = (this.bmp.texture.textureWidth - this.boombmp.texture.textureWidth)*0.5;
            this.diffH = (this.bmp.texture.textureHeight - this.boombmp.texture.textureHeight)*0.5;
        }

        if(p.getChildIndex(this.boombmp) < 0) {
            p.addChild(this.boombmp);
            this.isboomattach = true;
        }
    }

    public destoryBoom(p:egret.DisplayObjectContainer):void {
        if(!this.boombmp) {
            return ;
        }
        if(p.getChildIndex(this.boombmp) >= 0) {
            p.removeChild(this.boombmp);
            this.isboomattach = false;
        }
    }

    public scaleShowBoom(c:StoneCallBack):void {
        if(!this.boombmp){
            console.log("sth is err in scaleShowBoom");
            return ;
        }
        this.addMoveCallback(c);
        var tx:number = this.bmp.x, ty:number = this.bmp.y;
        var bx:number = this.bmp.x + (this.bmp.texture.textureWidth - this.boombmp.texture.textureWidth)*0.5;
        var by:number = this.bmp.y + (this.bmp.texture.textureHeight - this.boombmp.texture.textureHeight)*0.5;

        this.bmp.x = this.bmp.x + this.stonW*0.4;
        this.bmp.y = this.bmp.y + this.stonH*0.4;
        this.bmp.scaleX = 0.2;
        this.bmp.scaleY = 0.2;
        this.boombmp.x = this.bmp.x;
        this.boombmp.y = this.bmp.y;
        this.boombmp.scaleX = 0.2;
        this.boombmp.scaleY = 0.2;


        egret.Tween.removeTweens(this.boombmp);
        var twboom = egret.Tween.get(this.boombmp);
        twboom.to({scaleX: 1, scaleY: 1, x: bx, y: by}, 2000);

        egret.Tween.removeTweens(this.bmp);
        var tw = egret.Tween.get(this.bmp);
        tw.to({scaleX: 1, scaleY: 1, x: tx, y: ty}, 2000)
            .call(this.onMoveCallBack, this);



    }
}