/**
 * Created by Administrator on 5/11 0011.
 */
var MainGameMediator = (function (_super) {
    __extends(MainGameMediator, _super);
    function MainGameMediator(viewComponent) {
        _super.call(this, MainGameMediator.Name, viewComponent);
        var maingame = this.maingameView;
        if (maingame) {
            maingame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchEvent, this);
            maingame.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEvent, this);
            if (maingame.score_bitmaplabel) {
            }
            if (maingame.background_uiasset) {
                if (!maingame.gameback) {
                    maingame.gameback = new GameBack();
                    maingame.background_uiasset.source = maingame.gameback;
                }
            }
            if (maingame.gamescreen_uiasset) {
                if (!maingame.gamecontext) {
                    maingame.gamecontext = new GameContext();
                    maingame.gamescreen_uiasset.source = maingame.gamecontext;
                }
            }
        }
    }
    var __egretProto__ = MainGameMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [
            GameContextProxy.ADDHERO,
            GameContextProxy.ADDGAMESCORE
        ];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
            case GameContextProxy.ADDHERO:
                this.heroair = notification.getBody();
                this.resetPanel();
                break;
            case GameContextProxy.ADDGAMESCORE:
                var scorelabel = this.maingameView.score_bitmaplabel;
                if (scorelabel) {
                    var score = notification.getBody();
                    scorelabel.text = score.toString();
                }
                break;
        }
    };
    Object.defineProperty(__egretProto__, "maingameView", {
        get: function () {
            return (this.viewComponent);
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.onTouchEvent = function (event) {
        var etype = event.type;
        if (etype == egret.TouchEvent.TOUCH_BEGIN) {
            if (!this.beginpoint) {
                this.beginpoint = new egret.Point(0, 0);
            }
            this.beginpoint.x = event.localX;
            this.beginpoint.y = event.localY;
            if (!this.heroair) {
                console.log("MainGameMediator heroair is not add!");
            }
            else {
                if (!this.heropoint) {
                    this.heropoint = new egret.Point(0, 0);
                }
                this.heropoint.x = this.heroair.x;
                this.heropoint.y = this.heroair.y;
            }
        }
        else if (etype == egret.TouchEvent.TOUCH_MOVE) {
            if (!this.beginpoint || !this.heroair || !this.heropoint) {
                return;
            }
            var stageWidth = egret.MainContext.instance.stage.stageWidth;
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var mX = event.localX - this.beginpoint.x + this.heropoint.x;
            var mY = event.localY - this.beginpoint.y + this.heropoint.y;
            mX = Math.max(0, mX);
            mX = Math.min(stageWidth - this.heroair.width, mX);
            mY = Math.max(0, mY);
            mY = Math.min(stageHeight - this.heroair.height, mY);
            this.heroair.x = mX;
            this.heroair.y = mY;
        }
    };
    __egretProto__.resetPanel = function () {
        var scorelabel = this.maingameView.score_bitmaplabel;
        if (scorelabel) {
            scorelabel.text = "0";
        }
    };
    MainGameMediator.Name = "MainGameMediator";
    return MainGameMediator;
})(puremvc.Mediator);
MainGameMediator.prototype.__class__ = "MainGameMediator";
