import sqlite3
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os,sys

# Load the database and read subject information
def load_results(user, database_path='../db.sqlite3', name_app = 'shitsukan_app',name_database="shitsukan_app_resultsshitsukan"):

    index_obj1 = [2,1,0,8,7,6,12,13,14,15,20,21,22,23,28,29,30,31,36,37]
    index_obj2 = [5,4,3,11,10,9,16,17,18,19,24,25,26,27,32,33,34,35,38,39]

    # Load tables from the database
    with sqlite3.connect(database_path) as conn:
        data_results = _load_table(name_app, name_database, conn)

    answer_hit = data_results[data_results['username'] == user]['answer_hit']
    flattened_answer_hit = _make_flatten(answer_hit)

    indices_target = data_results[data_results['username'] == user]['indices_target']
    flattened_indices_target = _make_flatten(indices_target)

    df_new = pd.DataFrame({'answer_hit': flattened_answer_hit,
                           'indices_target': flattened_indices_target})

    # DataFrameをindices_targetでグループ化し、answer_hitの平均を計算
    df_grouped = df_new.groupby('indices_target')['answer_hit'].mean().reset_index()

    # indices_targetでソート（デフォルトで昇順にソートされる）
    df_sorted = df_grouped.sort_values('indices_target').reset_index(drop=True)

    #obje 1 条件とobj2条件
    vec_obj1 = df_sorted.loc[index_obj1]['answer_hit'].values
    vec_obj2 = df_sorted.loc[index_obj2]['answer_hit'].values
    vec_mean = (vec_obj1+vec_obj2)/2

    return vec_mean,vec_obj1,vec_obj2,df_sorted,data_results


# Load tables from the database
def _load_table(name_app, name_database, conn):

    # pandasでSQLクエリを実行し、データを取得
    fmt = '%Y%m%d %H:%M:%S'
    q = "SELECT " + name_database + ".*, " + name_app + "_user.username FROM " + \
        name_database + " INNER JOIN " + name_app + "_user ON " + name_database + \
        ".user_id = shitsukan_app_user.id"
    data = pd.read_sql_query(q, conn, index_col='id')

    return data

def _make_flatten(lists_str):
    list_out = []
    for list_str in lists_str:
        # exclude closure
        list_str = list_str.strip('[]')
        # divide based on comma
        list_str = list_str.split(',')
        for item in list_str:
            # convert int list
            list_out.append(int(item))
    return list_out

def draw_figure(vec_mean,indices):
    # Create a 2x3 plot panel
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))

    # Draw each plot
    for i in range(6):
        # Get the indices corresponding to i
        num_index = np.array(indices_figure)[np.array(indices_figure) == i].shape[0]
        x_fig = np.linspace(1, num_index, num_index)
        indices = [j for j, x in enumerate(indices_figure) if x == i]
        values = vec_mean[indices]

        # Specify the position of the subplot
        ax = axes[i // 3, i % 3]
        ax.plot(x_fig, values, marker='o',color='red', linewidth=2.5, markersize=10)
        ax.set_title(f"Figure {i + 1}")
        ax.set_xlabel("Index")
        ax.set_ylabel("Accuracy")
        ax.set_ylim(0, 1)  # Set the y-axis range from 0 to 1
        ax.grid(True)

    # Adjust the layout of the plots
    plt.tight_layout()
    plt.show()
    print('here')

if __name__ == '__main__':
    list_user = ['hirano']
    means_sub = []
    for user in list_user:
        vec_mean,vec_obj1,vec_obj2,df_sorted,data_results = load_results(user, database_path='../db.sqlite3')
        means_sub.append(vec_mean)

    indices_figure = [0,0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5]
    draw_figure(np.mean(np.array(means_sub),0),indices_figure)