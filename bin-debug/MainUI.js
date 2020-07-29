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
    function MainUI() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.textField = new egret.TextField();
        _this.cellArray = [];
        _this.lastX = 0;
        _this.lastY = 0;
        _this.istouch = true; //屏蔽连续点击
        _this.moveCount = 0; //大于0表示有格子移动
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
            default:
                this.istouch = true;
                console.log("无效按键");
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
    MainUI.prototype.mergeAndMove = function (str) {
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
    /**创建背景*/
    MainUI.prototype.createBg = function () {
        var shape = this.shape;
        shape.graphics.beginFill(0x776e65);
        shape.graphics.lineStyle(2, 0x776e65);
        shape.graphics.drawRoundRect((this.stage.stageWidth >> 1) - Main.widthBG / 2, (this.stage.stageHeight >> 1) - Main.heightBG / 2, Main.widthBG, Main.heightBG, 30);
        shape.graphics.endFill();
        this.pointX = 0 - (Main.widthBG / 2 - Main.spacing);
        this.pointY = 0 - (Main.heightBG / 2 - Main.spacing);
        this.textField.width = this.stage.stageWidth;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.size = 70;
        this.textField.y = 200;
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
    };
    MainUI.prototype.testcreateBox = function () {
        this.cellArray[0][0] = this.createcell(0, 0, 2);
        this.cellArray[0][1] = this.createcell(0, 1, 4);
        // this.cellArray[0][2] = this.createcell(0, 2, 2);
        this.cellArray[0][3] = this.createcell(0, 3, 2);
    };
    /**创建新格子 */
    MainUI.prototype.createBox = function (count, score) {
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
                    this.cellArray[x][y] = this.createcell(x, y, 2);
                }
            }
            else {
                cot--;
                this.cellArray[x][y] = this.createcell(x, y, 2);
            }
        }
        this.istouch = true;
    };
    MainUI.prototype.createcell = function (x, y, score) {
        var cell = new cellBox();
        this.addChild(cell);
        cell.create(this.pointX, this.pointY, x, y, score);
        cell.name = score + "";
        return cell;
    };
    MainUI.prototype.getrandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return MainUI;
}(eui.UILayer));
