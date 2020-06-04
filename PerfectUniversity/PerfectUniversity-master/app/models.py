from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=50)


class Movie(models.Model):
    title = models.CharField(max_length=200)
    genre = models.ManyToManyField(
        Genre,
        related_name="films"
    )
    imdb = models.IntegerField(default=0)
    tmdb = models.IntegerField(default=0)


class User(AbstractUser):
    pass


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="user_profile"
    )
    genre_preference = models.ManyToManyField(
        Genre,
    )
    watched_list = models.ManyToManyField(
        Movie,
    )


class Rating(models.Model):
    value = models.IntegerField()
    film = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name="ratings",
        null=True
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="ratings",
        null=True
    )

    class Meta:
        unique_together = ['film', 'user']
