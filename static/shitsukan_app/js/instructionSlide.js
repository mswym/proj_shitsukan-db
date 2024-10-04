
class InstructionSlide {

    slide_height = canvas.height * 0.76;
    arrow_height = this.slide_height * 0.12;
    button_next_size = [this.slide_height*0.3, this.slide_height*0.13];
    button_next_textSize = this.slide_height*0.05;
    button_next_y = canvas.bottom - canvas.height * 0.06;
    progressBar_size = this.slide_height * 0.03;
    progressBar_y = canvas.center_y + this.slide_height * 0.46;
    mainColor = '#4472C4';


    imgPath;
    imgPath_arrow_left = STATIC_ROOT + IMAGE_ROOT + "arrow_left.png";
    imgPath_arrow_right = STATIC_ROOT + IMAGE_ROOT + "arrow_right.png";

    // 画像インスタンス
    img_slides = [];
    img_arrow_left;
    img_arrow_right;

    // 矢印ボタンインスタンス
    button_arrow_left;
    button_arrow_right;

    button_next;

    button_text;

    // 矢印を表示するか
    arrow_visible_left;
    arrow_visible_right;

    // 現在のページ
    currentPage = 0;

    isStarted = false;

    constructor(imgPath, button_text = '始める') {

        this.imgPath = imgPath;

        this.button_text = button_text;

        // 画像の読み込み
        this._loadImage();
    }

    // スライドのセットアップ
    setup() {

        // 矢印のサイズ設定
        this.arrow_left_pos =   [canvas.center_x - this.slide_height*0.75, canvas.center_y+2*this.arrow_height];
        this.arrow_right_pos =  [canvas.center_x + this.slide_height*0.75, canvas.center_y+2*this.arrow_height];

        // 矢印ボタンの作成
        this.button_arrow_left = this._createArrowButton([this.arrow_height, this.slide_height], this.arrow_left_pos);
        this.button_arrow_right = this._createArrowButton([this.arrow_height, this.slide_height], this.arrow_right_pos);

        // 「始める」ボタンの作成
        this.button_next = this._createNextButton(this.button_next_size, [canvas.center_x, this.button_next_y]);

        // イベント関数の適用
        this.button_arrow_left.mousePressed(() => this._onButtonPressed_left());
        this.button_arrow_right.mousePressed(() => this._onButtonPressed_right());
        this.button_next.mouseClicked(() => this._onButtonPressed_next());

        // 左矢印とボタンを表示の管理
        this._updateComponent();
    }

    draw() {

        // スライド画像の描画
        let img = this.img_slides[this.currentPage];
        this._drawImage(img, [img.width * (this.slide_height / img.height), this.slide_height], [canvas.center_x, canvas.center_y]);

        // 矢印の描画
        if(this.arrow_visible_left){
            this._drawImage(this.img_arrow_left, [this.arrow_height, this.arrow_height], this.arrow_left_pos);
        }
        if(this.arrow_visible_right){
            this._drawImage(this.img_arrow_right, [this.arrow_height, this.arrow_height], this.arrow_right_pos);
        }

        // プログレスバーを描画
        let progressBar = this._generateProgressBar(this.img_slides.length, this.currentPage+1);
        push();
        textAlign(CENTER, CENTER);
        fill(color(this.mainColor));
        textFont('Yu Gothic');
        textSize(this.progressBar_size);
        text(progressBar, canvas.center_x, this.progressBar_y);
        pop();
    }

    remove(){
        this.button_arrow_left.remove();
        this.button_arrow_right.remove();
        this.button_next.remove();
    }

    // 次のスライド
    _nextSlide(){

        if (this.currentPage < this.img_slides.length - 1){
            this.currentPage ++;

            this._updateComponent();
        }
    }

    // 前のスライド
    _prevSlide() {

        if (this.currentPage > 0){
            this.currentPage --;

            this._updateComponent();
        }
    }

    // 矢印などの要素の表示、非表示を更新
    _updateComponent(){

        // ページ数が1なら開始ボタンを表示
        if(this.img_slides.length === 1) {
            this.button_next.show();
            this.arrow_visible_left = false;
            this.button_arrow_left.hide();
            this.arrow_visible_right = false;
            this.button_arrow_right.hide();
        }

        // 最初のページ
        else if(this.currentPage === 0){
            this.button_next.hide();
            this.arrow_visible_left = false;
            this.button_arrow_left.hide();
            this.arrow_visible_right = true;
            this.button_arrow_right.show();
        }

        // 最後のページ
        else if(this.currentPage === this.img_slides.length-1){
            this.button_next.show();
            this.arrow_visible_left = true;
            this.button_arrow_left.show();
            this.arrow_visible_right = false;
            this.button_arrow_right.hide();
        }

        // それ以外のページ
        else {
            this.button_next.hide();
            this.arrow_visible_left = true;
            this.button_arrow_left.show();
            this.arrow_visible_right = true;
            this.button_arrow_right.show();
        }
    }


    // 画像の読み込み
    _loadImage(){
        for (let i = 0; i < this.imgPath.length; i++){
            this.img_slides.push(loadImage(this.imgPath[i]));
        }
        this.img_arrow_left = loadImage(this.imgPath_arrow_left);
        this.img_arrow_right = loadImage(this.imgPath_arrow_right);
    }

    // 画像の描画
    _drawImage(img, size, position){
        image(img, position[0]-(size[0]/2), position[1]-(size[1]/2), size[0], size[1]);
    }

    // 矢印ボタンの作成
    _createArrowButton(size, position){
        let button = createButton('');
        button.size(size[0], size[1]);
        button.position(position[0] - (size[0]/2), position[1] - (size[1]/2));
        button.style('border', 'none');
        button.style('background-color', 'transparent');
        button.style('border-radius', '0');
        return button;
    }

    // 「始める」ボタンの作成
    _createNextButton(size, position){
        let button = createButton(this.button_text);
        button.size(size[0], size[1]);
        button.position(position[0] - (size[0]/2), position[1] - (size[1]/2));
        button.style('font-size', this.button_next_textSize + 'px');
        button.style('color', '#FFF');
        button.style('border', '1px solid #203864');
        button.style('border-radius', '0px');
        button.style('background-color', this.mainColor);
        // button.style('background-color', '#00F');
        return button;
    }

    // 進捗の文字列の生成
    _generateProgressBar(total, progress) {
      const completed = '● ';
      const remaining = '○ ';
      const progressBar = [];

      progressBar.push(' ');

      // 完了した部分を追加
      for (let i = 0; i < progress; i++) {
        progressBar.push(completed);
      }
      // 残りの部分を追加
      for (let i = progress; i < total; i++) {
        progressBar.push(remaining);
      }

      return progressBar.join('');
    }


    // 右矢印が押されたとき
    _onButtonPressed_right() {
        this._nextSlide();
    }

    // 左矢印が押されたとき
    _onButtonPressed_left() {
        this._prevSlide();
    }

    // 「始める」が押されたとき
    _onButtonPressed_next() {
        this.isStarted = true;
    }

}


