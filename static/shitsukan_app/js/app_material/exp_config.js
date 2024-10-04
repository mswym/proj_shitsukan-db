
let exp_config = {};
// Experimental Conditions
exp_config.Condition = {};
exp_config.Condition.timePresentation = TIME_PRESENT; // 刺激提示時間
exp_config.Condition.timeBlank_1 = 0.5; // blank time in second
exp_config.Condition.timeLimit = 6.0;
exp_config.Condition.trialNum =  40; //
exp_config.Condition.num_show_imgs = 4;
exp_config.Condition.num_rep_per_block = 1;
exp_config.Condition.list_answer = [0,1,2,3];
exp_config.Condition.list_pose = ["01","02","03","04","05"];

//need to decide these indices to load images, not SceneManager
exp_config.Condition.indices_target = Array.from({length: exp_config.Condition.trialNum}, (_, index) => index);
// この実験では、各試行で40個の課題をシャッフルする。
//exp_config.Condition.indices_target = shuffle(exp_config.Condition.indices_target);
