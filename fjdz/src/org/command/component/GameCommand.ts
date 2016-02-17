/**
 * Created by Administrator on 5/12 0012.
 */
class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand {
    public static STARTGAME:string = "startgame";

    public constructor() {
        super();
    }

    public regist():void {
        this.facade.registerCommand(GameCommand.STARTGAME, GameCommand);
    }

    public execute(notification: puremvc.INotification):void {
        var notifi:string = notification.getName();
        switch (notifi) {
            case GameCommand.STARTGAME:
                var gamecontext:GameContextMediator = <GameContextMediator><any>this.facade.retrieveMediator(GameContextMediator.NAME);
                if(gamecontext) {
                    gamecontext.startGame();
                }
                var contextProxy:GameContextProxy = <GameContextProxy><any>this.facade.retrieveProxy(GameContextProxy.NAME);
                if(contextProxy) {
                    contextProxy.startGame();
                }
                break;
        }
    }
}