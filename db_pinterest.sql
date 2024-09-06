USE db_pinterest;

CREATE TABLE type_user (
    type_user_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    pass_word VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(255),
    refresh_token TEXT,
    face_app_id VARCHAR(255),
    type_user INT,
    FOREIGN KEY (type_user) REFERENCES type_user(type_user_id)
);

CREATE TABLE boards (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    board_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
ALTER TABLE boards 
ADD COLUMN pin_id INT,
ADD FOREIGN KEY (pin_id) REFERENCES pins(pin_id);

CREATE TABLE pins (
    pin_id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255) NOT NULL,    
    allowComment BOOLEAN DEFAULT TRUE,
    user_id INT,
    tag_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (tag_id) REFERENCES tag_pins(tag_id)
);

CREATE TABLE tag_pins (
	tag_id INT AUTO_INCREMENT PRIMARY KEY,
	tag_name VARCHAR(255)
);

CREATE TABLE saves (
	save_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT, 
	pin_id INT, 
	board_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (pin_id) REFERENCES pins(pin_id),
	FOREIGN KEY (board_id) REFERENCES boards(board_id)
);




CREATE TABLE comments (
    cmt_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pin_id INT,
    cmt_date DATE,
    cmt TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (pin_id) REFERENCES pins(pin_id)
);

CREATE TABLE likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pin_id INT,
    like_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (pin_id) REFERENCES pins(pin_id)
);

CREATE TABLE code (
    code_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    reset_code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



INSERT INTO type_user (type_name) VALUES
('ADMIN'),
('USER');


INSERT INTO users (full_name, pass_word, email, avatar, refresh_token, face_app_id, type_user) VALUES
('John Doe', 'password123', 'johndoe@example.com', 'avatar1.png', NULL, 'faceid1', 1),
('Jane Smith', 'password123', 'janesmith@example.com', 'avatar2.png', NULL, 'faceid2', 1),
('Michael Johnson', 'password123', 'michaelj@example.com', 'avatar3.png', NULL, 'faceid3', 1),
('Emily Davis', 'password123', 'emilyd@example.com', 'avatar4.png', NULL, 'faceid4', 1),
('William Brown', 'password123', 'williamb@example.com', 'avatar5.png', NULL, 'faceid5', 1);

INSERT INTO boards (board_id, board_name, user_id) VALUES
(1, 'Unorganization', 1),
(2, 'Board 2', 2),
(3, 'Board 2', 3),
(4, 'Board 2', 3),
(5, 'Board 3', 5);

INSERT INTO tag_pins (tag_name) VALUES
('Travel'),
('Food'),
('Technology'),
('Health'),
('Education');

INSERT INTO pins (image, title, description, link, allowComment, user_id, tag_id) VALUES
('https://example.com/image1.jpg', 'Travel to Paris', 'A beautiful trip to Paris.', 'https://example.com/travel-paris', TRUE, 1, 1),
('https://example.com/image2.jpg', 'Delicious Pizza', 'Tasting the best pizza in town.', 'https://example.com/delicious-pizza', TRUE, 2, 2),
('https://example.com/image3.jpg', 'Latest Tech Gadgets', 'Review of the latest tech gadgets.', 'https://example.com/latest-tech', TRUE, 3, 3),
('https://example.com/image4.jpg', 'Healthy Recipes', 'Easy and healthy recipes to try.', 'https://example.com/healthy-recipes', TRUE, 4, 4),
('https://example.com/image5.jpg', 'Online Learning', 'Best platforms for online learning.', 'https://example.com/online-learning', TRUE, 5, 5),
('https://example.com/image6.jpg', 'Beach Vacation', 'Relaxing at the beach.', 'https://example.com/beach-vacation', TRUE, 1, 1),
('https://example.com/image7.jpg', 'Street Food Tour', 'Exploring street food around the world.', 'https://example.com/street-food', TRUE, 2, 2),
('https://example.com/image8.jpg', 'Smart Home Devices', 'The future of smart homes.', 'https://example.com/smart-home', TRUE, 3, 3),
('https://example.com/image9.jpg', 'Fitness Tips', 'Tips for staying fit and healthy.', 'https://example.com/fitness-tips', TRUE, 4, 4),
('https://example.com/image10.jpg', 'Educational Podcasts', 'Top educational podcasts to listen to.', 'https://example.com/educational-podcasts', TRUE, 5, 5);