/**
 * Created by Administrator on 5/11 0011.
 */
class ControlPrepCommand extends puremvc.SimpleCommand {
    public constructor() {
        super();
    }

    public execute(notification:puremvc.INotification):void{
        (new GameScreenCommand()).regist();
        (new GameCommand()).regist();
    }
}