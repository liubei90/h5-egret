/**
 * Created by Administrator on 5/11 0011.
 */
var ModelPrepCommand = (function (_super) {
    __extends(ModelPrepCommand, _super);
    function ModelPrepCommand() {
        _super.call(this);
    }
    var __egretProto__ = ModelPrepCommand.prototype;
    __egretProto__.execute = function (notification) {
        this.facade.registerProxy(new GameContextProxy());
        this.facade.registerProxy(new ResultViewProxy());
    };
    return ModelPrepCommand;
})(puremvc.SimpleCommand);
ModelPrepCommand.prototype.__class__ = "ModelPrepCommand";
