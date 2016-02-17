/**
 * Created by Administrator on 5/12 0012.
 */
class GameContextMediator extends puremvc.Mediator{
    public static NAME:string = "GameContextMediator";

    public constructor(viewComponent:any) {
        super(GameContextMediator.NAME, viewComponent);
    }

    public listNotificationInterests():Array<string> {
        return [
            GameContextProxy.ADDHERO,
            GameContextProxy.ADDENEMY,
            GameContextProxy.REMOVEENEMY,
            GameContextProxy.ADDBULLET,
            GameContextProxy.REMOVEBULLET
        ];
    }

    public handleNotification(notification: puremvc.INotification):void {
        var gamecontext:GameContext = this.gameContext;
        var notifibody:any = notification.getBody();
        switch (notification.getName()) {
            case GameContextProxy.ADDHERO:
                if(gamecontext) {
                    gamecontext.addHero(<Airplain>notifibody);
                }
                break;
            case GameContextProxy.ADDENEMY:
                if(gamecontext) {
                    gamecontext.addEnemy(<Airplain>notifibody);
                }
                break;
            case GameContextProxy.REMOVEENEMY:
                if(gamecontext) {
                    gamecontext.removeEnemy(<Airplain>notifibody);
                }
                break;
            case GameContextProxy.ADDBULLET:
                if(gamecontext) {
                    gamecontext.addBullet(<egret.Bitmap>notifibody);
                }
                break;
            case GameContextProxy.REMOVEBULLET:
                if(gamecontext) {
                    gamecontext.removeBullet(<egret.Bitmap>notifibody);
                }
                break;
        }
    }

    public get gameContext():GameContext {
        return <GameContext><any>this.viewComponent;
    }

    public startGame():void {
        this.gameContext.startGame();
    }
}