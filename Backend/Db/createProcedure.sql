CREATE OR ALTER PROCEDURE createToDo(@id VARCHAR (50), @title VARCHAR(50), @description VARCHAR(150), @date VARCHAR(20), @assignEmail VARCHAR
(150))
AS BEGIN
INSERT INTO ToDOs(id, title, description, date, assignEmail)
VALUES(@id, @title, @description, @date, @assignEmail)
END