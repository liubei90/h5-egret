/**
 * Created by Administrator on 7/1 0001.
 */
class BallManager {
    private static instance:BallManager;
    private balllist:Ball[] = [];
    private ballgap:number = 50;
    private ballvelocity:number = 5;
    private ballmoveable:boolean = false;
    private balldeadline:number = 0;

    public static getInstance():BallManager {
        if(BallManager.instance  == null) {
            BallManager.instance = new BallManager();
        }
        return BallManager.instance;
    }

    private clearBall():void {
        while(this.balllist.length > 0) {
            var curball:Ball = this.balllist.pop();
            Ball.destoryBall(curball);
        }
        this.balllist = [];
    }

    public initBallList(n:number):void {
        this.init();
        this.clearBall();
        var screen:GameScreen = GameScreen.getInstance();
        if(screen) {
            for(var i:number = 0; i < n; i++) {
                var curball:Ball = Ball.createBall();
                this.balllist.push(curball);
                screen.addChild(curball);
                curball.setText((n-i).toString());
                curball.x = GameContent.CENTERPOINT_X;
                curball.y = GameContent.CENTERPOINT_Y + 300 + i*this.ballgap;
            }
        }
    }

    private init():void {
        this.balldeadline = GameContent.CENTERPOINT_Y + 200 + 10; //10Ϊ1/2*Ball.height
    }

    public updataBallPos():void {
        if(this.ballmoveable && this.balllist.length > 0) {
            for(var i:number = 0; i< this.balllist.length; i++) {
                var curball:Ball = this.balllist[i];
                var v:number = this.ballvelocity;
                if(i == 0) {
                    v = 100/this.ballgap*this.ballvelocity;
                }
                curball.y = curball.y - v;
            }
            this.checkDead();
        }
    }

    private checkDead():void {
        var firstball:Ball = this.balllist[0];
        if(firstball.y < this.balldeadline) {
            GameScreen.getInstance().checkDead()
            this.ballmoveable = false;
        }
    }

    public setEnableMove():void {
        this.ballmoveable = true;
    }

    public removeFirstBall():void {
        var firstball:Ball = this.balllist.shift();
        GameScreen.getInstance().removeChild(firstball);
        Ball.destoryBall(firstball);
    }
}