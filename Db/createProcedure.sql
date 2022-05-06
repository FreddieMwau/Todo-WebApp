CREATE PROCEDURE createToDo(@id VARCHAR (50), @title VARCHAR(50), @description VARCHAR(150), @date VARCHAR(20), @isCompleted BIT)
AS BEGIN
INSERT INTO ToDOs(id, title, description, date, isCompleted)
VALUES(@id, @title, @description, @date, @isCompleted)
END