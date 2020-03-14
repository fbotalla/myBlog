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


SELECT person_id, name,last_name, email,username FROM person WHERE person_id = 1;

CREATE USER pro_user WITH PASSWORD 'default';
GRANT SELECT, INSERT, UPDATE ON person TO pro_user;
GRANT SELECT, INSERT, UPDATE ON project TO pro_user;

UPDATE project
SET image = 'mathproof.mp4'
WHERE project_id = 1;