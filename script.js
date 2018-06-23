var canvas = document.getElementById("canvas");

// 描画域をリサイズ
function canvas_resize(){
  var windowInnerWidth = window.innerWidth;
  var windowInnerHeight = window.innerHeight;
  canvas.setAttribute('width',windowInnerWidth);
  canvas.setAttribute('height',windowInnerHeight/2);
}
window.addEventListener('resize', canvas_resize, false);
canvas_resize();

// グローバル変数
var ctx = canvas.getContext("2d");
var ball_r = Math.min(canvas.width/40, canvas.height/40);

// クラス定義

// Pos: 座標
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Person: 人の描画や座標保持など
class Person {
    constructor() {
        this.pos = new Pos(0, canvas.height/2);
        this.ball_r = Math.min(canvas.width/40, canvas.height/40);
    }
    get position() {
        return this.pos.x;
    }
    walk() {
        this.pos.x += 1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.ball_r, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        this.walk();
    }
}

// People: Personのリスト 全体の人数管理など
class People {
    constructor() {
        this.people = [];
    }

    get length() {
        return this.people.length;
    }

    enter() {
        this.people.push(new Person());
    }

    exit() {
        this.people.shift();
    }

    draw() {
        for (var person of this.people) {
            if (person.position >= Cashier.position.x+ball_r)
                this.exit();
            person.draw();
        }
    }
}

// Cashier: レジ
class Cashier {
    constructor() {
        this.height = ball_r * 8;
        this.width = ball_r * 2;
        this.pos = new Pos(canvas.width * 7/8, canvas.height/2 - this.height/2);
    }
    static get position() {
        return new Pos(canvas.width * 7/8, canvas.height/2 - this.height/2);
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#0095DD";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.closePath();
    }
}

// Line: 客の並ぶ列
class Line {
    constructor() {
        this.height = ball_r * 3;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#CCC";
        ctx.fillRect(0, canvas.height/2 - this.height/2, canvas.width, this.height);
        ctx.closePath();
    }
}

// 初期化
function init() {
    people = new People();
    cashier = new Cashier();
    line = new Line();
    //graph = new Graph();
}

// 描画関数
function draw() {
    // 画面クリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 乱数で入店
    var random = Math.floor( Math.random() * 100 );
    if (random == 50)
        people.enter();

    line.draw();
    cashier.draw();
    people.draw();
}

init();
setInterval(draw, 1);
