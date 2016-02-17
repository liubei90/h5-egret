/**
 * Created by Administrator on 7/1 0001.
 */
var GameLevelInfo = (function () {
    function GameLevelInfo() {
        this.velocity = 1;
        this.matchcount = 4;
        this.direction = 1;
        this.ballcount = 5;
    }
    var __egretProto__ = GameLevelInfo.prototype;
    GameLevelInfo.levelinfo = [{ "velocity": 1, "matchcount": 4, "direction": 1, "ballcount": 5 }, { "velocity": 1, "matchcount": 7, "direction": 1, "ballcount": 5 }];
    return GameLevelInfo;
})();
GameLevelInfo.prototype.__class__ = "GameLevelInfo";
