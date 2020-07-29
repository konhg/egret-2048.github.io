var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainUI = /** @class */ (function (_super) {
    __extends(MainUI, _super);
    function MainUI(mian) {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.textField = new egret.TextField();
        _this.cellArray = [];
        _this.lastX = 0;
        _this.lastY = 0;
        _this.istouch = true; //屏蔽连续点击
        _this.moveCount = 0; //大于0表示有格子移动
        _this.lastCellArray = [];
        _this.width = mian.stage.stageWidth;
        _this.height = mian.stage.stageHeight;
        _this.addChild(_this.shape);
        for (var i = 0; i <= Main.horizontally; i++) {
            _this.cellArray[i] = [];
            for (var j = 0; j <= Main.landscape; j++) {
                _this.cellArray[i].push(null);
            }
        }
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        // this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        document.addEventListener("keydown", _this.onKeyup.bind(_this));
        _this.addChild(_this.textField);
        _this.textField.y = ((mian.stage.stageHeight - Main.heightBG) >> 2) - 30;
        return _this;
    }
    /**键盘事件 */
    MainUI.prototype.onKeyup = function (e) {
        if (!this.istouch) {
            return;
        }
        this.moveCount = 0;
        this.istouch = false;
        switch (e.keyCode) {
            case 37: //left
                this.mergeAndMove("left");
                break;
            case 38: //up
                this.mergeAndMove("up");
                break;
            case 39: //right
                this.mergeAndMove("right");
                break;
            case 40: //down
                this.mergeAndMove("down");
                break;
            case 90:
                this.returnLast();
                break;
            default:
                this.istouch = true;
                console.log("无效按键:" + e.keyCode);
                break;
        }
    };
    // private onTouchCancle(): void {
    // 	this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    // }
    MainUI.prototype.onTouchBegin = function (evt) {
        this.lastX = evt.stageX;
        this.lastY = evt.stageY;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    //判断滑动
    MainUI.prototype.onTouchEnd = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        if (!this.istouch) {
            return;
        }
        this.moveCount = 0;
        this.istouch = false;
        var x = evt.stageX, y = evt.stageY;
        var differenceX = Math.abs(this.lastX - x), differenceY = Math.abs(this.lastY - y);
        if (differenceX == 0 && differenceY == 0) {
            console.log("无效点击");
            this.istouch = true;
            return;
        }
        if (x >= this.lastX && y <= this.lastY) {
            //第一象限
            if (differenceX > differenceY) {
                this.mergeAndMove("right");
            }
            else {
                this.mergeAndMove("up");
            }
        }
        else if (x >= this.lastX && y >= this.lastY) {
            //第四象限
            if (differenceX > differenceY) {
                this.mergeAndMove("right");
            }
            else {
                this.mergeAndMove("down");
            }
        }
        else if (x <= this.lastX && y <= this.lastY) {
            //第二象限
            if (differenceX > differenceY) {
                this.mergeAndMove("left");
            }
            else {
                this.mergeAndMove("up");
            }
        }
        else if (x <= this.lastX && y >= this.lastY) {
            //第三象限
            if (differenceX > differenceY) {
                this.mergeAndMove("left");
            }
            else {
                this.mergeAndMove("down");
            }
        }
    };
    /**撤销 */
    MainUI.prototype.returnLast = function () {
        if (this.lastCellArray.length <= 0) {
            this.istouch = true;
            return;
        }
        var arr = this.lastCellArray.pop();
        for (var j = 0; j < arr.length; j++) { // 上下不等
            for (var i = 0; i < arr[j].length; i++) {
                if (this.cellArray[j][i]) {
                    this.cellArray[j][i].removeCell();
                }
                this.cellArray[j][i] = null;
                if (arr[j][i] > 0) {
                    this.cellArray[j][i] = this.createcell(j, i, arr[j][i]);
                }
            }
        }
        arr = null;
        this.istouch = true;
    };
    MainUI.prototype.pushlastArray = function (arr) {
        var re = [];
        for (var i = 0; i < arr.length; i++) {
            re[i] = [];
            for (var j = 0; j < arr[i].length; j++) {
                if (arr[i][j]) {
                    re[i].push(arr[i][j].score);
                }
                else {
                    re[i].push(0);
                }
            }
        }
        this.lastCellArray.push(re);
    };
    //按方向遍历列表列表
    MainUI.prototype.mergeAndMove = function (str) {
        this.pushlastArray(this.cellArray);
        var cell;
        switch (str) {
            case "up":
            case "right":
                for (var i = this.cellArray.length; i > 0;) {
                    --i;
                    for (var j = 0; j < this.cellArray[i].length; j++) {
                        cell = this.cellArray[i][j];
                        if (cell) {
                            this.getmergeAndMovecellList(cell, str);
                        }
                    }
                }
                break;
            case "down":
            case "left":
                for (var i = 0; i < this.cellArray.length; i++) {
                    for (var j = this.cellArray[i].length; j > 0;) {
                        cell = this.cellArray[i][--j];
                        if (cell) {
                            this.getmergeAndMovecellList(cell, str);
                        }
                    }
                }
                break;
        }
        if (this.moveCount > 0) {
            egret.Tween.get(this).wait(400).call(this.createBox, this);
        }
        else {
            this.istouch = true;
        }
    };
    /**判断移动合并的核心逻辑 */
    MainUI.prototype.getmergeAndMovecellList = function (cell, str) {
        var x = 0, y = 0, contraryx = 0, contraryy = 0;
        switch (str) {
            case "up":
                y = -1;
                contraryy = 1;
                break;
            case "down":
                y = 1;
                contraryy = -1;
                break;
            case "left":
                x = -1;
                contraryx = 1;
                break;
            case "right":
                x = 1;
                contraryx = -1;
                break;
        }
        var cX = cell.arrI, cY = cell.arrJ, cellT, isScore = cell.score;
        var sX = cX, sY = cY, tX = cX, tY = cY;
        var cellS = cell;
        //寻找落点
        while (true) {
            cX += x;
            cY += y;
            if (cX < 0 || cX > Main.horizontally || cY < 0 || cY > Main.landscape) {
                break;
            }
            cellT = this.cellArray[cX][cY];
            if (cellT) {
                tX = cX - x;
                tY = cY - y;
                break;
            }
            if (str == "up" || str == "down") {
                if (cY == 0 || cY == Main.landscape) {
                    tX = cX;
                    tY = cY;
                    break;
                }
            }
            if (str == "left" || str == "right") {
                if (cX == 0 || cX == Main.horizontally) {
                    tX = cX;
                    tY = cY;
                    break;
                }
            }
        }
        cX = cell.arrI, cY = cell.arrJ;
        //寻找加分
        while (true) {
            cX += contraryx;
            cY += contraryy;
            if (cX < 0 || cX > Main.horizontally || cY < 0 || cY > Main.landscape) {
                break;
            }
            cellT = this.cellArray[cX][cY];
            if (cellT) {
                if (cellT.score == cell.score) {
                    isScore = cellT.score * 2;
                    sX = cX;
                    sY = cY;
                }
                break;
            }
            if (str == "up" || str == "down") {
                if (cY == 0 || cY == Main.landscape) {
                    break;
                }
            }
            if (str == "left" || str == "right") {
                if (cX == 0 || cX == Main.horizontally) {
                    break;
                }
            }
        }
        if (tX != cell.arrI || tY != cell.arrJ || cell.score != isScore) {
            this.moveCount++;
        }
        cellS = this.cellArray[sX][sY];
        this.cellArray[sX][sY] = null;
        this.textField.text = "" + (Number(this.textField.text) + cellS.moveCell(this.pointX, this.pointY, tX, tY, isScore, false));
        if (cell.score != isScore) {
            this.cellArray[cell.arrI][cell.arrJ] = null;
            cell.moveCell(this.pointX, this.pointY, tX, tY, isScore, true);
        }
        this.cellArray[tX][tY] = cellS;
    };
    /**判断结束 */
    MainUI.prototype.isOver = function () {
        if (this.directionIsHave()) {
            var over = new egret.TextField();
            over.width = this.stage.stageWidth;
            over.height = this.stage.stageHeight;
            over.textAlign = egret.HorizontalAlign.CENTER;
            over.verticalAlign = egret.VerticalAlign.MIDDLE;
            over.size = 50;
            over.textColor = 0xff0000;
            over.text = "你已走投无路，请重新开始";
            this.addChild(over);
            return true;
        }
        return false;
        ;
    };
    //判断方向无可移动
    MainUI.prototype.directionIsHave = function () {
        for (var i = 0; i < this.cellArray.length; i++) // 左右不等
            for (var j = 1; j < this.cellArray[i].length; j++) {
                if (!this.cellArray[i][j - 1] || !this.cellArray[i][j]) {
                    return false;
                }
                if (this.cellArray[i][j].score == this.cellArray[i][j - 1].score)
                    return false;
            }
        for (var j = 0; j < this.cellArray.length; j++) // 上下不等
            for (var i = 1; i < this.cellArray[j].length; i++) {
                if (!this.cellArray[i - 1][j] || !this.cellArray[i][j]) {
                    return false;
                }
                if (this.cellArray[i][j].score == this.cellArray[i - 1][j].score)
                    return false;
            }
        return true;
    };
    /**创建背景*/
    MainUI.prototype.createBg = function () {
        var shape = this.shape;
        shape.graphics.beginFill(0x776e65);
        shape.graphics.lineStyle(2, 0x776e65);
        shape.graphics.drawRoundRect((this.stage.stageWidth >> 1) - Main.widthBG / 2, (this.stage.stageHeight >> 1) - Main.heightBG / 2, Main.widthBG, Main.heightBG, 30);
        shape.graphics.endFill();
        this.pointX = ((this.stage.stageWidth - Main.widthBG) >> 1) + Main.spacing; //(Main.widthBG / 2 - Main.spacing);
        this.pointY = ((this.stage.stageHeight - Main.heightBG) >> 1) + Main.spacing;
        this.textField.width = this.stage.stageWidth;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.size = 70;
        this.textField.fontFamily = "HeiTi";
        // this.textField.x = this.stage.width / 2 - this.textField.width / 2;
        this.textField.textColor = 0x776e65;
        this.textField.text = "0";
    };
    /**创建背景格子并随机创建格子 */
    MainUI.prototype.createCell = function () {
        for (var i = 0; i < this.cellArray.length; i++) {
            for (var j = 0; j < this.cellArray[i].length; j++) {
                this.createcell(i, j, 0);
            }
        }
        this.createBox(2);
        // this.testcreateBox();
    };
    MainUI.prototype.testcreateBox = function () {
        var f = 2;
        for (var j = 0; j < this.cellArray.length; j++) { // 上下不等
            for (var i = 0; i < this.cellArray[j].length; i++) {
                f *= 2;
                this.cellArray[j][i] = this.createcell(j, i, f);
            }
        }
        // this.cellArray[0][0] = this.createcell(0, 0, 2);
        // this.cellArray[0][1] = this.createcell(0, 1, 4);
        // this.cellArray[0][2] = this.createcell(0, 2, 8);
        // this.cellArray[0][3] = this.createcell(0, 3, 16);
        // this.cellArray[2][0] = this.createcell(2, 0, 32);
        // this.cellArray[2][1] = this.createcell(2, 1, 64);
        // this.cellArray[2][2] = this.createcell(2, 2, 128);
        // this.cellArray[2][3] = this.createcell(2, 3, 256);
        // this.cellArray[1][0] = this.createcell(1, 0, 512);
        // this.cellArray[1][1] = this.createcell(1, 1, 1024);
        // this.cellArray[1][2] = this.createcell(1, 2, 2048);
        // this.cellArray[1][3] = this.createcell(1, 3, 4096);
        // this.cellArray[3][0] = this.createcell(3, 0, 8192);
        // this.cellArray[3][1] = this.createcell(3, 1, 16384);
        // this.cellArray[3][2] = this.createcell(3, 2, 32768);
        // this.cellArray[3][3] = this.createcell(3, 3, 65536);
        // this.cellArray[3][4] = this.createcell(3, 4, 131072);
        // this.cellArray[3][5] = this.createcell(3, 5, 262144);
        // this.cellArray[4][5] = this.createcell(4, 5, 524288);
        // this.cellArray[5][5] = this.createcell(5, 5, 1048576);
        this.isOver();
    };
    /**创建新格子 */
    MainUI.prototype.createBox = function (count /*创建格子的数量*/, score /*创建格子的分数*/) {
        if (count === void 0) { count = 1; }
        if (score === void 0) { score = 2; }
        var cot = count, cell;
        while (cot > 0) {
            var x = this.getrandom(0, this.cellArray.length - 1);
            var y = this.getrandom(0, this.cellArray[0].length - 1);
            cell = this.cellArray[x][y];
            if (cell) {
                if (cell.score == 0) {
                    cot--;
                    this.cellArray[x][y] = this.createcell(x, y, score);
                }
            }
            else {
                cot--;
                this.cellArray[x][y] = this.createcell(x, y, score);
            }
        }
        if (this.isOver()) {
            return;
        }
        this.istouch = true;
    };
    MainUI.prototype.createcell = function (x, y, score) {
        var cell = new cellBox();
        this.addChild(cell);
        cell.create(this.pointX, this.pointY, x, y, score);
        return cell;
    };
    MainUI.prototype.getrandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return MainUI;
}(eui.UILayer));
