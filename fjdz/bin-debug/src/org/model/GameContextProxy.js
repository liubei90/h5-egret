/**
 * Created by Administrator on 5/12 0012.
 */
var GameContextProxy = (function (_super) {
    __extends(GameContextProxy, _super);
    function GameContextProxy() {
        _super.call(this, GameContextProxy.NAME);
        this.airqueue = [];
        this.enemycount = 0;
        this.enemytimer = new egret.Timer(1000);
        this.speedcount = 0;
        this.updatetimer = new egret.Timer(20);
        this.bulletTimer = new egret.Timer(300);
        this.destoryTimer = new egret.Timer(100);
        this.bulletqueue = [];
        this.bulletspeed = 35;
        this.destoryairqueue = [];
        this.destorybulqueue = [];
        this.gamestop = false;
        this.gamescore = 0;
        this.enemytimer.addEventListener(egret.TimerEvent.TIMER, this.onEnemyTimer, this);
        this.updatetimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateTimer, this);
        this.bulletTimer.addEventListener(egret.TimerEvent.TIMER, this.onBulletTimer, this);
        this.destoryTimer.addEventListener(egret.TimerEvent.TIMER, this.destoryAnimation, this);
    }
    var __egretProto__ = GameContextProxy.prototype;
    __egretProto__.startGame = function () {
        if (!this.heroair) {
            this.heroair = new Airplain();
            this.heroair.setAirType(1);
        }
        this.heroair.x = egret.MainContext.instance.stage.stageWidth * 0.5 - this.heroair.width * 0.5;
        this.heroair.y = egret.MainContext.instance.stage.stageHeight - this.heroair.height - 50;
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
    };
    __egretProto__.clearnElement = function () {
        while (this.airqueue.length > 0) {
            var cair = this.airqueue.shift();
            Airplain.destoryAirplain(cair);
        }
        while (this.bulletqueue.length > 0) {
            var cbul = this.bulletqueue.shift();
            GameContextProxy.removeBullet(cbul);
        }
        while (this.destoryairqueue.length > 0) {
            var dair = this.destoryairqueue.shift();
            Airplain.destoryAirplain(dair);
        }
        while (this.destorybulqueue.length > 0) {
            var dbul = this.destorybulqueue.shift();
            GameContextProxy.removeBullet(dbul);
        }
    };
    __egretProto__.stopGame = function () {
        this.enemytimer.stop();
        this.updatetimer.stop();
        this.bulletTimer.stop();
        this.destoryTimer.stop();
    };
    __egretProto__.onEnemyTimer = function () {
        if (this.airqueue.length > 5) {
            return;
        }
        this.enemycount++;
        if (this.enemycount % 3 == 0) {
            var mair = Airplain.getAirplain(3);
            mair.x = Math.random() * (egret.MainContext.instance.stage.stageWidth - mair.width);
            mair.y = -200;
            this.airqueue.push(mair);
            this.sendNotification(GameContextProxy.ADDENEMY, mair);
        }
        else if (this.enemycount % 10 == 0) {
            var bair = Airplain.getAirplain(4);
            bair.x = Math.random() * (egret.MainContext.instance.stage.stageWidth - bair.width);
            bair.y = -200;
            this.airqueue.push(bair);
            this.sendNotification(GameContextProxy.ADDENEMY, bair);
        }
        else {
            var nair = Airplain.getAirplain(2);
            nair.x = Math.random() * (egret.MainContext.instance.stage.stageWidth - nair.width);
            nair.y = -200;
            this.airqueue.push(nair);
            this.sendNotification(GameContextProxy.ADDENEMY, nair);
        }
        this.speedcount++;
        if (this.speedcount % 15 == 0) {
            Airplain.addAirSpeed();
        }
    };
    __egretProto__.onBulletTimer = function () {
        var hX = this.heroair.x;
        var hY = this.heroair.y;
        var nbul = GameContextProxy.getBullet();
        nbul.x = hX + this.heroair.width * 0.5 - nbul.width * 0.5;
        nbul.y = hY - nbul.height;
        this.bulletqueue.push(nbul);
        this.sendNotification(GameContextProxy.ADDBULLET, nbul);
    };
    __egretProto__.onUpdateTimer = function () {
        var deadairArr = [];
        for (var i = 0; i < this.airqueue.length; i++) {
            var cair = this.airqueue[i];
            cair.updatePos();
            if (this.checkAirRange(cair)) {
                deadairArr.push(cair);
            }
        }
        while (deadairArr.length > 0) {
            var dair = deadairArr.shift();
            var index = this.airqueue.indexOf(dair);
            if (index >= 0) {
                this.airqueue.splice(index, 1);
                this.sendNotification(GameContextProxy.REMOVEENEMY, dair);
                Airplain.destoryAirplain(dair);
            }
        }
        var deadbulArr = [];
        for (var j = 0; j < this.bulletqueue.length; j++) {
            var cbul = this.bulletqueue[j];
            this.updateBulletPos(cbul);
            if (this.checkBulletRange(cbul)) {
                deadbulArr.push(cbul);
            }
        }
        while (deadbulArr.length) {
            var dbul = deadbulArr.shift();
            var bulindex = this.bulletqueue.indexOf(dbul);
            if (bulindex >= 0) {
                this.bulletqueue.splice(bulindex, 1);
                this.sendNotification(GameContextProxy.REMOVEBULLET, dbul);
                GameContextProxy.removeBullet(dbul);
            }
        }
        var crashBul = [];
        for (var m = 0; m < this.bulletqueue.length; m++) {
            var mbul = this.bulletqueue[m];
            for (var n = 0; n < this.airqueue.length; n++) {
                var nair = this.airqueue[n];
                if (this.checkCrash(nair, mbul)) {
                    crashBul.push(mbul);
                    if (nair.checkDead()) {
                        this.gamescore += nair.getAirscore();
                        this.sendNotification(GameContextProxy.ADDGAMESCORE, this.gamescore);
                        this.airqueue.splice(n, 1);
                        this.destoryairqueue.push(nair);
                        break;
                    }
                }
            }
        }
        while (crashBul.length) {
            var crabul = crashBul.shift();
            var craindex = this.bulletqueue.indexOf(crabul);
            if (craindex >= 0) {
                this.bulletqueue.splice(craindex, 1);
                this.destorybulqueue.push(crabul);
            }
        }
        for (var l = 0; l < this.airqueue.length; l++) {
            var lair = this.airqueue[l];
            if (this.checkHero(lair, this.heroair)) {
                this.airqueue.splice(l, 1);
                this.gamestop = true;
                this.destoryairqueue.push(lair);
                this.bulletTimer.stop();
            }
        }
    };
    __egretProto__.checkAirRange = function (a) {
        var res = false;
        var deadline = egret.MainContext.instance.stage.stageHeight;
        if (a.y > deadline) {
            res = true;
        }
        return res;
    };
    GameContextProxy.getBullet = function () {
        var res;
        if (GameContextProxy.bulletpool.length > 0) {
            res = GameContextProxy.bulletpool.shift();
        }
        else {
            res = new egret.Bitmap();
        }
        res.texture = RES.getRes("cartridge_png");
        return res;
    };
    GameContextProxy.removeBullet = function (b) {
        if (GameContextProxy.bulletpool.indexOf(b) < 0) {
            GameContextProxy.bulletpool.push(b);
        }
    };
    __egretProto__.updateBulletPos = function (b) {
        b.y = b.y - this.bulletspeed;
    };
    __egretProto__.checkBulletRange = function (b) {
        var res = false;
        if (b.y < -b.height) {
            res = true;
        }
        return res;
    };
    __egretProto__.checkCrash = function (a, b) {
        var res = false;
        var rta = a.getBounds();
        var rtb = b.getBounds();
        rta.x = a.x + a.width * 0.1;
        rta.y = a.y + a.height * 0.1;
        rta.width = rta.width * 0.8;
        rta.height = rta.height * 0.8;
        rtb.x = b.x;
        rtb.y = b.y;
        res = rta.intersects(rtb);
        return res;
    };
    __egretProto__.checkHero = function (a, b) {
        var res = false;
        var rta = a.getBounds();
        var rtb = b.getBounds();
        rta.x = a.x + a.width * 0.1;
        rta.y = a.y + a.height * 0.1;
        rta.width = rta.width * 0.8;
        rta.height = rta.height * 0.8;
        rtb.x = b.x + b.width * 0.1;
        rtb.y = b.y + b.height * 0.1;
        rtb.width = rtb.width * 0.8;
        rtb.height = rtb.height * 0.8;
        res = rta.intersects(rtb);
        return res;
    };
    __egretProto__.destoryAnimation = function () {
        var deadairArr = [];
        for (var i = 0; i < this.destoryairqueue.length; i++) {
            var cair = this.destoryairqueue[i];
            if (cair.animationDestory()) {
                deadairArr.push(cair);
            }
        }
        while (deadairArr.length > 0) {
            var dair = deadairArr.shift();
            var dAindex = this.destoryairqueue.indexOf(dair);
            if (dAindex >= 0) {
                this.destoryairqueue.splice(dAindex, 1);
                this.sendNotification(GameContextProxy.REMOVEENEMY, dair);
                Airplain.destoryAirplain(dair);
            }
        }
        var deadbulArr = [];
        for (var j = 0; j < this.destorybulqueue.length; j++) {
            var cbul = this.destorybulqueue[j];
            if (this.animationBulDestory(cbul)) {
                deadbulArr.push(cbul);
            }
        }
        while (deadbulArr.length > 0) {
            var dbul = deadbulArr.shift();
            var dBulindex = this.destorybulqueue.indexOf(dbul);
            if (dBulindex >= 0) {
                this.destorybulqueue.splice(dBulindex, 1);
                GameContextProxy.removeBullet(dbul);
                this.sendNotification(GameContextProxy.REMOVEBULLET, dbul);
            }
        }
        if (this.gamestop) {
            if (this.heroair.animationDestory()) {
                this.heroair.setAirType(1);
                this.stopGame();
                this.sendNotification(GameScreenCommand.CHANGE_VIEW, 2);
                this.sendNotification(GameContextProxy.SETRESULT, this.gamescore);
            }
        }
    };
    __egretProto__.animationBulDestory = function (d) {
        var res = false;
        var t = RES.getRes("die2_png");
        if (d.texture == t) {
            res = true;
        }
        else {
            d.texture = t;
        }
        return res;
    };
    GameContextProxy.NAME = "GameContextProxy";
    GameContextProxy.ADDHERO = "addhero";
    GameContextProxy.ADDENEMY = "addenemy";
    GameContextProxy.REMOVEENEMY = "removeenemy";
    GameContextProxy.ADDBULLET = "addbullet";
    GameContextProxy.REMOVEBULLET = "removebullet";
    GameContextProxy.ADDGAMESCORE = "addgamescore";
    GameContextProxy.SETRESULT = "setresult";
    GameContextProxy.bulletpool = [];
    return GameContextProxy;
})(puremvc.Proxy);
GameContextProxy.prototype.__class__ = "GameContextProxy";
