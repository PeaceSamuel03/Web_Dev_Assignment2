DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id PRIMARY KEY,
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard
(
    user_id PRIMARY KEY,
    score NOT NULL
);