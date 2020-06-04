from .models import *
import json


def dump_data():
    while True:
        choose = input("movies: m\ngenres: g\nusers: u\nratings: r\n")
        data = {}

        """
        Genres
        """
        if choose == "g":
            genres = Genre.objects.all()
            i = 1
            for genre in genres:
                data[i] = genre.name
                i += 1
            with open("genres.json", "w") as file:
                json.dump(data, file)

        """
        Movies
        """
        if choose == "m":
            movies = Movie.objects.all()
            i = 1
            for movie in movies:

                genres_from_db = movie.genre.get_queryset()
                genres = []
                for genre in genres_from_db:
                    genres.append(genre.id)

                data[i] = {
                    "title": movie.title,
                    "imdb": movie.imdb,
                    "tmdb": movie.tmdb,
                    "genre": json.dumps(genres)
                }
                i += 1

            with open("movies.json", "w") as file:
                json.dump(data, file)

        """
        Users
        """
        if choose == "u":
            users = User.objects.all()
            i = 1
            for user in users:
                data[i] = user.username
                i += 1
            with open("users.json", "w") as file:
                json.dump(data, file)

        """
        Ratings
        """
        if choose == "r":
            ratings = Rating.objects.all()
            i = 1
            for rating in ratings:
                if i % 20000 == 0:
                    print("20k read")
                data[i] = {
                    "value": rating.value,
                    "movie": rating.film.id,
                    "user": rating.user.id
                }
                i += 1
            with open("ratings.json", "w") as file:
                json.dump(data, file)

