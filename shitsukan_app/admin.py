from .models import ResultsShitsukan, User
from django.contrib import admin
from django.contrib.auth import get_user_model
from import_export import resources
from django.contrib.auth.hashers import make_password
from import_export.admin import ImportExportModelAdmin


# Register your models here.


class UserResource(resources.ModelResource):

    # インポート時にパスワードをハッシュ化
    def before_import_row(self, row, row_number=None, **kwargs):
        value = row['password']
        row['password'] = make_password(value)

    class Meta:
        model = get_user_model()


User = get_user_model()


@admin.register(User)
class UserAdmin(ImportExportModelAdmin):
    ordering = ['id']
    list_display = ('id', 'username', 'last_login', 'measurement_count', 'practice_completed')

    resource_class = UserResource


@admin.register(ResultsShitsukan)
class ResultsShitsukanAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ('id', 'num_session','start_datetime', 'user', 'end_datetime', 'task_name','average_hit','answer_hit','answer_target','trial_response','trial_rt','trial_count','indices_target','answer_pose','monitor_size')