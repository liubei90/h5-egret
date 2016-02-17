/**
 * Created by Administrator on 7/1 0001.
 */
var BallManager = (function () {
    function BallManager() {
        this.balllist = [];
        this.ballgap = 50;
        this.ballvelocity = 5;
        this.ballmoveable = false;
        this.balldeadline = 0;
    }
    var __egretProto__ = BallManager.prototype;
    BallManager.getInstance = function () {
        if (BallManager.instance == null) {
            BallManager.instance = new BallManager();
        }
        return BallManager.instance;
    };
    __egretProto__.clearBall = function () {
        while (this.balllist.length > 0) {
            var curball = this.balllist.pop();
            Ball.destoryBall(curball);
        }
        this.balllist = [];
    };
    __egretProto__.initBallList = function (n) {
        this.init();
        this.clearBall();
        var screen = GameScreen.getInstance();
        if (screen) {
            for (var i = 0; i < n; i++) {
                var curball = Ball.createBall();
                this.balllist.push(curball);
                screen.addChild(curball);
                curball.setText((n - i).toString());
                curball.x = GameContent.CENTERPOINT_X;
                curball.y = GameContent.CENTERPOINT_Y + 300 + i * this.ballgap;
            }
        }
    };
    __egretProto__.init = function () {
        this.balldeadline = GameContent.CENTERPOINT_Y + 200 + 10; //10Ϊ1/2*Ball.height
    };
    __egretProto__.updataBallPos = function () {
        if (this.ballmoveable && this.balllist.length > 0) {
            for (var i = 0; i < this.balllist.length; i++) {
                var curball = this.balllist[i];
                var v = this.ballvelocity;
                if (i == 0) {
                    v = 100 / this.ballgap * this.ballvelocity;
                }
                curball.y = curball.y - v;
            }
            this.checkDead();
        }
    };
    __egretProto__.checkDead = function () {
        var firstball = this.balllist[0];
        if (firstball.y < this.balldeadline) {
            GameScreen.getInstance().checkDead();
            this.ballmoveable = false;
        }
    };
    __egretProto__.setEnableMove = function () {
        this.ballmoveable = true;
    };
    __egretProto__.removeFirstBall = function () {
        var firstball = this.balllist.shift();
        GameScreen.getInstance().removeChild(firstball);
        Ball.destoryBall(firstball);
    };
    return BallManager;
})();
BallManager.prototype.__class__ = "BallManager";
