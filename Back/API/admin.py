from django.contrib import admin
from .models import Anime
# Register your models here.

#admin.site.register(Anime)

@admin.register(Anime)
class AnimeModel(admin.ModelAdmin):
    list_filter = ('title', 'description','score')
    list_display = ('title', 'description','score')