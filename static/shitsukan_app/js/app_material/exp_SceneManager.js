class exp_SceneManager {

    scene = null;

    // 結果
    results = {
        userName: userName,                                    // ユーザー名
        startDatetime: [],                                      // 測定開始時刻
        endDatetime: [],                                        // 測定終了時刻
        eachTrialNum: exp_config.Condition.trialNum,          // 各周波数の試行回数
        indices_target: [],                                 //提示したターゲットのリスト順番
        trial_count: [],                                        // 試行回数
        trial_response: [],                                     // 試行ごとの回答
        trial_rt: [],                                           // 試行ごとのRT
        answer_target: [],                                      //answerが
        answer_pose: [],
        answer_hit: [],                                      //被験者の回答が正解だったか
        average_hit: [],
        block_count: [], // number of blocks
        num_session: [],
        monitor_size: monitor_size,
    }

    list_trials = [];
    trial_count = 0;
    block_count = 1;
    list_answer = [];
    indices_target = [];
    num_rep_per_block;


    constructor() {
        // タスク開始時間を取得
        this.results.startDatetime = Scene_util.getCurrentTime();

        // 刺激条件の初期化
        this.setupCondition();

        // インストラクションシーンへ遷移
        this.transition(exp_Scene.Start);
    }

    // シーンの更新（毎フレーム呼ばれる）
    update() {
        // 背景色の描画
        Scene_util.drawBackGround(exp_Scene, exp_sceneManager);
        // シーンのアップデート
        this.scene.update()
    }


    // シーン切り替え
    transition(scene) {
        this.scene = scene;
        this.scene.init();
    }


    // 実験開始時の条件セットアップ
    setupCondition() {
        let cfg = exp_config.Condition;
        this.num_rep_per_block = cfg.num_rep_per_block;
        this.indices_target = this.shuffleList(exp_config.Condition.indices_target);
        this.results.indices_target.push(this.indices_target);
        this.list_answer = cfg.list_answer;
        this.list_answer = this.shuffleList(this.list_answer);
        this.list_pose = cfg.list_pose;
        this.list_pose = this.shuffleList(this.list_pose);
    }

    // ブロック更新
    updateCondition() {
        this.indices_target = this.shuffleList(exp_config.Condition.indices_target);
        this.results.indices_target.push(this.indices_target);
        this.list_answer = this.shuffleList(this.list_answer);
        this.list_pose = this.shuffleList(this.list_pose);

        this.trial_count = 0;
        this.block_count++;
    }

    // 試行ごとの結果の更新
    updateResults(resp, rt, hit) {
        this.results.trial_response.push(resp);
        this.results.trial_count.push(this.trial_count);
        this.results.trial_rt.push(rt);
        this.results.answer_target.push(this.list_answer[0]);
        this.results.answer_pose.push(this.list_pose);
        this.results.answer_hit.push(hit)
        this.results.block_count.push(this.block_count)

        this.trial_count++;
        this.list_answer = this.shuffleList(this.list_answer);
        this.list_pose = this.shuffleList(this.list_pose);
    }


    //リストをシャッフルする
    shuffleList(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }


    quitTask() {
        // タスク終了時間を取得
        this.results.endDatetime = Scene_util.getCurrentTime();

        // 平均正答率の計算
        let sum = this.results.answer_hit.reduce((acc, currentValue) => acc + currentValue, 0);
        let average = sum / this.results.answer_hit.length;

        // リストを保存用に文字列に変換
        this.results.answer_hit = JSON.stringify(this.results.answer_hit);
        this.results.answer_target = JSON.stringify(this.results.answer_target);
        this.results.trial_count = JSON.stringify(this.results.trial_count);
        this.results.trial_response = JSON.stringify(this.results.trial_response);
        this.results.trial_rt = JSON.stringify(this.results.trial_rt);
        this.results.average_hit = JSON.stringify(average);
        this.results.num_session = JSON.stringify(index_block);

        this.results.monitor_size = JSON.stringify(monitor_size);

        post(APP_ROOT + 'exp_material_end_view/', this.results, 'post');
    }

}
