var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var cellBox = (function (_super) {
    __extends(cellBox, _super);
    function cellBox() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.textField = new egret.TextField();
        _this.cellWidth = 106;
        _this.cellHeight = 106;
        _this.cellColor = {
            "0": { "num": 0, "color": 0x7c736a, "bg": 0xcdc1b4, "size": 65 },
            "2": { "num": 2, "color": 0x7c736a, "bg": 0xeee4da, "size": 65 },
            "4": { "num": 4, "color": 0x7c736a, "bg": 0xede0c8, "size": 65 },
            "8": { "num": 8, "color": 0xfff7eb, "bg": 0xf2b179, "size": 65 },
            "16": { "num": 16, "color": 0xfff7eb, "bg": 0xf59563, "size": 62 },
            "32": { "num": 32, "color": 0xfff7eb, "bg": 0xf57c5f, "size": 62 },
            "64": { "num": 64, "color": 0xfff7eb, "bg": 0xf65d3b, "size": 62 },
            "128": { "num": 128, "color": 0xfff7eb, "bg": 0xedce71, "size": 60 },
            "256": { "num": 256, "color": 0xfff7eb, "bg": 0xedcc61, "size": 60 },
            "512": { "num": 512, "color": 0xfff7eb, "bg": 0xecc850, "size": 60 },
            "1024": { "num": 1024, "color": 0xfff7eb, "bg": 0xedc53f, "size": 50 },
            "2048": { "num": 2048, "color": 0xfff7eb, "bg": 0xeec22e, "size": 50 },
            "4096": { "num": 4096, "color": 0xfff7eb, "bg": 0x3d3a33, "size": 50 },
            "8192": { "num": 8192, "color": 0xfff7eb, "bg": 0x0c0b0a, "size": 50 },
            "16384": { "num": 16384, "color": 0xfff7eb, "bg": 0x0fbcbc, "size": 40 },
        };
        _this.score = 0;
        _this.$setWidth(_this.cellWidth);
        _this.$setHeight(_this.cellHeight);
        _this.addChild(_this.shape);
        _this.shape.touchEnabled = false;
        _this.addChild(_this.textField);
        _this.textField.touchEnabled = false;
        _this.textField.width = _this.width;
        _this.textField.height = _this.height;
        _this.textField.bold = true;
        _this.textField.textAlign = egret.HorizontalAlign.CENTER;
        _this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.textField.textColor = 0x776e65;
        _this.textField.size = 50;
        _this.textField.text = "";
        return _this;
    }
    cellBox.prototype.create = function (x, y, i, j, num) {
        var shape = this.shape;
        this.arrI = i;
        this.arrJ = j;
        this.score = num;
        shape.graphics.beginFill(this.cellColor[this.score].bg);
        shape.graphics.lineStyle(2, this.cellColor[this.score].bg);
        shape.graphics.drawRoundRect((this.stage.stageWidth >> 1) - this.cellWidth / 2, (this.stage.stageHeight >> 1) - this.cellHeight / 2, this.cellWidth, this.cellHeight, 15);
        shape.graphics.endFill();
        shape.x = 0;
        shape.y = 0;
        this.x = x + (this.cellWidth / 2) + (i * this.cellWidth + i * Main.spacing);
        this.y = y + (this.cellHeight / 2) + (j * this.cellHeight + j * Main.spacing);
        this.textField.x = (this.stage.stageWidth >> 1) - this.cellWidth / 2;
        this.textField.y = (this.stage.stageHeight >> 1) - this.cellHeight / 2;
        if (this.score > 0) {
            this.textField.text = this.score + "";
            this.textField.textColor = this.cellColor[this.score].color;
            this.textField.size = this.cellColor[this.score].size;
        }
        else {
            this.textField.text = "";
        }
    };
    cellBox.prototype.moveCell = function (x, y, i, j, num, removethis) {
        var _this = this;
        var ax = x + (this.cellWidth / 2) + (i * this.cellWidth + i * Main.spacing);
        var ay = y + (this.cellHeight / 2) + (j * this.cellHeight + j * Main.spacing);
        this.arrI = i;
        this.arrJ = j;
        this.score = num;
        egret.Tween.get(this).to({ x: ax, y: ay }, 300).call(function () {
            var shape = _this.shape;
            shape.graphics.clear();
            shape.graphics.beginFill(_this.cellColor[_this.score].bg);
            shape.graphics.lineStyle(2, _this.cellColor[_this.score].bg);
            shape.graphics.drawRoundRect((_this.stage.stageWidth >> 1) - _this.cellWidth / 2, (_this.stage.stageHeight >> 1) - _this.cellHeight / 2, _this.cellWidth, _this.cellHeight, 15);
            shape.graphics.endFill();
        }, this).call(function () {
            if (removethis) {
                _this.removeCell();
            }
        }, this).call(function () {
            // if (this.score != num) {
            _this.textField.text = _this.score + "";
            _this.textField.textColor = _this.cellColor[_this.score].color;
            _this.textField.size = _this.cellColor[_this.score].size;
            // egret.Tween.get(this).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1, scaleY: 1 }, 1)
            // }
        }, this);
    };
    cellBox.prototype.removeCell = function () {
        this.shape.graphics.clear();
        this.removeChild(this.shape);
        this.removeChild(this.textField);
        this.parent.removeChild(this);
    };
    return cellBox;
}(eui.UILayer));
__reflect(cellBox.prototype, "cellBox");
//# sourceMappingURL=cellBox.js.map