
class Material {
    size_rescale;      // actual size
    startTime;      // 提示開始時間


    constructor() {
        let cfg = Config.Image;
        this.name_conditions = cfg.name_conditions;
        this.hit_image;
        this.miss_image_1;
        this.miss_image_2;
        this.miss_image_3;
        this.size_rescale = cfg.size_rescale;
        this.startTime = Date.now();
        //[0,1;
        // 3,2] order
        this.pos_right_0 = [(canvas.center_x)-(this.size_rescale/2)-cfg.shift_right_large,(canvas.center_y)-(this.size_rescale/2)-cfg.shift_up];
        this.pos_right_1 = [(canvas.center_x)-(this.size_rescale/2)+cfg.shift_right_large,(canvas.center_y)-(this.size_rescale/2)-cfg.shift_up];
        this.pos_right_2 = [(canvas.center_x)-(this.size_rescale/2)+cfg.shift_right_large,(canvas.center_y)-(this.size_rescale/2)+cfg.shift_up];
        this.pos_right_3 = [(canvas.center_x)-(this.size_rescale/2)-cfg.shift_right_large,(canvas.center_y)-(this.size_rescale/2)+cfg.shift_up];

    }

    define_condition(cond,list_pose,ind_image) {
        // あとで修正
        if (cond=='0'){
            this.hit_image = this.name_conditions[list_shitsukan[ind_image] + 'And1And' + list_pose[0]]
            this.miss_image_1 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[1]];
            this.miss_image_2 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[2]];
            this.miss_image_3 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[3]];
            this.pos_target = [this.pos_right_0,this.pos_right_1,this.pos_right_2,this.pos_right_3];

        } else if (cond=='1'){
            this.hit_image = this.name_conditions[list_shitsukan[ind_image] + 'And1And' + list_pose[0]]
            this.miss_image_1 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[1]];
            this.miss_image_2 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[2]];
            this.miss_image_3 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[3]];
            this.pos_target = [this.pos_right_1,this.pos_right_0,this.pos_right_2,this.pos_right_3];

        }  else if (cond=='2'){
            this.hit_image = this.name_conditions[list_shitsukan[ind_image] + 'And1And' + list_pose[0]]
            this.miss_image_1 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[1]];
            this.miss_image_2 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[2]];
            this.miss_image_3 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[3]];
            this.pos_target = [this.pos_right_2,this.pos_right_0,this.pos_right_1,this.pos_right_3];

        }  else if (cond=='3'){
            this.hit_image = this.name_conditions[list_shitsukan[ind_image] + 'And1And' + list_pose[0]]
            this.miss_image_1 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[1]];
            this.miss_image_2 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[2]];
            this.miss_image_3 = this.name_conditions[list_shitsukan[ind_image] + 'And0And' + list_pose[3]];
            this.pos_target = [this.pos_right_3,this.pos_right_0,this.pos_right_1,this.pos_right_2];
        }
    }

    // 刺激の描画
    draw(){
        push();
        noStroke();
        // draw target image one
        image(this.hit_image,this.pos_target[0][0],this.pos_target[0][1],this.size_rescale, this.size_rescale);
        image(this.miss_image_1,this.pos_target[1][0],this.pos_target[1][1],this.size_rescale, this.size_rescale);
        image(this.miss_image_2,this.pos_target[2][0],this.pos_target[2][1],this.size_rescale, this.size_rescale);
        image(this.miss_image_3,this.pos_target[3][0],this.pos_target[3][1],this.size_rescale, this.size_rescale);

        pop();
    }
}

