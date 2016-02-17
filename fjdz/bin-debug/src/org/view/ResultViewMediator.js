/**
 * Created by Administrator on 5/11 0011.
 */
var ResultViewMediator = (function (_super) {
    __extends(ResultViewMediator, _super);
    function ResultViewMediator(viewComponent) {
        _super.call(this, ResultViewMediator.NAME, viewComponent);
        viewComponent.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }
    var __egretProto__ = ResultViewMediator.prototype;
    __egretProto__.onCreateComplete = function () {
        console.log("ResultViewMediator onCreateComplete");
        var resview = this.resultView;
        if (resview) {
            resview.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
            if (resview.rank_bitmaplabel) {
            }
            if (resview.ranklist_datagroup) {
                var sourceArr = [];
                resview.ranklistarray = new egret.gui.ArrayCollection(sourceArr);
                resview.ranklist_datagroup.dataProvider = resview.ranklistarray;
                resview.ranklist_datagroup.itemRenderer = new egret.gui.ClassFactory(RanklistItem);
                var vLayout = new egret.gui.VerticalLayout();
                vLayout.horizontalAlign = egret.HorizontalAlign.CONTENT_JUSTIFY;
                vLayout.gap = 9;
                resview.ranklist_datagroup.layout = vLayout;
            }
            if (resview.restart_uiasset) {
                resview.restart_uiasset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            }
            if (resview.score_bitmaplabel) {
            }
            if (resview.wait_uiasset) {
                resview.wait_uiasset.anchorX = 0.5;
                resview.wait_uiasset.anchorY = 0.5;
            }
        }
    };
    __egretProto__.listNotificationInterests = function () {
        return [
            GameContextProxy.SETRESULT,
            ResultViewMediator.UPDATE_INFO
        ];
    };
    __egretProto__.handleNotification = function (notification) {
        console.log("ResultViewMediator handleNotification");
        switch (notification.getName()) {
            case GameContextProxy.SETRESULT:
                var score = notification.getBody();
                var scorelabel = this.resultView.score_bitmaplabel;
                if (scorelabel) {
                    scorelabel.text = score.toString();
                }
                var resultproxy = this.facade.retrieveProxy(ResultViewProxy.NAME);
                if (resultproxy) {
                    this.animationWait();
                    resultproxy.postResult(score);
                }
                break;
            case ResultViewMediator.UPDATE_INFO:
                this.stopWait();
                var info = notification.getBody();
                var ranknum = info["ranknum"].toString();
                var ranklabel = this.resultView.rank_bitmaplabel;
                if (ranklabel && ranknum) {
                    ranklabel.text = ranknum;
                }
                var rankarry = this.resultView.ranklistarray;
                if (rankarry) {
                    var ranklist = info["ranklist"];
                    if (ranklist) {
                        rankarry.replaceAll(ranklist);
                    }
                }
                break;
        }
    };
    Object.defineProperty(__egretProto__, "resultView", {
        get: function () {
            return (this.viewComponent);
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.onTouchTap = function () {
        this.sendNotification(GameCommand.STARTGAME);
        this.sendNotification(GameScreenCommand.CHANGE_VIEW, 1);
    };
    __egretProto__.animationWait = function () {
        var waitImg = this.resultView.wait_uiasset;
        if (waitImg) {
            waitImg.visible = true;
            waitImg.rotation = 0;
            egret.Tween.removeTweens(waitImg);
            var tw = egret.Tween.get(waitImg);
            console.log("scrollWait");
            tw.to({ rotation: 18000 }, 18000 * 3);
        }
    };
    __egretProto__.stopWait = function () {
        var waitImg = this.resultView.wait_uiasset;
        if (waitImg) {
            egret.Tween.removeTweens(waitImg);
            waitImg.visible = false;
        }
    };
    ResultViewMediator.NAME = "ResultViewMediator";
    ResultViewMediator.UPDATE_INFO = "updateinfo";
    return ResultViewMediator;
})(puremvc.Mediator);
ResultViewMediator.prototype.__class__ = "ResultViewMediator";
