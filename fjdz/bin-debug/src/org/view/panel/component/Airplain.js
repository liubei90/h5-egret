/**
 * Created by Administrator on 5/12 0012.
 */
var Airplain = (function (_super) {
    __extends(Airplain, _super);
    function Airplain() {
        _super.call(this);
        this.airtype = 0;
        this.airspeed = 0;
        this.airdestoryindex = 0;
        this.airhealth = 0;
        this.airScore = 0;
    }
    var __egretProto__ = Airplain.prototype;
    __egretProto__.setAirType = function (i) {
        this.airtype = i;
        var texture = Airplain.airanimation[i.toString()][0];
        this.texture = RES.getRes(texture);
        this.resetAir();
    };
    __egretProto__.getAirType = function () {
        return this.airtype;
    };
    __egretProto__.getAirscore = function () {
        return this.airScore;
    };
    __egretProto__.resetAir = function () {
        this.airdestoryindex = 0;
        switch (this.airtype) {
            case 1:
                this.airhealth = 1;
                break;
            case 2:
                this.airhealth = 1;
                this.airScore = 10;
                this.airspeed = 7;
                break;
            case 3:
                this.airhealth = 3;
                this.airScore = 20;
                this.airspeed = 5;
                break;
            case 4:
                this.airhealth = 6;
                this.airScore = 50;
                this.airspeed = 1;
                break;
        }
    };
    __egretProto__.updatePos = function () {
        this.y = this.y + this.airspeed + Airplain.airbasespeed;
    };
    Airplain.getAirplain = function (i) {
        var a;
        if (this.airpool.length > 0) {
            a = this.airpool.shift();
        }
        else {
            a = new Airplain();
        }
        a.setAirType(i);
        return a;
    };
    Airplain.destoryAirplain = function (a) {
        if (Airplain.airpool.indexOf(a) < 0) {
            Airplain.airpool.push(a);
        }
    };
    Airplain.addAirSpeed = function () {
        Airplain.airbasespeed++;
    };
    Airplain.resetAirSpeed = function () {
        Airplain.airbasespeed = 9;
    };
    __egretProto__.animationDestory = function () {
        var res = false;
        var queue = Airplain.airanimation[this.airtype.toString()];
        if (queue) {
            if (this.airdestoryindex >= queue.length) {
                res = true;
            }
            else {
                this.airdestoryindex++;
                this.texture = RES.getRes(queue[this.airdestoryindex]);
            }
        }
        return res;
    };
    __egretProto__.checkDead = function () {
        var res = false;
        this.airhealth--;
        if (this.airhealth <= 0) {
            res = true;
        }
        return res;
    };
    Airplain.airbasespeed = 7;
    Airplain.airpool = [];
    Airplain.airanimation = {
        "1": ["me_png", "me_die1_png", "die2_png", "die3_png"],
        "2": ["plain1_png", "plain1_die1_png", "die2_png", "die3_png"],
        "3": ["plain2_png", "plain2_die1_png", "die2_png", "die3_png"],
        "4": ["plain3_png", "plain3_die1_png", "die1_png", "die2_png", "die3_png"]
    };
    return Airplain;
})(egret.Bitmap);
Airplain.prototype.__class__ = "Airplain";
