
from django.urls import path, include
from .views import AnimeViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

#anime_details, anime_list, AnimeList, AnimeDetails
router = DefaultRouter()
router.register('animes', AnimeViewSet, basename='animes')
router.register('users', UserViewSet)


urlpatterns = [
    path('api/', include(router.urls)),


    
    #path('animes', AnimeList.as_view()),
    #path('animes/<int:id>', AnimeDetails.as_view()),
    #path('anime', anime_list),
    #path('anime/<int:pk>', anime_details),
]
