
let exp_Scene = {};

exp_Scene.pre_define_stim = new Material();

//// インストラクションシーン
exp_Scene.Start = {

    init: function () {

    },

    update: function () {

        let cfg = Config.Text;
        let text_result = index_block + ' / 8 番目のブロックです\n\n画面をタップして実験を開始してください';
        push();
        fill(cfg.color);
        textSize(cfg.fontSize);
        textAlign(CENTER);
        text(text_result, canvas.center_x, canvas.center_y-canvas.height*0.15);
        pop();


        if (mouseIsPressed) {
            this.end();
        }
    },

    end: function (){
        // 全画面化
        if (!Scene_util.isiOS()){
            fullscreen(true);
        }
        exp_sceneManager.transition(exp_Scene.Stim_Blank_1)
    }
};



//// ブランクシーン1
exp_Scene.Stim_Blank_1 = {
    init: function (){
        exp_Scene.pre_define_stim.define_condition(exp_sceneManager.list_answer[0],
            exp_sceneManager.list_pose,
            exp_sceneManager.indices_target[exp_sceneManager.trial_count])
        this.startTime = Date.now();
    },


    update: function (){


        // 一定時間経過後終了
        let elapsedTime = (Date.now() - this.startTime) * 0.001;
        if (elapsedTime > exp_config.Condition.timeBlank_1) {
            this.end();
        }
    },


    end: function () {
            exp_sceneManager.transition(exp_Scene.Stim_First);
    },

};



//// 刺激提示シーン
exp_Scene.Stim_First = {

    init: function (){
        this.startTime = Date.now();

        // 回答ボタンの作成
        let cfg = Config.Button;

        //button 0
        this.button_0 = Scene_util.createButton('', [exp_Scene.pre_define_stim.size_rescale, exp_Scene.pre_define_stim.size_rescale],
            [exp_Scene.pre_define_stim.pos_right_0[0], exp_Scene.pre_define_stim.pos_right_0[1]]);
          // ボタンを透明に設定
        this.button_0.style('background-color', 'rgba(0, 0, 0, 0)');
        this.button_0.style('border', 'none'); // ボタンの枠線をなくす

        //button 1
        this.button_1 = Scene_util.createButton('', [exp_Scene.pre_define_stim.size_rescale, exp_Scene.pre_define_stim.size_rescale],
            [exp_Scene.pre_define_stim.pos_right_1[0], exp_Scene.pre_define_stim.pos_right_1[1]]);
          // ボタンを透明に設定
        this.button_1.style('background-color', 'rgba(0, 0, 0, 0)');
        this.button_1.style('border', 'none'); // ボタンの枠線をなくす

        //button 2
        this.button_2 = Scene_util.createButton('', [exp_Scene.pre_define_stim.size_rescale, exp_Scene.pre_define_stim.size_rescale],
            [exp_Scene.pre_define_stim.pos_right_2[0], exp_Scene.pre_define_stim.pos_right_2[1]]);
          // ボタンを透明に設定
        this.button_2.style('background-color', 'rgba(0, 0, 0, 0)');
        this.button_2.style('border', 'none'); // ボタンの枠線をなくす

        //button 3
        this.button_3 = Scene_util.createButton('', [exp_Scene.pre_define_stim.size_rescale, exp_Scene.pre_define_stim.size_rescale],
            [exp_Scene.pre_define_stim.pos_right_3[0], exp_Scene.pre_define_stim.pos_right_3[1]]);
          // ボタンを透明に設定
        this.button_3.style('background-color', 'rgba(0, 0, 0, 0)');
        this.button_3.style('border', 'none'); // ボタンの枠線をなくす


        // 回答ボタンのイベント関数の設定
        this.button_0.mousePressed(() => this.onButtonPressed_0());
        this.button_1.mousePressed(() => this.onButtonPressed_1());
        this.button_2.mousePressed(() => this.onButtonPressed_2());
        this.button_3.mousePressed(() => this.onButtonPressed_3());

        this.startTime = Date.now();
        this.rt = 0;
    },



    update: function (){

        // 刺激の描画
        exp_Scene.pre_define_stim.draw();
        this.rt = (Date.now() - this.startTime);
        // 一定時間経過後終了
        let elapsedTime = (Date.now() - this.startTime) * 0.001;
        if (elapsedTime > exp_config.Condition.timeLimit) {
            exp_sceneManager.updateResults(5, this.rt, 0);
            this.end();
        }
    },




    // 「0」が押されたとき
    onButtonPressed_0: function () {
        let hit;
        // 試行の結果の保存
        if (exp_sceneManager.list_answer[0]==0){
            hit = 1;
        } else {
            hit = 0;
        }
        exp_sceneManager.updateResults(0, this.rt, hit);

        this.end();
    },

    onButtonPressed_1: function () {
        let hit;
        // 試行の結果の保存
        if (exp_sceneManager.list_answer[0]==1){
            hit = 1;
        } else {
            hit = 0;
        }
        exp_sceneManager.updateResults(1, this.rt, hit);

        this.end();
    },

    onButtonPressed_2: function () {
        let hit;
        // 試行の結果の保存
        if (exp_sceneManager.list_answer[0]==2){
            hit = 1;
        } else {
            hit = 0;
        }
        exp_sceneManager.updateResults(2, this.rt, hit);

        this.end();
    },

    onButtonPressed_3: function () {
        let hit;
        // 試行の結果の保存
        if (exp_sceneManager.list_answer[0]==3){
            hit = 1;
        } else {
            hit = 0;
        }
        exp_sceneManager.updateResults(3, this.rt, hit);

        this.end();
    },

    end: function () {
        this.button_0.remove();
        this.button_1.remove();
        this.button_2.remove();
        this.button_3.remove();

        // 指定ブロック測定が完了するまでブロックを繰り返す
        if (exp_sceneManager.trial_count <　exp_config.Condition.trialNum){
            exp_sceneManager.transition(exp_Scene.Stim_Blank_1);
        }
        else if (exp_sceneManager.trial_count ==　exp_config.Condition.trialNum && exp_sceneManager.block_count < exp_sceneManager.num_rep_per_block){
            exp_sceneManager.updateCondition()
            exp_sceneManager.transition(exp_Scene.Stim_Blank_1);
        }
        else{
            exp_sceneManager.transition(exp_Scene.End);
        }
    },

};






//// 結果画面シーン
exp_Scene.End = {

    init: function (){

        // 終了ボタンの作成
        let cfg = Config.Button;
        this.button_end = Scene_util.createButton('END', [cfg.width, cfg.height], cfg.position);

        // 終了ボタンのイベント関数の設定
        this.button_end.mousePressed(() => this.onButtonPressed_end());
    },

    update: function (){
        let cfg = Config.Text;
        let text_result = 'ブロックが終了しました\n以下のボタンをタップしてください';
        push();
        fill(cfg.color);
        textSize(cfg.fontSize);
        textAlign(CENTER);
        text(text_result, canvas.center_x, canvas.center_y-canvas.height*0.15);
        pop();
    },

    onButtonPressed_end: function(){
        this.end();
    },

    end: function () {
        this.button_end.remove();

        if (!Scene_util.isiOS()){
            fullscreen(false);
        }

        exp_sceneManager.quitTask();
    },
};

