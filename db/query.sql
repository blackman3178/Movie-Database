SELECT movie_names.movie_name AS "Movie Title",reviews.review AS "Review"
FROM movie_names
JOIN reviews ON movie_names.id = reviews.movie_id;