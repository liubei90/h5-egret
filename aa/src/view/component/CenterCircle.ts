/**
 * Created by Administrator on 7/1 0001.
 */
class CenterCircle extends egret.Sprite {
    public constructor() {
        super();
        this.height = 100;
        this.width = 100;
        this.rotation = 0;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }

    public onAddtoStage():void {
        this.graphics.beginFill(0xff0000);
        this.graphics.drawCircle(this.width*0.5,this.height*0.5,50);
        this.graphics.endFill();
    }
}