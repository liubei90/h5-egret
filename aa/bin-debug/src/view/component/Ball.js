/**
 * Created by Administrator on 7/1 0001.
 */
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        _super.call(this);
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
        this.centernum.x = this.width * 0.5;
        this.centernum.y = this.width * .5;
        this.addChild(this.centernum);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var __egretProto__ = Ball.prototype;
    __egretProto__.onAddtoStage = function () {
        this.graphics.beginFill(0xff00ff);
        this.graphics.drawCircle(this.width * 0.5, this.height * 0.5, 10);
        this.graphics.endFill();
    };
    __egretProto__.setText = function (s) {
        if (this.centernum) {
            this.centernum.text = s;
        }
    };
    Ball.createBall = function () {
        var res = null;
        if (this.ballpool_.length > 0) {
            res = this.ballpool_.shift();
            res.setText("");
        }
        else {
            res = new Ball();
        }
        return res;
    };
    Ball.destoryBall = function (d) {
        if (this.ballpool_.indexOf(d) < 0) {
            this.ballpool_.push(d);
        }
    };
    Ball.ballpool_ = [];
    return Ball;
})(egret.Sprite);
Ball.prototype.__class__ = "Ball";
