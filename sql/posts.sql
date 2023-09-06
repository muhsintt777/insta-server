CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    imageUrl VARCHAR(255),
    caption VARCHAR(255) NOT NULL,
    likes INTEGER
);