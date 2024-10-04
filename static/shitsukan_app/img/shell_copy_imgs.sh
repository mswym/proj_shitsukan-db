#!/bin/bash

# ルートディレクトリやパスを変数に格納する
SOURCE_DIR="/media/mswym/db_ext41/color_entropy/THINGS_224/extracted"
DEST_DIR="/home/mswym/workspace/myprj/proj_jitter_app/static/material_app/img"
SUB_DIRS=("dry" "glossy" "matte" "opaque" "translucent" "wet")
SUB_CONDITION=("orig" "gray" "reduce_2" "reduce_4")


# ディレクトリをコピーするループを実行
for dir in "${SUB_DIRS[@]}"; do
    for cond in "${SUB_CONDITION[@]}"; do
        mkdir -p "$DEST_DIR/$dir"
        # ソースディレクトリからコピー
        cp -r "$SOURCE_DIR/$dir/$cond" "$DEST_DIR/$dir"
    done
done
