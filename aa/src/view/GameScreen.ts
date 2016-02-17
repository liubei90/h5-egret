/**
 * Created by Administrator on 7/1 0001.
 */
class GameScreen extends egret.DisplayObjectContainer {
    private static instance:GameScreen;

    private centerCircle:CenterCircle;
    private matchsticklist:MatchStick[] = [];
    private levelinfo:GameLevelInfo = new GameLevelInfo();
    private gameover:boolean = false;

    public constructor() {
        super();
        GameScreen.instance = this;
        this.setGameLevelInfo(GameLevelInfo.levelinfo[1]);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onRollTimer, this);
    }

    public static getInstance():GameScreen {
        return GameScreen.instance;
    }

    private onAddtoStage():void {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        if(!this.centerCircle) {
            this.centerCircle = new CenterCircle();
            this.centerCircle.x = GameContent.CENTERPOINT_X;
            this.centerCircle.y = GameContent.CENTERPOINT_Y;
            this.addChild(this.centerCircle);
        }
    }

    private onRollTimer() {
        if(this.gameover) {
            return;
        }
        if(this.matchsticklist.length > 0) {
            for(var i:number = 0; i< this.matchsticklist.length; i++) {
                var curmatchstick = this.matchsticklist[i];
                var r = curmatchstick.rotation;
                if(this.levelinfo.direction == 1) {
                    r = r+this.levelinfo.velocity;
                }
                else {
                    r = r-this.levelinfo.velocity;
                }
                curmatchstick.rotation = r;
            }
        }
        BallManager.getInstance().updataBallPos();
    }

    private setGameLevelInfo(i:any):void {
        if(i) {
            this.levelinfo.ballcount = i["ballcount"];
            this.levelinfo.velocity = i["velocity"];
            this.levelinfo.matchcount = i["matchcount"];
            this.levelinfo.direction = i["direction"];
        }
        this.initGameInfo();
    }

    private initGameInfo():void {
        while(this.matchsticklist.length) {
            MatchStick.destoryMatchStick(this.matchsticklist.pop());
        }
        for(var i:number = 0; i < this.levelinfo.matchcount; i++) {
            var curmatchstick = MatchStick.createMatchStick();
            this.matchsticklist.push(curmatchstick);
            this.addChild(curmatchstick);
            curmatchstick.setText((i+1).toString());
            curmatchstick.x = GameContent.CENTERPOINT_X;
            curmatchstick.y = GameContent.CENTERPOINT_Y;
            curmatchstick.rotation = 360/this.levelinfo.matchcount*i;
        }

        BallManager.getInstance().initBallList(this.levelinfo.ballcount);
    }

    public onTouchBegin():void {
        console.log("GameScreen onTouchBegin.");
        BallManager.getInstance().setEnableMove();
        //this.addMatchStick();
    }

    private addMatchStick():void {
        var newmatchstick = MatchStick.createMatchStick();
        this.matchsticklist.push(newmatchstick);
        this.addChild(newmatchstick);
        //newmatchstick.setText();
        newmatchstick.x = GameContent.CENTERPOINT_X;
        newmatchstick.y = GameContent.CENTERPOINT_Y;
        newmatchstick.rotation = 180;
    }

    public checkDead():boolean {
        var res:boolean = true;
        for(var i:number = 0; i < this.matchsticklist.length; i++) {
            var curmatchstick:MatchStick = this.matchsticklist[i];
            var r:number = curmatchstick.rotation;
            r = Math.abs(r)%360;
            console.log("r: " + r);
            if(r < 185 && r > 175) {
                console.log("game over.");
                this.gameover = true;
                res = false;
                break;
            }
            else {
                ;
            }
        }
        if(res) {
            this.addMatchStick();
            BallManager.getInstance().removeFirstBall();
        }
        return res;
    }
}