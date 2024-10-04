#!/bin/bash

# フォルダのパス
folder_path="/home/mswym/workspace/myprj/proj_jitter_app/static/material_app/img"

SUB_DIRS=("dry" "glossy" "matte" "opaque" "translucent" "wet" "animal" "house")

# ファイル名のテキストリストを作成するファイル
output_file_name_pre="list_"
output_file_name_post=".js"

parameter_name=" = ["
parameter_name_end="];"

    for dir in "${SUB_DIRS[@]}"; do
        output_file="$output_file_name_pre$dir$output_file_name_post"

        echo "$output_file_name_pre$dir$parameter_name" > "$output_file"
        # フォルダ内のファイル名を取得してテキストリストに書き込む
        find "$folder_path/$dir/orig" -type f -exec basename {} \;|sort | sed 's/^/"/; s/$/",/' >> "$output_file"

        echo "$parameter_name_end" >> "$output_file"
    done
