/**
 * Created by Administrator on 5/11 0011.
 */
var ApplicationFacade = (function (_super) {
    __extends(ApplicationFacade, _super);
    function ApplicationFacade() {
        _super.call(this);
    }
    var __egretProto__ = ApplicationFacade.prototype;
    ApplicationFacade.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ApplicationFacade();
        }
        return (this.instance);
    };
    __egretProto__.initializeController = function () {
        _super.prototype.initializeController.call(this);
        this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
    };
    __egretProto__.startGame = function (gameContainer) {
        this.sendNotification(ApplicationFacade.STARTUP, gameContainer);
        this.removeCommand(ApplicationFacade.STARTUP);
    };
    ApplicationFacade.STARTUP = "startup";
    return ApplicationFacade;
})(puremvc.Facade);
ApplicationFacade.prototype.__class__ = "ApplicationFacade";
