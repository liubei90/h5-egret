/**
 * Created by Administrator on 5/11 0011.
 */
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        _super.call(this);
        this.skinName = skins.ResultViewSkin;
        //this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        ApplicationFacade.getInstance().registerMediator(new ResultViewMediator(this));
    }
    var __egretProto__ = ResultView.prototype;
    __egretProto__.onCreateComplete = function () {
        console.log("ResultView onCreateComplete");
        //this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    };
    return ResultView;
})(egret.gui.SkinnableComponent);
ResultView.prototype.__class__ = "ResultView";
