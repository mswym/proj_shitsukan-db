
//p5.js preload images
function preload() {

    let imgPath_slide;
        imgPath_slide = [
            STATIC_ROOT + "shitsukan_app/img/01_introduction_wet/01.jpg" + APP_VER,
            STATIC_ROOT + "shitsukan_app/img/01_introduction_wet/02.jpg" + APP_VER,
        ];
    instruction = new InstructionSlide(imgPath_slide, 'START');
}

//p5.js initializing.
function setup() {
    cnv = createCanvas(canvas.width, canvas.height);
    angleMode(DEGREES);
    frameRate(targetFrameRate);

    intro_sceneManager = new intro_SceneManager();
}

//p5.js frame animation.
function draw() {
    //Main experiment schedule
    intro_sceneManager.update();
}
