/**
 * Created by Administrator on 5/12 0012.
 */
var GameContext = (function (_super) {
    __extends(GameContext, _super);
    function GameContext() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var __egretProto__ = GameContext.prototype;
    __egretProto__.onAddtoStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        ApplicationFacade.getInstance().registerMediator(new GameContextMediator(this));
    };
    __egretProto__.addHero = function (h) {
        //console.log("addHero");
        if (this.getChildIndex(h) < 0) {
            this.addChild(h);
        }
    };
    __egretProto__.addEnemy = function (e) {
        //console.log("addEnemy");
        if (this.getChildIndex(e) < 0) {
            this.addChild(e);
        }
    };
    __egretProto__.removeEnemy = function (e) {
        //console.log("removeEnemy");
        if (this.getChildIndex(e) >= 0) {
            this.removeChild(e);
        }
    };
    __egretProto__.addBullet = function (b) {
        //console.log("addBullet");
        if (this.getChildIndex(b) < 0) {
            this.addChild(b);
        }
    };
    __egretProto__.removeBullet = function (b) {
        //console.log("removeBullet");
        if (this.getChildIndex(b) >= 0) {
            this.removeChild(b);
        }
    };
    __egretProto__.startGame = function () {
        this.removeChildren();
    };
    return GameContext;
})(egret.DisplayObjectContainer);
GameContext.prototype.__class__ = "GameContext";
