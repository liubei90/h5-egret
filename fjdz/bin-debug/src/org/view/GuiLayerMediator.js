/**
 * Created by Administrator on 5/11 0011.
 */
var GuiLayerMediator = (function (_super) {
    __extends(GuiLayerMediator, _super);
    function GuiLayerMediator(viewComponent) {
        _super.call(this, GuiLayerMediator.NAME, viewComponent);
        this.maingame = new MainGame();
        this.resultview = new ResultView();
    }
    var __egretProto__ = GuiLayerMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
        }
    };
    Object.defineProperty(__egretProto__, "guilayer", {
        get: function () {
            return this.viewComponent;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.changeScreen = function (n) {
        if (n == 1) {
            this.openMainGame();
        }
        else if (n == 2) {
            this.openResult();
        }
    };
    __egretProto__.openMainGame = function () {
        if (!this.maingame) {
            console.log("guilayer maingame is init err!");
            return;
        }
        var main_ = this.guilayer;
        if (main_) {
            main_.removeAllElements();
            main_.addElement(this.maingame);
        }
    };
    __egretProto__.openResult = function () {
        if (!this.resultview) {
            console.log("guilayer resultview is init err!");
            return;
        }
        var main_ = this.guilayer;
        if (main_) {
            main_.removeAllElements();
            main_.addElement(this.resultview);
        }
    };
    GuiLayerMediator.NAME = "GuiLayerMediator";
    return GuiLayerMediator;
})(puremvc.Mediator);
GuiLayerMediator.prototype.__class__ = "GuiLayerMediator";
