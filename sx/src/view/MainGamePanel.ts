/**
 * Created by Administrator on 7/6 0006.
 */
class MainGamePanel extends egret.DisplayObjectContainer {
    private bkbmp:egret.Bitmap;
    private stonmanager:StoneManager;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }

    private onAddtoStage():void {
        if(!this.bkbmp) {
            this.bkbmp = new egret.Bitmap();
            this.bkbmp.texture = RES.getRes("bg_png");
            this.bkbmp.height = this.bkbmp.texture.textureHeight*2;
            this.bkbmp.fillMode = egret.BitmapFillMode.REPEAT;
            this.addChild(this.bkbmp);
        }
        var parent:egret.DisplayObjectContainer = this.parent;
        if(!parent) {
            console.log("something is wrong!!!");
        }
        this.x = (parent.width - this.bkbmp.width)*0.5;
        this.y = this.x;

        if(!this.stonmanager) {
            this.stonmanager = new StoneManager();
            this.stonmanager.setContext(this);
            this.stonmanager.initStone2();
        }

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.touchEnabled = true;
        this.touchChildren = false;
    }

    private onTouchBegin(event:egret.TouchEvent):void {
        if(GameContent.STONE_MOVEING != 0) {
            return;
        }
        var lx:number = event.localX;
        var ly:number = event.localY;
        if(this.stonmanager) {
            this.stonmanager.onTouchBegin(lx, ly);
        }
    }

    private onTouchMove(event:egret.TouchEvent):void {
        if(GameContent.STONE_MOVEING != 0) {
            return;
        }
        var lx:number = event.localX;
        var ly:number = event.localY;
        if(this.stonmanager) {
            this.stonmanager.onTouchMove(lx, ly);
        }
    }


}