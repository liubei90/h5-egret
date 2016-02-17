/**
 * Created by Administrator on 5/11 0011.
 */
class MainGameMediator extends puremvc.Mediator {
    public static Name:string = "MainGameMediator";

    private heroair:Airplain;
    private beginpoint:egret.Point;
    private heropoint:egret.Point;

    public constructor(viewComponent:any) {
        super(MainGameMediator.Name, viewComponent);
        var maingame:MainGame = this.maingameView;
        if(maingame) {
            maingame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchEvent, this);
            maingame.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEvent, this);
            if(maingame.score_bitmaplabel) {
            }
            if(maingame.background_uiasset) {
                if(!maingame.gameback) {
                    maingame.gameback = new GameBack();
                    maingame.background_uiasset.source = maingame.gameback;
                }
            }
            if(maingame.gamescreen_uiasset) {
                if(!maingame.gamecontext) {
                    maingame.gamecontext = new GameContext();
                    maingame.gamescreen_uiasset.source = maingame.gamecontext;
                }
            }
        }
    }

    public listNotificationInterests():Array<string> {
        return[
            GameContextProxy.ADDHERO,
            GameContextProxy.ADDGAMESCORE
        ];
    }

    public handleNotification(notification:puremvc.INotification):void {
        //console.log("MainGameMediator handleNotification");
        switch (notification.getName()) {
            case GameContextProxy.ADDHERO:
                this.heroair = <Airplain>notification.getBody();
                this.resetPanel();
                break;
            case GameContextProxy.ADDGAMESCORE:
                var scorelabel:egret.gui.BitmapLabel = this.maingameView.score_bitmaplabel;
                if(scorelabel) {
                    var score:number = notification.getBody();
                    scorelabel.text = score.toString();
                }
                break;
        }
    }

    public get maingameView():MainGame {
        return <MainGame><any>(this.viewComponent);
    }

    private onTouchEvent(event:egret.TouchEvent):void {
        var etype:any = event.type;
        if(etype == egret.TouchEvent.TOUCH_BEGIN) {
            if(!this.beginpoint) {
                this.beginpoint = new egret.Point(0, 0);
            }
            this.beginpoint.x = event.localX;
            this.beginpoint.y = event.localY;
            if(!this.heroair) {
                console.log("MainGameMediator heroair is not add!");
            }
            else {
                if(!this.heropoint) {
                    this.heropoint = new egret.Point(0, 0);
                }
                this.heropoint.x = this.heroair.x;
                this.heropoint.y = this.heroair.y;
            }
        }
        else if(etype == egret.TouchEvent.TOUCH_MOVE) {
            if(!this.beginpoint || !this.heroair || !this.heropoint) {
                return;
            }
            var stageWidth:number = egret.MainContext.instance.stage.stageWidth;
            var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
            var mX:number = event.localX - this.beginpoint.x + this.heropoint.x;
            var mY:number = event.localY - this.beginpoint.y + this.heropoint.y;
            mX = Math.max(0, mX);
            mX = Math.min(stageWidth - this.heroair.width, mX);
            mY = Math.max(0, mY);
            mY = Math.min(stageHeight - this.heroair.height, mY);
            this.heroair.x = mX;
            this.heroair.y = mY;
        }
    }

    private resetPanel():void {
        var scorelabel:egret.gui.BitmapLabel = this.maingameView.score_bitmaplabel;
        if(scorelabel) {
            scorelabel.text = "0";
        }
    }
}