CREATE TABLE person(
    person_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


CREATE TABLE project(
    project_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    languange TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO person (name, last_name,email,username,password) VALUES ('Test', 'TestLastName', 'testing@gmail.com', 'tester', 'default');
INSERT INTO person (name, last_name,email,username,password) VALUES ('Second', 'Tester', 'second@gmail.com', 'secontest', 'default');

INSERT INTO project(name,languange,image,description) VALUES ('MathProof','Java','mathproof.png','This project was desinged to have children learn simple to complex math by having a fun
interface in which they could play and learn. This app, written in Java, was a 3 months long effort. Hope you enjoy it!');

INSERT INTO project(name,languange,image,description) VALUES ('BallTalla','HTML/JS/CSS/PHP','balltalla.mp4','This project was the beginning of a business idea that I would like to develop in the future.
I am passionate about soccer. This future will connect people that like me are passionate about soccer to private trainers that can enhance the student ability and skills to play this sport. This website
was developped in just over a month. Hope you like it!');

INSERT INTO project(name,languange,image,description) VALUES ('AJAX Registrations','HTML/JS/CSS/AJAX','registrations.mp4','This project was developed for one of my Web Engineering assignments. It simply 
gathers information from a user, writes it to a file and then it reads the file infomation and displays it on the client without the need for a refresh. This type of programming is often used when buying online.
Hope you like it!');


CREATE USER pro_user WITH PASSWORD 'default';
GRANT SELECT, INSERT, UPDATE ON person TO pro_user;
GRANT SELECT, INSERT, UPDATE ON project TO pro_user;

UPDATE project
SET image = 'mathproof.mp4'
WHERE project_id = 1;