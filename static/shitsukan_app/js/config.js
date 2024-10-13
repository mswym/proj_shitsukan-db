
// キャッシュ対策用のクエリ文字列
// 詳細は以下のサイト等を参照
// https://netamame.com/cache-busting/
const APP_VER = '?23v2';

// プロジェクトのルート
//const APP_ROOT = '/shitsukan_app/';
const APP_ROOT = '../'; // for CGI

// スタティックのルート
//Sconst STATIC_ROOT = '/static/';
const STATIC_ROOT = '../../static/'; // for CGI

// 画像のルート
const IMAGE_ROOT = 'shitsukan_app/img/';

// 画像のルート
const CONDITION_ROOT = 'orig/';
//const CONDITION_ROOT = 'gray/';
//const CONDITION_ROOT = 'reduce_2/';
//const CONDITION_ROOT = 'reduce_4/';

const NUM_REP = 20;
const TIME_PRESENT = 0.2;

// ターゲットフレームレート
// 60Hz,90Hz,120Hz端末全てで正しく動作させる場合、最小公倍数に設定したらいい感じになった
// ターゲットフレームレートを120にすると、90Hz端末で45fpsになってしまう事例があった
targetFrameRate = 360;

// キャンバスサイズ情報
const canvas = new CanvasInfo(Math.max(window.screen.availWidth, window.screen.availHeight),Math.min(window.screen.availWidth, window.screen.availHeight));

const Config = {};
// アプリの背景色
Config.BackGround = {};
Config.BackGround.main_color = "#000";
Config.BackGround.task_color = "#000";

// Fixation
Config.Fixation = {};
Config.Fixation.d1 = Math.round(canvas.height * 0.045);
Config.Fixation.d2 = Math.round(canvas.height * 0.015);
Config.Fixation.colorOval = 255;
Config.Fixation.colorCross = 0;

// Monitor
// "monitor_size" is imported from user (in inch)
let viewer_dist = 57; //in cm
function get_ppd(viewer_dist, screen_params){
    return (viewer_dist*Math.tan(Math.PI/180)) * screen_params;
}

let window_availw = window.screen.availWidth;
let window_ratio = window.screen.availHeight/window_availw;

/// Here if monitor_size is input by users
//let width_screen_cm = Math.sqrt((monitor_size*2.54)**2/(1+window_ratio**2));
/// Here monitor size is fixed (like Showa exp)
let width_screen_cm = 50.9

let screen_params = window_availw/width_screen_cm;
let ppd = get_ppd(viewer_dist, screen_params);

// Image
Config.Image = {};
Config.Image.name_conditions = {};
Config.Image.size_rescale = Math.round(8.5*ppd); //in pixel
Config.Image.shift_right_large = Math.round(6*ppd);  //in pixel
Config.Image.shift_up = Math.round(6*ppd);  //in pixel



// Button
Config.Button = {};
Config.Button.width = Math.round(canvas.height * 0.18);
Config.Button.height = Math.round(canvas.height * 0.1);
Config.Button.position = [canvas.center_x - Config.Button.width / 2, canvas.bottom - (canvas.height * 0.1) - (Config.Button.height / 2)];
Config.Button.text_size = Math.round(canvas.height * 0.03);
Config.Button.space_offset = Math.round(canvas.height * 0.25);

// Text
Config.Text = {};
Config.Text.color = 255;
Config.Text.fontSize = canvas.height * 0.05;

