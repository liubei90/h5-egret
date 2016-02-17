/**
 * Created by Administrator on 7/1 0001.
 */
var MatchStick = (function (_super) {
    __extends(MatchStick, _super);
    function MatchStick() {
        _super.call(this);
        this.height = 200;
        this.width = 20;
        this.rotation = 0;
        this.anchorX = 0.5;
        this.anchorY = 1;
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
    var __egretProto__ = MatchStick.prototype;
    __egretProto__.onAddtoStage = function () {
        this.graphics.beginFill(0x000000);
        this.graphics.drawCircle(this.width * 0.5, this.width * 0.5, this.width * 0.5);
        this.graphics.endFill();
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect((this.width * 0.5 - 1), this.width, 2, this.height - this.width);
        this.graphics.endFill();
    };
    __egretProto__.setText = function (s) {
        if (this.centernum) {
            this.centernum.text = s;
        }
    };
    __egretProto__.onCreate = function () {
        if (this.centernum) {
            this.centernum.text = "";
        }
    };
    MatchStick.createMatchStick = function () {
        var res = null;
        if (MatchStick.matchstickpool_.length > 0) {
            res = MatchStick.matchstickpool_.shift();
            res.onCreate();
        }
        else {
            res = new MatchStick();
        }
        return res;
    };
    MatchStick.destoryMatchStick = function (d) {
        if (this.matchstickpool_.indexOf(d) >= 0) {
            ;
        }
        else {
            this.matchstickpool_.push(d);
        }
    };
    MatchStick.matchstickpool_ = [];
    return MatchStick;
})(egret.Sprite);
MatchStick.prototype.__class__ = "MatchStick";
