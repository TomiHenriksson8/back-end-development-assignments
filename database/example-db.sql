-- Drop the existing database if it exists
DROP DATABASE IF EXISTS mediashare;

-- Create a new database named 'mediashare'
CREATE DATABASE mediashare;

-- Use the newly created database
USE mediashare;

-- Create table 'Users'
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table 'MediaItems'
CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert initial data into 'Users'
INSERT INTO Users (username, password, email, user_level_id) VALUES
('VCHar', 'secret123', 'vchar@example.com', 1),
('Donatello', 'secret234', 'dona@example.com', 1);

-- Insert initial data into 'MediaItems'
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) VALUES
('image1.jpg', 887574, 'Sunset', 'Beautiful sunset view', 1, 'image/jpeg'),
('image2.jpg', 60703, 'Coffee', 'Morning coffee', 1, 'image/jpeg'),
('image3.jpg', 30635, 'Mountain', 'Hiking the mountains', 2, 'image/jpeg');

-- Creation of 'Comments' table
CREATE TABLE Comments (
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Creation of 'MediaLikes' table
CREATE TABLE MediaLikes (
  like_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert mock data into 'Comments'
INSERT INTO Comments (media_id, user_id, comment_text) VALUES
(1, 2, 'This is amazing!'),
(2, 1, 'Love this!');

-- Insert mock data into 'MediaLikes'
INSERT INTO MediaLikes (media_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 1);

-- First, delete related records in 'Comments' table
DELETE FROM Comments WHERE media_id = 3;

-- Then, delete related records in 'MediaLikes' table
DELETE FROM MediaLikes WHERE media_id = 3;

-- Now, you can delete the media item
DELETE FROM MediaItems WHERE media_id = 3;

-- Query to select filenames, titles, and usernames
SELECT m.filename, m.title, u.username
FROM MediaItems m
JOIN Users u ON m.user_id = u.user_id;

-- Update user email
UPDATE Users SET email = 'newemail@example.com' WHERE user_id = 1;

-- Query to get all comments for a media item
SELECT u.username, c.comment_text
FROM Comments c
JOIN Users u ON c.user_id = u.user_id
WHERE c.media_id = 1;

-- Query to count likes for each media item
SELECT mi.title, COUNT(ml.like_id) AS likes
FROM MediaLikes ml
JOIN MediaItems mi ON ml.media_id = mi.media_id
GROUP BY ml.media_id;
