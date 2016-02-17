/**
 * Created by Administrator on 7/1 0001.
 */
var CenterCircle = (function (_super) {
    __extends(CenterCircle, _super);
    function CenterCircle() {
        _super.call(this);
        this.height = 100;
        this.width = 100;
        this.rotation = 0;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var __egretProto__ = CenterCircle.prototype;
    __egretProto__.onAddtoStage = function () {
        this.graphics.beginFill(0xff0000);
        this.graphics.drawCircle(this.width * 0.5, this.height * 0.5, 50);
        this.graphics.endFill();
    };
    return CenterCircle;
})(egret.Sprite);
CenterCircle.prototype.__class__ = "CenterCircle";
