let width = window.innerWidth; // ширина екрана
let height = window.innerHeight; //  висота акрана
let app; //глобальна змінна нашої гри
let colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив кольорів
let gravity = 2;//гравітація
let figuresAmount = -1; //кількість створених фігур
let figure = []; //массив, що зберігає наші фігури

let createCanvas = {
    createCanvas: function () {
        app = new PIXI.Application(width, height); //створюємо канвас
        document.body.appendChild(app.view); //виводимо його
    },

};

let model = {

    drawCircle: function () {
        let rand = Math.floor(Math.random() * colors.length); //генеруємо рандомне число в проміжку від 0 до к-ті кольорів в массиві
        let radius = 50; //радіус
        let inAreaX = width - 100; // можливі координати по осі Х
        let circleY = -50; //фігура повинна створюватись замежами канваса
        let circleX = Math.floor(Math.random() * inAreaX); //створюємо фігуру в рандомному місці по осі Х
        let circle = new PIXI.Graphics(); //створюємо новий графічний елемент
        circle.lineStyle(0); //починаємо малювати
        circle.beginFill(colors[rand], 1); //випадковий колір
        circle.drawCircle(circleX, circleY, radius); //малюємо коло
        circle.endFill(); //закінчили відрисовку
        circle.interactive = true; //робимо коло інтерактивним
        app.stage.addChild(circle); //виводимо коло на канвасі
        circle.on('pointerdown', controller.clearFigure); //додаємо можливість видалення фігури при кліку по ній

        figuresAmount++; //збільшуємо кількість фігур
        figure.push(circle); //відправляємо фігуру в масив
        app.stage.addChild(circle); //виводимо фігуру в канвасі

    },
    drawEllipse: function () {
        let rand = Math.floor(Math.random() * colors.length);
        let ellipseWidth = 75;
        let ellipseHeight = 50;
        let inAreaX = width - 100;
        let ellipseY = -250;
        let ellipseX = Math.floor(Math.random() * inAreaX);
        let ellipse = new PIXI.Graphics();
        ellipse.beginFill(colors[rand], 1);
        ellipse.drawEllipse(ellipseX, ellipseY, ellipseWidth, ellipseHeight);
        ellipse.endFill();
        ellipse.interactive = true;
        app.stage.addChild(ellipse);
        ellipse.on('pointerdown', controller.clearFigure);
        ellipse.buttonMode = true;
        figuresAmount++;
        figure.push(ellipse);
        app.stage.addChild(ellipse);

    },
    drawRect: function () {

        let rand = Math.floor(Math.random() * colors.length);
        let rectWidth = 100;
        let rectHeight = 100;
        let inAreaX = width - 100;
        let rectY = -50;
        let rectX = Math.floor(Math.random() * inAreaX);
        let rect = new PIXI.Graphics();
        rect.beginFill(colors[rand], 1);
        rect.drawRect(rectX, rectY, rectWidth, rectHeight);
        rect.endFill();
        rect.interactive = true;
        app.stage.addChild(rect);
        rect.on('pointerdown', controller.clearFigure);
        rect.buttonMode = true;
        figuresAmount++;
        figure.push(rect);
        app.stage.addChild(rect);

    }

};

/*function randBody(){
    Math.floor( Math.random()*(Object.keys(model).length));
}*/

let view = {
    loadGame: function () {
        createCanvas.createCanvas();
        model.drawCircle();//малюємо фігуру поки 1 раз
        model.drawEllipse();
        model.drawRect();
        setInterval(model.drawRect(), 1000); //малюємо фігуру кожну секунду
        setInterval(model.drawCircle, 1000);
        setInterval(model.drawEllipse, 1000);
        app.ticker.add(function () { //постійне обновлення канваса
            for (let i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity; //примушуємо гравітацію працювати
            }
        });

    } //закриваємо функцію loadGame();


};
let controller = {
    clearFigure: function () {
        this.clear(); //видаляємо фігуру по якій клікнули
    }
};


view.loadGame(); //запускаємо гру
