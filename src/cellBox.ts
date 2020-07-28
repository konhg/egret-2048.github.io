class cellBox extends eui.UILayer {
	private shape: egret.Shape = new egret.Shape();
	private textField: egret.TextField = new egret.TextField();
	private cellWidth: number = 106;
	private cellHeight: number = 106;
	private cellColor: Object = {
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
	}
	public score: number = 0;
	public arrI: number;
	public arrJ: number;
	public constructor() {
		super();
		this.$setWidth(this.cellWidth);
		this.$setHeight(this.cellHeight);
		this.addChild(this.shape);
		this.shape.touchEnabled = false;
		this.addChild(this.textField);
		this.textField.touchEnabled = false;
		this.textField.width = this.width;
		this.textField.height = this.height;
		this.textField.bold = true;
		this.textField.textAlign = egret.HorizontalAlign.CENTER;
		this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.textField.textColor = 0x776e65;
		this.textField.size = 50;
		this.textField.text = "";
	}
	public create(x, y, i, j, num: number): void {
		var shape: egret.Shape = this.shape;
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
		} else {
			this.textField.text = "";
		}
	}
	public moveCell(x, y, i, j, num: number, removethis: boolean): number {
		let ax = x + (this.cellWidth / 2) + (i * this.cellWidth + i * Main.spacing);
		let ay = y + (this.cellHeight / 2) + (j * this.cellHeight + j * Main.spacing);
		this.arrI = i;
		this.arrJ = j;
		var spacing: boolean;
		spacing = this.score != num;
		this.score = num;
		egret.Tween.get(this).to({ x: ax, y: ay }, 200).call(() => {
			var shape: egret.Shape = this.shape;
			shape.graphics.clear();
			shape.graphics.beginFill(this.cellColor[this.score].bg);
			shape.graphics.lineStyle(2, this.cellColor[this.score].bg);
			shape.graphics.drawRoundRect((this.stage.stageWidth >> 1) - this.cellWidth / 2, (this.stage.stageHeight >> 1) - this.cellHeight / 2, this.cellWidth, this.cellHeight, 15);
			shape.graphics.endFill();
		}, this).call(() => {
			if (removethis) {
				this.removeCell();
			}
		}, this).call(() => {
			// if (this.score != num) {
			this.textField.text = this.score + "";
			this.textField.textColor = this.cellColor[this.score].color;
			this.textField.size = this.cellColor[this.score].size;
			// egret.Tween.get(this).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1, scaleY: 1 }, 1)
			// }
		}, this)

		if (spacing) {
			return this.score;
		} else {
			return 0;
		}
	}
	public removeCell(): void {
		this.shape.graphics.clear();
		this.removeChild(this.shape);
		this.removeChild(this.textField);
		this.parent.removeChild(this);
	}
}