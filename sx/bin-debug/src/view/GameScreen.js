/**
 * Created by Administrator on 7/6 0006.
 */
var GameScreen = (function (_super) {
    __extends(GameScreen, _super);
    function GameScreen() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var __egretProto__ = GameScreen.prototype;
    __egretProto__.onAddtoStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.init();
    };
    __egretProto__.init = function () {
        this.bkcolor = new egret.Sprite();
        this.addChild(this.bkcolor);
        var g = this.bkcolor.graphics;
        g.beginFill(0xffffff);
        g.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        g.endFill();
        this.bkcolor.cacheAsBitmap = true;
        this.mainpanel = new MainGamePanel();
        this.addChild(this.mainpanel);
    };
    return GameScreen;
})(egret.DisplayObjectContainer);
GameScreen.prototype.__class__ = "GameScreen";
