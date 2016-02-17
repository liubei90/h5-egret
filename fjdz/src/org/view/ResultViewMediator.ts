/**
 * Created by Administrator on 5/11 0011.
 */
class ResultViewMediator extends puremvc.Mediator implements puremvc.IMediator {
    public static NAME:string = "ResultViewMediator";
    public static UPDATE_INFO:string = "updateinfo"

    public constructor(viewComponent:any) {
        super(ResultViewMediator.NAME, viewComponent);
        viewComponent.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }

    private onCreateComplete():void {
        console.log("ResultViewMediator onCreateComplete");
        var resview:ResultView = this.resultView;
        if(resview) {
            resview.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
            if(resview.rank_bitmaplabel) {
            }
            if(resview.ranklist_datagroup) {
                var sourceArr:any[] = [];
                resview.ranklistarray = new egret.gui.ArrayCollection(sourceArr);
                resview.ranklist_datagroup.dataProvider = resview.ranklistarray;
                resview.ranklist_datagroup.itemRenderer = new egret.gui.ClassFactory(RanklistItem);
                var vLayout:egret.gui.VerticalLayout = new egret.gui.VerticalLayout();
                vLayout.horizontalAlign = egret.HorizontalAlign.CONTENT_JUSTIFY;
                vLayout.gap = 9;
                resview.ranklist_datagroup.layout = vLayout;
            }
            if(resview.restart_uiasset) {
                resview.restart_uiasset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap ,this);
            }
            if(resview.score_bitmaplabel) {
            }

            if(resview.wait_uiasset) {
                resview.wait_uiasset.anchorX = 0.5;
                resview.wait_uiasset.anchorY = 0.5;
            }
        }
    }

    public listNotificationInterests():Array<any> {
        return[
            GameContextProxy.SETRESULT,
            ResultViewMediator.UPDATE_INFO
        ];
    }

    public handleNotification(notification:puremvc.INotification):void {
        console.log("ResultViewMediator handleNotification");
        switch (notification.getName()) {
            case GameContextProxy.SETRESULT:
                var score:number = notification.getBody();
                var scorelabel:egret.gui.BitmapLabel = this.resultView.score_bitmaplabel;
                if(scorelabel) {
                    scorelabel.text = score.toString();
                }
                var resultproxy:ResultViewProxy = <ResultViewProxy><any>this.facade.retrieveProxy(ResultViewProxy.NAME);
                if(resultproxy) {
                    this.animationWait();
                    resultproxy.postResult(score);
                }
                break;
            case ResultViewMediator.UPDATE_INFO:
                this.stopWait();
                var info:Object = notification.getBody();

                var ranknum:string = info["ranknum"].toString();
                var ranklabel:egret.gui.BitmapLabel = this.resultView.rank_bitmaplabel;
                if(ranklabel && ranknum) {
                    ranklabel.text = ranknum;
                }
                var rankarry:egret.gui.ArrayCollection = this.resultView.ranklistarray;
                if(rankarry) {
                    var ranklist = info["ranklist"];
                    if(ranklist) {
                        rankarry.replaceAll(ranklist);
                    }
                }

                break;
        }
    }

    public get resultView():ResultView {
        return <ResultView><any>(this.viewComponent);
    }

    private onTouchTap():void {
        this.sendNotification(GameCommand.STARTGAME);
        this.sendNotification(GameScreenCommand.CHANGE_VIEW, 1);
    }

    private animationWait():void {
        var waitImg:egret.gui.UIAsset = this.resultView.wait_uiasset;
        if(waitImg) {
            waitImg.visible = true;
            waitImg.rotation = 0;
            egret.Tween.removeTweens(waitImg);
            var tw = egret.Tween.get(waitImg);
            console.log("scrollWait");
            tw.to({rotation:18000}, 18000*3);
        }
    }

    private stopWait():void {
        var waitImg:egret.gui.UIAsset = this.resultView.wait_uiasset;
        if(waitImg) {
            egret.Tween.removeTweens(waitImg);
            waitImg.visible = false;
        }
    }
}