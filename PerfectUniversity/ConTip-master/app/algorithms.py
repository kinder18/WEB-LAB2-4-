from math import sqrt
from random import randint

# Number of neighbor users to look for
NEIGHBOR_NUMBER = 2
# Number of ratings to consider
RATING_NUMBER = 2000
# Number of movies to recommend
RECOMMEND_NUMBER = 6
# Chance to delete movie if 1 genre doesn't match
WRONG_GENRE_DELETE_CHANCE = 20


def euclidean_distance(row1, row2):
    distance = 0.0
    for i in row1:
        if i in row2:
            distance += (row1[i] - row2[i]) ** 2
    return sqrt(distance)


def get_neighbors(train_rows, test_row, num_neighbors=5):
    distances = list()
    for row in train_rows:
        dist = euclidean_distance(test_row, train_rows[row])
        distances.append((row, dist))
    distances.sort(key=lambda tup: tup[1])
    neighbors = list()
    for i in range(num_neighbors):
        neighbors.append(distances[i][0])
    return neighbors

def randchance(chance):
    return (randint(0, 100) < chance)