/**
 * Created by Administrator on 5/11 0011.
 */
var ViewPrepCommand = (function (_super) {
    __extends(ViewPrepCommand, _super);
    function ViewPrepCommand() {
        _super.call(this);
    }
    var __egretProto__ = ViewPrepCommand.prototype;
    __egretProto__.execute = function (notification) {
        var main = notification.getBody();
        if (main) {
            this.facade.registerMediator(new GuiLayerMediator(main));
        }
    };
    return ViewPrepCommand;
})(puremvc.SimpleCommand);
ViewPrepCommand.prototype.__class__ = "ViewPrepCommand";
