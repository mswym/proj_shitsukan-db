from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    measurement_count = models.IntegerField(default=0)
    practice_completed = models.BooleanField(default=False)
    is_first_measurement = models.BooleanField(default=True)
    is_first_adjustment = models.BooleanField(default=True)
    list_tasks = models.TextField(blank=True)
    task_count = models.IntegerField(default=0)


class MonitorSizeShitsukan(models.Model):
    size = models.FloatField()  # モニターサイズを保存するフィールド


class ResultsShitsukan(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    start_datetime = models.TextField(blank=True)
    end_datetime = models.TextField(blank=True)

    answer_hit = models.TextField(blank=True)
    answer_target = models.TextField(blank=True)
    trial_response = models.TextField(blank=True)
    trial_rt = models.TextField(blank=True)
    trial_count = models.TextField(blank=True)
    answer_pose = models.TextField(blank=True)
    indices_target = models.TextField(blank=True)
    average_hit = models.FloatField(blank=True,default=0)
    num_session = models.TextField(blank=True,default=0)

    task_name = models.TextField(blank=True)
    monitor_size = models.TextField(blank=True)
