/**
 * Created by Administrator on 5/12 0012.
 */
class GameContext extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }

    private onAddtoStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        ApplicationFacade.getInstance().registerMediator(new GameContextMediator(this));
    }

    public addHero(h:Airplain):void {
        //console.log("addHero");
        if(this.getChildIndex(h) < 0) {
            this.addChild(h);
        }
    }

    public addEnemy(e:Airplain):void {
        //console.log("addEnemy");
        if(this.getChildIndex(e) < 0) {
            this.addChild(e);
        }
    }

    public removeEnemy(e:Airplain):void {
        //console.log("removeEnemy");
        if(this.getChildIndex(e) >= 0) {
            this.removeChild(e);
        }
    }

    public addBullet(b:egret.Bitmap):void {
        //console.log("addBullet");
        if(this.getChildIndex(b) < 0) {
            this.addChild(b);
        }
    }

    public removeBullet(b:egret.Bitmap):void {
        //console.log("removeBullet");
        if(this.getChildIndex(b) >= 0) {
            this.removeChild(b);
        }
    }

    public startGame():void {
        this.removeChildren();
    }
}