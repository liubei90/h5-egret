/**
 * Created by Administrator on 5/14 0014.
 */
class GameBack extends egret.DisplayObjectContainer {
    private backs:egret.Bitmap[] = [];
    private bkTimer:egret.Timer = new egret.Timer(40);
    private bkspeed:number = 10;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.bkTimer.addEventListener(egret.TimerEvent.TIMER, this.onbkTimer, this);
    }

    private onAddtoStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        var stageH:number = egret.MainContext.instance.stage.stageHeight;
        var texture:egret.Texture = RES.getRes("bkf_png");
        var num:number = Math.floor(stageH/texture.textureHeight)+2;

        for(var i:number = 0; i < num; i++) {
            var cbmp:egret.Bitmap = new egret.Bitmap();
            cbmp.texture = texture;
            this.addChild(cbmp);
            this.backs.push(cbmp);
            cbmp.y = texture.textureHeight*(i-1);;
        }
        this.bkTimer.start();
    }

    private onbkTimer():void {
        var delbk:egret.Bitmap;
        for(var i:number = 0; i < this.backs.length; i++) {
            var cbk:egret.Bitmap = this.backs[i];
            cbk.y = cbk.y + this.bkspeed;
            if(cbk.y > egret.MainContext.instance.stage.stageHeight) {
                delbk = cbk;
            }
        }

        if(delbk) {
            var index:number = this.backs.indexOf(delbk);
            if(index >= 0) {
                var cfirstbk:egret.Bitmap = this.backs[0];
                this.backs.splice(index, 1);
                this.backs.unshift(delbk);
                delbk.y = cfirstbk.y - delbk.height;
            }
        }
    }
}