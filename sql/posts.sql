CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    imageUrl VARCHAR(255),
    caption VARCHAR(255) NOT NULL,
    likes INTEGER
);

ALTER TABLE posts
ADD COLUMN createdAt TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE posts
ADD COLUMN updatedAt TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE posts
DROP COLUMN likes;

ALTER TABLE posts
ADD COLUMN likeCount BIGINT DEFAULT 0,
ADD COLUMN commentCount BIGINT DEFAULT 0

-- changed name for column likecount,createdat,updatedat and..
ALTER TABLE posts
RENAME COLUMN commentcount TO comment_count;

ALTER TABLE posts
ADD status INTEGER CHECK (status IN (1, 2));

