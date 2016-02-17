/**
 * Created by Administrator on 5/11 0011.
 */
class StartupCommand extends puremvc.MacroCommand{
    public constructor() {
        super();
    }

    public initializeMacroCommand():void{
        this.addSubCommand(ControlPrepCommand);
        this.addSubCommand(ModelPrepCommand);
        this.addSubCommand(ViewPrepCommand);
    }
}