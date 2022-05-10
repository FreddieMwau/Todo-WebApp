CREATE OR ALTER PROCEDURE createToDo(@id VARCHAR (50), @title VARCHAR(50), @description VARCHAR(150), @date VARCHAR(20))
AS BEGIN
INSERT INTO ToDOs(id, title, description, date)
VALUES(@id, @title, @description, @date)
END