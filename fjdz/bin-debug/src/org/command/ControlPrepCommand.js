/**
 * Created by Administrator on 5/11 0011.
 */
var ControlPrepCommand = (function (_super) {
    __extends(ControlPrepCommand, _super);
    function ControlPrepCommand() {
        _super.call(this);
    }
    var __egretProto__ = ControlPrepCommand.prototype;
    __egretProto__.execute = function (notification) {
        (new GameScreenCommand()).regist();
        (new GameCommand()).regist();
    };
    return ControlPrepCommand;
})(puremvc.SimpleCommand);
ControlPrepCommand.prototype.__class__ = "ControlPrepCommand";
