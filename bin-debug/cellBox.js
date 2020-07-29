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
var cellBox = /** @class */ (function (_super) {
    __extends(cellBox, _super);
    function cellBox() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.textField = new egret.TextField();
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
            "1024": { "num": 1024, "color": 0xfff7eb, "bg": 0xedc53f, "size": 45 },
            "2048": { "num": 2048, "color": 0xfff7eb, "bg": 0xeec22e, "size": 45 },
            "4096": { "num": 4096, "color": 0xfff7eb, "bg": 0x3d3a33, "size": 45 },
            "8192": { "num": 8192, "color": 0xfff7eb, "bg": 0x0c0b0a, "size": 45 },
            "16384": { "num": 16384, "color": 0xfff7eb, "bg": 0x0fbcbc, "size": 35 },
            "32768": { "num": 32768, "color": 0xffffff, "bg": 0x0000ff, "size": 35 },
            "65536": { "num": 65536, "color": 0x000000, "bg": 0x00ffff, "size": 35 },
            "131072": { "num": 131072, "color": 0xcc0000, "bg": 0x66ff66, "size": 30 },
            "262144": { "num": 262144, "color": 0xcc0000, "bg": 0x66FF00, "size": 30 },
            "524288": { "num": 524288, "color": 0x00ff00, "bg": 0xff00ff, "size": 30 },
            "1048576": { "num": 1048576, "color": 0x00ff00, "bg": 0xFF0000, "size": 30 },
            "2097152": { "num": 2097152, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "4194304": { "num": 4194304, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "8388608": { "num": 8388608, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "16777216": { "num": 16777216, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "33554432": { "num": 33554432, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "67108864": { "num": 67108864, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "134217728": { "num": 134217728, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "268435456": { "num": 268435456, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "536870912": { "num": 536870912, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "1073741824": { "num": 1073741824, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "2147483648": { "num": 2147483648, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "4294967296": { "num": 4294967296, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "8589934592": { "num": 8589934592, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "17179869184": { "num": 17179869184, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "34359738368": { "num": 34359738368, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "68719476736": { "num": 68719476736, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "137438953472": { "num": 137438953472, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "274877906944": { "num": 274877906944, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "549755813888": { "num": 549755813888, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "1099511627776": { "num": 1099511627776, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "2199023255552": { "num": 2199023255552, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "4398046511104": { "num": 4398046511104, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "8796093022208": { "num": 8796093022208, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "17592186044416": { "num": 17592186044416, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "35184372088832": { "num": 35184372088832, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "70368744177664": { "num": 70368744177664, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "140737488355328": { "num": 140737488355328, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "281474976710656": { "num": 281474976710656, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "562949953421312": { "num": 562949953421312, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "1125899906842624": { "num": 1125899906842624, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "2251799813685248": { "num": 2251799813685248, "color": 0xffffff, "bg": 0x000000, "size": 30 },
            "4503599627370496": { "num": 4503599627370496, "color": 0xffffff, "bg": 0x000000, "size": 30 },
        };
        _this.score = 0;
        _this.width = (Main.cellWidth);
        _this.height = (Main.cellHeight);
        _this.anchorOffsetX = Main.cellWidth >> 1;
        _this.anchorOffsetY = Main.cellHeight >> 1;
        _this.addChild(_this.shape);
        _this.shape.touchEnabled = false;
        _this.addChild(_this.textField);
        _this.textField.touchEnabled = false;
        _this.textField.width = Main.cellWidth;
        _this.textField.height = Main.cellHeight;
        _this.textField.bold = true;
        _this.textField.textAlign = egret.HorizontalAlign.CENTER;
        _this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.textField.textColor = 0x776e65;
        _this.textField.size = 50;
        _this.textField.text = "";
        return _this;
    }
    cellBox.prototype.create = function (x, y, i, j, num) {
        this.name = num + "";
        var shape = this.shape;
        this.arrI = i;
        this.arrJ = j;
        this.pointX = x;
        this.pointY = y;
        this.score = num;
        shape.graphics.beginFill(this.cellColor[this.score].bg);
        shape.graphics.lineStyle(2, this.cellColor[this.score].bg);
        shape.graphics.drawRoundRect(0, 0, Main.cellWidth, Main.cellHeight, Main.spacing);
        shape.graphics.endFill();
        shape.x = Main.cellWidth >> 1;
        shape.y = Main.cellHeight >> 1;
        shape.anchorOffsetX = Main.cellWidth >> 1;
        shape.anchorOffsetY = Main.cellHeight >> 1;
        this.x = this.pointX + (Main.cellWidth / 2) + (this.arrI * Main.cellWidth + this.arrI * Main.spacing);
        this.y = this.pointY + (Main.cellHeight / 2) + (this.arrJ * Main.cellHeight + this.arrJ * Main.spacing);
        this.textField.x = 0; //(this.width >> 1);
        this.textField.y = 0; //(this.height >> 1);
        if (this.score > 0) {
            this.textField.text = this.score + "";
            this.textField.textColor = this.cellColor[this.score].color;
            this.textField.size = this.cellColor[this.score].size;
            this.scaleX = this.scaleY = 0.3;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 180);
        }
        else {
            this.textField.text = "";
        }
    };
    cellBox.prototype.moveCell = function (x, y, i, j, num, removethis) {
        var _this = this;
        this.name = num + "";
        var ax = x + (Main.cellWidth / 2) + (i * Main.cellWidth + i * Main.spacing);
        var ay = y + (Main.cellHeight / 2) + (j * Main.cellHeight + j * Main.spacing);
        this.arrI = i;
        this.arrJ = j;
        this.pointX = x;
        this.pointY = y;
        var spacing;
        spacing = this.score != num;
        this.score = num;
        egret.Tween.get(this).to({ x: ax, y: ay }, 100).call(function () {
            var shape = _this.shape;
            shape.graphics.clear();
            shape.graphics.beginFill(_this.cellColor[_this.score].bg);
            shape.graphics.lineStyle(2, _this.cellColor[_this.score].bg);
            shape.graphics.drawRoundRect(0, 0, Main.cellWidth, Main.cellHeight, 15);
            shape.graphics.endFill();
        }, this).call(function () {
            if (removethis) {
                _this.removeCell();
            }
        }, this).call(function () {
            _this.textField.text = _this.score + "";
            _this.textField.textColor = _this.cellColor[_this.score].color;
            _this.textField.size = _this.cellColor[_this.score].size;
            if (spacing) {
                egret.Tween.get(_this).to({ scaleX: 1.2, scaleY: 1.2 }, 180).to({ scaleX: 1, scaleY: 1 }, 1);
            }
        }, this);
        if (spacing) {
            return this.score;
        }
        else {
            return 0;
        }
    };
    // public refresh(): void {
    // 	var shape: egret.Shape = this.shape;
    // 	shape.graphics.beginFill(this.cellColor[this.score].bg);
    // 	shape.graphics.lineStyle(2, this.cellColor[this.score].bg);
    // 	shape.graphics.drawRoundRect(0, 0, Main.cellWidth, Main.cellHeight, Main.spacing);
    // 	shape.graphics.endFill();
    // 	shape.x = Main.cellWidth >> 1;
    // 	shape.y = Main.cellHeight >> 1;
    // 	shape.anchorOffsetX = Main.cellWidth >> 1;
    // 	shape.anchorOffsetY = Main.cellHeight >> 1;
    // 	this.x = this.pointX + (Main.cellWidth / 2) + (this.arrI * Main.cellWidth + this.arrI * Main.spacing);
    // 	this.y = this.pointY + (Main.cellHeight / 2) + (this.arrJ * Main.cellHeight + this.arrJ * Main.spacing);
    // 	this.textField.x = 0//(this.width >> 1);
    // 	this.textField.y = 0//(this.height >> 1);
    // 	if (this.score > 0) {
    // 		this.textField.text = this.score + "";
    // 		this.textField.textColor = this.cellColor[this.score].color;
    // 		this.textField.size = this.cellColor[this.score].size;
    // 		this.scaleX = this.scaleY = 0.3
    // 		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 180);
    // 	} else {
    // 		this.textField.text = "";
    // 	}
    // }
    cellBox.prototype.removeCell = function () {
        egret.Tween.removeTweens(this);
        this.shape.graphics.clear();
        this.removeChild(this.shape);
        this.removeChild(this.textField);
        this.parent.removeChild(this);
    };
    return cellBox;
}(egret.Sprite));
