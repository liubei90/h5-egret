/**
 * Created by Administrator on 5/12 0012.
 */
var GameCommand = (function (_super) {
    __extends(GameCommand, _super);
    function GameCommand() {
        _super.call(this);
    }
    var __egretProto__ = GameCommand.prototype;
    __egretProto__.regist = function () {
        this.facade.registerCommand(GameCommand.STARTGAME, GameCommand);
    };
    __egretProto__.execute = function (notification) {
        var notifi = notification.getName();
        switch (notifi) {
            case GameCommand.STARTGAME:
                var gamecontext = this.facade.retrieveMediator(GameContextMediator.NAME);
                if (gamecontext) {
                    gamecontext.startGame();
                }
                var contextProxy = this.facade.retrieveProxy(GameContextProxy.NAME);
                if (contextProxy) {
                    contextProxy.startGame();
                }
                break;
        }
    };
    GameCommand.STARTGAME = "startgame";
    return GameCommand;
})(puremvc.SimpleCommand);
GameCommand.prototype.__class__ = "GameCommand";
