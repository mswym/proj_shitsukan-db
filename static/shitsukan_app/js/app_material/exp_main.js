//p5.js preload images

let B

function preload() {
    //load images
    let num_imgs = exp_config.Condition.trialNum;
    let num_pose = exp_config.Condition.list_pose.length;
    for (let i = 0; i < num_imgs; ++i) {
        for (let k = 0; k < num_pose; ++k) {
            // load "1" folder
            Config.Image.name_conditions[list_shitsukan[i] + 'And1And' + exp_config.Condition.list_pose[k]] =
                loadImage(STATIC_ROOT + IMAGE_ROOT + 'material_swym/' + list_shitsukan[exp_config.Condition.indices_target[i]] +
                    '/1/' + exp_config.Condition.list_pose[k] + '.jpg' + APP_VER);

            // load "0" folder
            Config.Image.name_conditions[list_shitsukan[i] + 'And0And' + exp_config.Condition.list_pose[k]] =
                loadImage(STATIC_ROOT + IMAGE_ROOT + 'material_swym/' + list_shitsukan[exp_config.Condition.indices_target[i]] +
                    '/0/' + exp_config.Condition.list_pose[k] + '.jpg' + APP_VER)
        }
    }

    Config.Image.num_imgs = num_imgs;
}

//p5.js initializing.
function setup() {
    let val_framerate = 60;

    createCanvas(canvas.width, canvas.height);
    angleMode(DEGREES);
    frameRate(val_framerate);
    exp_sceneManager = new exp_SceneManager();
}

//p5.js frame animation.
function draw() {
    //Main experiment schedule
    exp_sceneManager.update();
}

