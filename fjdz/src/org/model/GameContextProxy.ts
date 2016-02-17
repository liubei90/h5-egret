/**
 * Created by Administrator on 5/12 0012.
 */
class GameContextProxy extends puremvc.Proxy implements puremvc.IProxy {
    public static NAME:string = "GameContextProxy";

    public static ADDHERO:string = "addhero";
    public static ADDENEMY:string = "addenemy";
    public static REMOVEENEMY:string = "removeenemy";
    public static ADDBULLET:string = "addbullet";
    public static REMOVEBULLET:string = "removebullet";
    public static ADDGAMESCORE:string = "addgamescore";
    public static SETRESULT:string = "setresult";

    private airqueue:Airplain[] = [];
    private heroair:Airplain;
    private enemycount:number = 0;
    private enemytimer:egret.Timer = new egret.Timer(1000);
    private speedcount:number = 0;
    private updatetimer:egret.Timer = new egret.Timer(20);
    private bulletTimer:egret.Timer = new egret.Timer(300);
    private destoryTimer:egret.Timer = new egret.Timer(100);
    private bulletqueue:egret.Bitmap[] = [];
    private static bulletpool:egret.Bitmap[] = [];
    private bulletspeed:number = 35;
    private destoryairqueue:Airplain[] = [];
    private destorybulqueue:egret.Bitmap[] = [];
    private gamestop:boolean = false;
    private gamescore:number = 0;

    public constructor() {
        super(GameContextProxy.NAME);
        this.enemytimer.addEventListener(egret.TimerEvent.TIMER, this.onEnemyTimer , this);
        this.updatetimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateTimer , this);
        this.bulletTimer.addEventListener(egret.TimerEvent.TIMER, this.onBulletTimer, this);
        this.destoryTimer.addEventListener(egret.TimerEvent.TIMER, this.destoryAnimation, this)
    }

    public startGame():void {
        if(!this.heroair) {
            this.heroair = new Airplain();
            this.heroair.setAirType(1);
        }
        this.heroair.x = egret.MainContext.instance.stage.stageWidth*0.5 - this.heroair.width*0.5;
        this.heroair.y = egret.MainContext.instance.stage.stageHeight-this.heroair.height-50;
        this.sendNotification(GameContextProxy.ADDHERO, this.heroair);


        this.clearnElement();

        this.airqueue = [];
        this.bulletqueue = [];
        this.gamestop = false;
        this.destoryairqueue = [];
        this.destorybulqueue = [];
        this.gamescore = 0;
        Airplain.resetAirSpeed();
        this.enemytimer.start();
        this.updatetimer.start();
        this.bulletTimer.start();
        this.destoryTimer.start();
    }

    private clearnElement():void {
        while(this.airqueue.length > 0) {
            var cair:Airplain = this.airqueue.shift();
            Airplain.destoryAirplain(cair);
        }
        while(this.bulletqueue.length > 0) {
            var cbul:egret.Bitmap = this.bulletqueue.shift();
            GameContextProxy.removeBullet(cbul);
        }
        while(this.destoryairqueue.length > 0) {
            var dair:Airplain = this.destoryairqueue.shift();
            Airplain.destoryAirplain(dair);
        }
        while(this.destorybulqueue.length > 0) {
            var dbul:egret.Bitmap = this.destorybulqueue.shift();
            GameContextProxy.removeBullet(dbul);
        }
    }

    public stopGame():void {
        this.enemytimer.stop();
        this.updatetimer.stop();
        this.bulletTimer.stop();
        this.destoryTimer.stop();
    }

    private onEnemyTimer():void {
        if(this.airqueue.length > 5) {
            return;
        }
        this.enemycount++;
        if(this.enemycount%3 == 0) {
            var mair:Airplain = Airplain.getAirplain(3);
            mair.x = Math.random()*(egret.MainContext.instance.stage.stageWidth - mair.width);
            mair.y = -200;
            this.airqueue.push(mair);
            this.sendNotification(GameContextProxy.ADDENEMY, mair);
        }
        else if(this.enemycount%10 == 0) {
            var bair:Airplain = Airplain.getAirplain(4);
            bair.x = Math.random()*(egret.MainContext.instance.stage.stageWidth - bair.width);
            bair.y = -200;
            this.airqueue.push(bair);
            this.sendNotification(GameContextProxy.ADDENEMY, bair);
        }
        else {
            var nair:Airplain = Airplain.getAirplain(2);
            nair.x = Math.random()*(egret.MainContext.instance.stage.stageWidth - nair.width);
            nair.y = -200;
            this.airqueue.push(nair);
            this.sendNotification(GameContextProxy.ADDENEMY, nair);
        }

        this.speedcount++;
        if(this.speedcount%15 == 0) {
            Airplain.addAirSpeed();
        }
    }

    private onBulletTimer():void {
        var hX:number = this.heroair.x;
        var hY:number = this.heroair.y;
        var nbul:egret.Bitmap = GameContextProxy.getBullet();
        nbul.x = hX + this.heroair.width*0.5 - nbul.width*0.5;
        nbul.y = hY - nbul.height;
        this.bulletqueue.push(nbul);
        this.sendNotification(GameContextProxy.ADDBULLET, nbul);
    }

    private onUpdateTimer():void {
        var deadairArr:Airplain[] = [];
        for(var i:number = 0; i < this.airqueue.length; i++) {
            var cair:Airplain = this.airqueue[i];
            cair.updatePos();
            if(this.checkAirRange(cair)) {
                deadairArr.push(cair);
            }
        }

        while(deadairArr.length > 0) {
            var dair:Airplain = deadairArr.shift();
            var index:number = this.airqueue.indexOf(dair);
            if(index >= 0) {
                this.airqueue.splice(index, 1);
                this.sendNotification(GameContextProxy.REMOVEENEMY, dair);
                Airplain.destoryAirplain(dair);
            }
        }

        var deadbulArr:egret.Bitmap[] = [];
        for(var j:number = 0;j <this.bulletqueue.length; j++) {
            var cbul:egret.Bitmap = this.bulletqueue[j];
            this.updateBulletPos(cbul);
            if(this.checkBulletRange(cbul)) {
                deadbulArr.push(cbul);
            }
        }
        while(deadbulArr.length) {
            var dbul:egret.Bitmap = deadbulArr.shift();
            var bulindex:number = this.bulletqueue.indexOf(dbul);
            if(bulindex >= 0) {
                this.bulletqueue.splice(bulindex, 1);
                this.sendNotification(GameContextProxy.REMOVEBULLET, dbul);
                GameContextProxy.removeBullet(dbul);
            }
        }

        var crashBul:egret.Bitmap[] = [];
        for(var m:number = 0; m < this.bulletqueue.length; m++) {
            var mbul:egret.Bitmap = this.bulletqueue[m];
            for(var n:number = 0; n < this.airqueue.length; n++) {
                var nair:Airplain = this.airqueue[n];
                if(this.checkCrash(nair, mbul)) {
                    crashBul.push(mbul);
                    if(nair.checkDead()) {
                        this.gamescore += nair.getAirscore();
                        this.sendNotification(GameContextProxy.ADDGAMESCORE, this.gamescore);
                        this.airqueue.splice(n, 1);
                        this.destoryairqueue.push(nair);
                        break;
                    }
                }
            }
        }
        while(crashBul.length) {
            var crabul:egret.Bitmap = crashBul.shift();
            var craindex:number = this.bulletqueue.indexOf(crabul);
            if(craindex >= 0) {
                this.bulletqueue.splice(craindex, 1);
                this.destorybulqueue.push(crabul);
            }
        }

        for(var l:number = 0; l < this.airqueue.length; l++) {
            var lair:Airplain = this.airqueue[l];
            if(this.checkHero(lair, this.heroair)) {
                this.airqueue.splice(l, 1);
                this.gamestop = true;
                this.destoryairqueue.push(lair);
                this.bulletTimer.stop();
            }
        }
    }

    private checkAirRange(a:Airplain):boolean {
        var res:boolean = false;
        var deadline:number = egret.MainContext.instance.stage.stageHeight;
        if(a.y > deadline) {
            res = true;
        }
        return res;
    }

    public static getBullet():egret.Bitmap {
        var res:egret.Bitmap;
        if(GameContextProxy.bulletpool.length > 0) {
            res = GameContextProxy.bulletpool.shift();
        }
        else {
            res = new egret.Bitmap();
        }
        res.texture = RES.getRes("cartridge_png");
        return res;
    }

    public static removeBullet(b:egret.Bitmap):void {
        if(GameContextProxy.bulletpool.indexOf(b) < 0) {
            GameContextProxy.bulletpool.push(b);
        }
    }

    private updateBulletPos(b:egret.Bitmap):void {
        b.y = b.y - this.bulletspeed;
    }

    private checkBulletRange(b:egret.Bitmap):boolean {
        var res:boolean = false;
        if(b.y < -b.height) {
            res = true;
        }
        return res;
    }

    private checkCrash(a:Airplain, b:egret.Bitmap):boolean {
        var res:boolean = false;
        var rta:egret.Rectangle = a.getBounds();
        var rtb:egret.Rectangle = b.getBounds();
        rta.x = a.x + a.width*0.1;
        rta.y = a.y + a.height*0.1;
        rta.width = rta.width*0.8;
        rta.height = rta.height*0.8;
        rtb.x = b.x;
        rtb.y = b.y;
        res = rta.intersects(rtb);
        return res;
    }

    private checkHero(a:Airplain, b:Airplain):boolean {
        var res:boolean = false;
        var rta:egret.Rectangle = a.getBounds();
        var rtb:egret.Rectangle = b.getBounds();
        rta.x = a.x + a.width*0.1;
        rta.y = a.y + a.height*0.1;
        rta.width = rta.width*0.8;
        rta.height = rta.height*0.8;

        rtb.x = b.x + b.width*0.1;
        rtb.y = b.y + b.height*0.1;
        rtb.width = rtb.width*0.8;
        rtb.height = rtb.height*0.8;

        res = rta.intersects(rtb);
        return res;
    }

    private destoryAnimation():void {
        var deadairArr:Airplain[] = [];
        for(var i:number = 0; i < this.destoryairqueue.length; i++) {
            var cair:Airplain = this.destoryairqueue[i];
            if(cair.animationDestory()) {
                deadairArr.push(cair);
            }
        }
        while(deadairArr.length > 0) {
            var dair:Airplain = deadairArr.shift();
            var dAindex:number = this.destoryairqueue.indexOf(dair);
            if(dAindex >= 0) {
                this.destoryairqueue.splice(dAindex, 1);
                this.sendNotification(GameContextProxy.REMOVEENEMY, dair);
                Airplain.destoryAirplain(dair);
            }
        }

        var deadbulArr:egret.Bitmap[] = [];
        for(var j:number = 0; j < this.destorybulqueue.length; j++) {
            var cbul:egret.Bitmap = this.destorybulqueue[j];
            if(this.animationBulDestory(cbul)) {
                deadbulArr.push(cbul);
            }
        }
        while(deadbulArr.length > 0) {
            var dbul:egret.Bitmap = deadbulArr.shift();
            var dBulindex:number = this.destorybulqueue.indexOf(dbul);
            if(dBulindex >= 0) {
                this.destorybulqueue.splice(dBulindex, 1);
                GameContextProxy.removeBullet(dbul);
                this.sendNotification(GameContextProxy.REMOVEBULLET, dbul);
            }
        }

        if(this.gamestop) {
            if(this.heroair.animationDestory()) {
                this.heroair.setAirType(1);
                this.stopGame();
                this.sendNotification(GameScreenCommand.CHANGE_VIEW, 2);
                this.sendNotification(GameContextProxy.SETRESULT, this.gamescore);
            }
        }
    }

    private animationBulDestory(d:egret.Bitmap):boolean {
        var res:boolean = false;
        var t:egret.Texture = RES.getRes("die2_png");
        if(d.texture == t) {
            res = true;
        }
        else {
            d.texture = t;
        }
        return res;
    }
}