/**
 * Created by Administrator on 5/12 0012.
 */
var GameContextMediator = (function (_super) {
    __extends(GameContextMediator, _super);
    function GameContextMediator(viewComponent) {
        _super.call(this, GameContextMediator.NAME, viewComponent);
    }
    var __egretProto__ = GameContextMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [
            GameContextProxy.ADDHERO,
            GameContextProxy.ADDENEMY,
            GameContextProxy.REMOVEENEMY,
            GameContextProxy.ADDBULLET,
            GameContextProxy.REMOVEBULLET
        ];
    };
    __egretProto__.handleNotification = function (notification) {
        var gamecontext = this.gameContext;
        var notifibody = notification.getBody();
        switch (notification.getName()) {
            case GameContextProxy.ADDHERO:
                if (gamecontext) {
                    gamecontext.addHero(notifibody);
                }
                break;
            case GameContextProxy.ADDENEMY:
                if (gamecontext) {
                    gamecontext.addEnemy(notifibody);
                }
                break;
            case GameContextProxy.REMOVEENEMY:
                if (gamecontext) {
                    gamecontext.removeEnemy(notifibody);
                }
                break;
            case GameContextProxy.ADDBULLET:
                if (gamecontext) {
                    gamecontext.addBullet(notifibody);
                }
                break;
            case GameContextProxy.REMOVEBULLET:
                if (gamecontext) {
                    gamecontext.removeBullet(notifibody);
                }
                break;
        }
    };
    Object.defineProperty(__egretProto__, "gameContext", {
        get: function () {
            return this.viewComponent;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.startGame = function () {
        this.gameContext.startGame();
    };
    GameContextMediator.NAME = "GameContextMediator";
    return GameContextMediator;
})(puremvc.Mediator);
GameContextMediator.prototype.__class__ = "GameContextMediator";
