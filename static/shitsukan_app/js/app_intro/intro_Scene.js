
let intro_Scene = {};

//// 開始画面シーン
intro_Scene.Start = {

    init: function () {
        // 画面いっぱいに見えないボタンを配置する
        this.button_screen = createButton('');
        this.button_screen.size(document.body.clientWidth, document.body.clientHeight);
        this.button_screen.position(0, 0);
        this.button_screen.style('border', '0px');
        this.button_screen.style('border-radius', '0px');
        this.button_screen.style('background-color', 'transparent');
        this.button_screen.show();

        this.button_screen.mousePressed(() => this.onPressedScreen());
    },

    update: function () {

        Scene_util.drawText("画面をタップして開始します。", document.body.clientWidth/2, document.body.clientHeight/2);

        this.button_screen.size(document.body.clientWidth, document.body.clientHeight);
    },

    onPressedScreen: function() {

        // 全画面化
        if (!Scene_util.isiOS()){
            fullscreen(true);
        }

        this.end();
    },

    end: function (){
        this.button_screen.remove();
        intro_sceneManager.transition(intro_Scene.Instruction)
    }
};



//// インストラクションシーン
intro_Scene.Instruction = {

    init: function () {
        instruction.setup();
    },

    update: function () {
        instruction.draw();

        if(instruction.isStarted){
            this.end();
        }
    },

    end: function (){
        instruction.remove();

        intro_sceneManager.transition(intro_Scene.End)
    }
};



//// 結果画面シーン
intro_Scene.End = {

    init: function (){

        this.end();
    },

    update: function (){

    },

    end: function () {
        intro_sceneManager.quitTask();
    },

};

