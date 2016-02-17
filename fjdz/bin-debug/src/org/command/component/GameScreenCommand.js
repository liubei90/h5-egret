/**
 * Created by Administrator on 5/11 0011.
 */
var GameScreenCommand = (function (_super) {
    __extends(GameScreenCommand, _super);
    function GameScreenCommand() {
        _super.call(this);
    }
    var __egretProto__ = GameScreenCommand.prototype;
    __egretProto__.execute = function (notification) {
        var notifi = notification.getName();
        switch (notifi) {
            case GameScreenCommand.CHANGE_VIEW: {
                var changenum = notification.getBody();
                var appmediator = this.facade.retrieveMediator(GuiLayerMediator.NAME);
                if (appmediator) {
                    appmediator.changeScreen(changenum);
                }
                break;
            }
        }
    };
    __egretProto__.regist = function () {
        this.facade.registerCommand(GameScreenCommand.CHANGE_VIEW, GameScreenCommand);
    };
    GameScreenCommand.CHANGE_VIEW = "changview";
    return GameScreenCommand;
})(puremvc.SimpleCommand);
GameScreenCommand.prototype.__class__ = "GameScreenCommand";
