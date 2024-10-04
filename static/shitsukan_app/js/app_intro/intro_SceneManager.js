
class intro_SceneManager{

    scene = null;

    constructor() {

        // インストラクションシーンへ遷移
        this.transition(intro_Scene.Instruction);
    }

    // シーンの更新（毎フレーム呼ばれる）
    update(){
        // 背景色の描画
        Scene_util.drawBackGround(intro_Scene, intro_sceneManager);
        // シーンのアップデート
        this.scene.update()
    }


    // シーン切り替え
    transition(scene){
        this.scene = scene;
        this.scene.init();
    }

    quitTask(){

        location.href = APP_ROOT + 'introduction_end/';
    }

}
