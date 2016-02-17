/**
 * Created by Administrator on 5/11 0011.
 */
var StartupCommand = (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        _super.call(this);
    }
    var __egretProto__ = StartupCommand.prototype;
    __egretProto__.initializeMacroCommand = function () {
        this.addSubCommand(ControlPrepCommand);
        this.addSubCommand(ModelPrepCommand);
        this.addSubCommand(ViewPrepCommand);
    };
    return StartupCommand;
})(puremvc.MacroCommand);
StartupCommand.prototype.__class__ = "StartupCommand";
