/**
 * Created by Administrator on 7/6 0006.
 */
class GameScreen extends egret.DisplayObjectContainer {
    private bkcolor:egret.Sprite;
    private mainpanel:MainGamePanel;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }

    private onAddtoStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.init();
    }

    private init():void {
        this.bkcolor = new egret.Sprite();
        this.addChild(this.bkcolor);
        var g:egret.Graphics = this.bkcolor.graphics;
        g.beginFill(0xffffff);
        g.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        g.endFill();
        this.bkcolor.cacheAsBitmap = true;

        this.mainpanel = new MainGamePanel();
        this.addChild(this.mainpanel);
    }
}