import django_filters
from .models import Movie, Genre


class UserFilter(django_filters.FilterSet):
    genre = django_filters.ModelChoiceFilter(queryset=Genre.objects.all())

    class Meta:
        model = Movie
        fields = ('genre',)
