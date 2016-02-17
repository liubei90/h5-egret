/**
 * Created by Administrator on 7/1 0001.
 */
class Ball extends egret.Sprite {
    private static ballpool_:Ball[] = [];

    private centernum:egret.TextField;
    public constructor() {
        super();
        this.height = 20;
        this.width = 20;
        this.rotation = 0;
        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.centernum = new egret.TextField();
        this.centernum.size = 15;
        this.centernum.text = "15";
        this.centernum.anchorX = 0.5;
        this.centernum.anchorY = 0.5;
        this.centernum.x = this.width*0.5;
        this.centernum.y = this.width*.5;
        this.addChild(this.centernum);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }

    public onAddtoStage():void {
        this.graphics.beginFill(0xff00ff);
        this.graphics.drawCircle(this.width*0.5,this.height*0.5,10);
        this.graphics.endFill();
    }

    public setText(s:string):void {
        if(this.centernum) {
            this.centernum.text = s;
        }
    }

    public static createBall():Ball {
        var res:Ball = null;
        if(this.ballpool_.length > 0) {
            res = this.ballpool_.shift();
            res.setText("");
        }
        else {
            res = new Ball();
        }
        return res;
    }

    public static destoryBall(d:Ball):void {
        if(this.ballpool_.indexOf(d) < 0) {
            this.ballpool_.push(d);
        }
    }
}