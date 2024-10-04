import sqlite3
import numpy as np
import pandas as pd
import os,sys

# Load the database and read subject information
def load_results(list_user, database_path='../db.sqlite3', name_app = 'shitsukan_app',name_database="shitsukan_app_resultsshitsukan"):

    # Load tables from the database
    with sqlite3.connect(database_path) as conn:
        data_results = _load_table(name_app, name_database, conn)

    for user in list_user:
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

    return df_new,data_results


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

if __name__ == '__main__':
    list_user = ['itahashi']
    load_results(list_user, database_path='../db.sqlite3')