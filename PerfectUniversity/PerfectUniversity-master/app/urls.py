# flake8: noqa: E405
from django.urls import path
from .views import *

urlpatterns = [

    # USER PROFILE VIEWS

    path(
        'preferences/set/',
        UserPreferencesView.as_view()
    ),
    path(
        'watched/set/',
        WatchedListView.as_view()
    ),

    # GENRE VIEWS

    path(
        'genre/create/',
        GenreCreateView.as_view()
    ),
    path(
        'genre/detail/<int:pk>/',
        GenreDetailView.as_view()
    ),
    path(
        'genre/list/',
        GenreListView.as_view()
    ),

    # FILM VIEWS

    path(
        'film/create/',
        MovieCreateView.as_view()
    ),
    path(
        'film/detail/<int:pk>/',
        MovieRetrieveView.as_view()
    ),
    path(
        'film/list/',
        MovieListView.as_view()
    ),

    # FILM RECOMMENDATIONS

    path(
        'film/recommend/',
        MovieRecommendView.as_view()
    ),

    # RATINGS VIEWS

    path(
        'rating/create/',
        RatingCreateView.as_view()
    ),
    path(
        'rating/detail/<int:pk>/',
        RatingDetailView.as_view()
    ),
    path(
        'rating/get_id/<int:film_id>/',
        RatingIdRetrieveView.as_view()
    ),
    path(
        'rating/list/',
        RatingListView.as_view()
    ),
]
