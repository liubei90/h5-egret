/**
 * Created by Administrator on 5/14 0014.
 */
var GameBack = (function (_super) {
    __extends(GameBack, _super);
    function GameBack() {
        _super.call(this);
        this.backs = [];
        this.bkTimer = new egret.Timer(40);
        this.bkspeed = 10;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.bkTimer.addEventListener(egret.TimerEvent.TIMER, this.onbkTimer, this);
    }
    var __egretProto__ = GameBack.prototype;
    __egretProto__.onAddtoStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        var stageH = egret.MainContext.instance.stage.stageHeight;
        var texture = RES.getRes("bkf_png");
        var num = Math.floor(stageH / texture.textureHeight) + 2;
        for (var i = 0; i < num; i++) {
            var cbmp = new egret.Bitmap();
            cbmp.texture = texture;
            this.addChild(cbmp);
            this.backs.push(cbmp);
            cbmp.y = texture.textureHeight * (i - 1);
            ;
        }
        this.bkTimer.start();
    };
    __egretProto__.onbkTimer = function () {
        var delbk;
        for (var i = 0; i < this.backs.length; i++) {
            var cbk = this.backs[i];
            cbk.y = cbk.y + this.bkspeed;
            if (cbk.y > egret.MainContext.instance.stage.stageHeight) {
                delbk = cbk;
            }
        }
        if (delbk) {
            var index = this.backs.indexOf(delbk);
            if (index >= 0) {
                var cfirstbk = this.backs[0];
                this.backs.splice(index, 1);
                this.backs.unshift(delbk);
                delbk.y = cfirstbk.y - delbk.height;
            }
        }
    };
    return GameBack;
})(egret.DisplayObjectContainer);
GameBack.prototype.__class__ = "GameBack";
