import datetime
import json, random
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.core.serializers.json import DjangoJSONEncoder

from .models import ResultsShitsukan, MonitorSizeShitsukan
from .forms import SignupForm, LoginForm, MonitorSizeForm

from datetime import datetime as dt

import ast

# ユーザー登録フォーム
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect(to='login')

    else:
        form = SignupForm()

    param = {
        'form': form
    }
    return render(request, 'shitsukan_app/signup.html', param)


# ログインフォーム
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()

            if user:
                login(request, user)
                return redirect(to='introduction')

    else:
        form = LoginForm()

    param = {
        'form': form
    }
    return render(request, 'shitsukan_app/login.html', param)


# ログアウト画面
@login_required
def logout_view(request):
    logout(request)
    return render(request, 'shitsukan_app/logout.html')


# ホーム画面
@login_required
def home_view(request):
    user = request.user
    user.task_count = 0
    user.save()
    param = {
        'user': user
    }
    return render(request, 'shitsukan_app/home.html', param)


# ログアウト画面
@login_required
def aboutapp_view(request):
    return render(request, 'shitsukan_app/index_aboutapp.html')


# 最初の説明画面 - 開始
@login_required
def consent_view(request):
    user = request.user



    # 事前説明ページへ遷移
    param = {
        'user': user,
        'is_first_measurement': user.is_first_measurement,
    }

    with open('shitsukan_app/consent_form.txt', 'r') as file:
        terms_text = file.read()
    return render(request, 'shitsukan_app/index_consent.html', {'terms': terms_text, 'param': param})

@login_required
def monitor_view(request):

    if request.method == 'POST':
        form = MonitorSizeForm(request.POST)
        if form.is_valid():
            monitor_size = form.cleaned_data['monitor_size']
            MonitorSizeShitsukan.objects.create(size=monitor_size)  # モデルに保存
            return redirect('introduction')  # リダイレクト先を設定
    else:
        form = MonitorSizeForm()

    return render(request, 'shitsukan_app/index_monitor.html', {'form': form})

@login_required
def introduction_view(request):
    user = request.user
    if user.task_count==0:
        # ここを後で修正。繰り返しに合わせて終了するかを決める
        user.is_first_measurement=False
        user.save()

    #monitor sized is used in config.js
    latest_monitor_size = MonitorSizeShitsukan.objects.last()
    if latest_monitor_size:
        monitor_size = latest_monitor_size.size

    # 事前説明ページへ遷移
    param = {
        'user': user,
        'is_first_measurement': user.is_first_measurement,
        'monitor_size': monitor_size,
    }

    index_html = 'shitsukan_app/index_introduction.html'
    return render(request, index_html, param)

# 最初の説明画面 - 終了
@login_required
def introduction_end_view(request):

    return redirect(to='exp_material_view')



@login_required
def exp_material_view(request):
    user = request.user

    latest_monitor_size = MonitorSizeShitsukan.objects.last()
    if latest_monitor_size:
        monitor_size = latest_monitor_size.size

    param = {
        'user': user,
        'is_first_measurement': user.is_first_measurement,
        'index_block': user.task_count+1,
        'monitor_size': monitor_size,
    }
    index_html = 'shitsukan_app/index_exp_material.html'
    return render(request, index_html, param)


@login_required
def exp_material_end_view(request):
    if request.method == 'POST':
        results = ResultsShitsukan()
        # ユーザーを保存
        username = request.POST.get('userName')
        user = get_user_model().objects.get(username=username)
        results.user = user

        # 開始時刻を保存
        #start_dt =
        #print(start_dt)
        #results.start_datetime = dt.strptime(   start_dt, '%m/%d/%Y, %I:%M:%S %p')
        results.start_datetime = request.POST.get('startDatetime')

        # 終了時刻を保存
        #end_dt = request.POST.get('endDatetime')
        #print(end_dt)
        #results.end_datetime = dt.strptime(end_dt, '%m/%d/%Y, %I:%M:%S %p')
        results.end_datetime = request.POST.get('endDatetime')

        # 結果の保存
        results.answer_hit = request.POST.get('answer_hit')
        results.answer_target = request.POST.get('answer_target')
        results.trial_response = request.POST.get('trial_response')
        results.trial_rt = request.POST.get('trial_rt')
        results.trial_count = request.POST.get('trial_count')
        results.indices_target = request.POST.get('indices_target')
        results.answer_pose = request.POST.get('answer_pose')
        results.average_hit = float(request.POST.get('average_hit'))
        results.monitor_size = request.POST.get('monitor_size')
        results.num_session = request.POST.get('num_session')

        results.save()
        print('saved')

    user = request.user
    user.task_count += 1
    user.save()


    if user.task_count==user.max_count:
        user.task_count = 0
        user.save()
        return redirect(to='end')
    else:
        return redirect(to='exp_material_view')

@login_required
def end_view(request):
    return render(request, 'shitsukan_app/index_end.html')


