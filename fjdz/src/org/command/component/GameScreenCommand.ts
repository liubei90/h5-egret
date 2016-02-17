/**
 * Created by Administrator on 5/11 0011.
 */
class GameScreenCommand extends puremvc.SimpleCommand {
    public static CHANGE_VIEW:string = "changview";


    public constructor() {
        super();
    }

    public execute(notification: puremvc.INotification):void {
        var notifi:string = notification.getName();
        switch (notifi) {
            case GameScreenCommand.CHANGE_VIEW: {
                var changenum:number = notification.getBody();
                var appmediator:GuiLayerMediator = <GuiLayerMediator><any>this.facade.retrieveMediator(GuiLayerMediator.NAME);
                if(appmediator) {
                    appmediator.changeScreen(changenum);
                }
                break;
            }
        }
    }

    public regist():void {
        this.facade.registerCommand(GameScreenCommand.CHANGE_VIEW, GameScreenCommand);
    }
}