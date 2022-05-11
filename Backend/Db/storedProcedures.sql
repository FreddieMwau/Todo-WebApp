-- CREATE TABLE ToDos(
--     id VARCHAR(50),
--     title VARCHAR
-- (50),
--     description VARCHAR
-- (150),
--     date VARCHAR
-- (20), isCompleted BIT
-- )

-- CREATE DATABASE ToDOs

-- DROP DATABASE ToDo

-- DROP PROCEDURE createTodo
-- DROP PROCEDURE [updateToDo];  
-- GO

-- CREATE PROCEDURE createToDo(@id VARCHAR (50), @title VARCHAR(50), @description VARCHAR(150), @date VARCHAR(20), @isCompleted BIT)
-- AS BEGIN
-- INSERT INTO ToDOs(id, title, description, date, isCompleted)
-- VALUES(@id, @title, @description, @date, @isCompleted)
-- END

-- CREATE PROCEDURE deleteTodo(@id VARCHAR (50))
-- AS
-- BEGIN
--     DELETE FROM ToDos WHERE id=@id
-- END


-- CREATE PROCEDURE updateToDo(@id VARCHAR(50),
--     @title VARCHAR(50),
--     @description VARCHAR(150),
--     @date VARCHAR(20),
--     @isCompleted BIT)
-- AS
-- BEGIN
--     UPDATE ToDos SET title=@title, description=@description, date=@date, isCompleted=@isCompleted WHERE id=@id
-- END

-- CREATE PROCEDURE getToDos
-- AS
-- BEGIN
--     SELECT id, title, description, date, isCompleted
--     FROM ToDos
-- END

-- CREATE PROCEDURE getToDoById(@id VARCHAR(50))
-- AS
-- BEGIN
--     SELECT id, title, description, date, isCompleted
--     FROM ToDos
--     WHERE id=@id
-- END 


-- CREATE PROCEDURE deleteTask(@id VARCHAR(50))
-- AS
-- BEGIN
--     DELETE FROM ToDos WHERE id=@id
-- END

-- CREATE PROCEDURE completedStatus(@id VARCHAR(50),
--     @isCompleted BIT)
-- AS
-- BEGIN
--     UPDATE ToDos SET isCompleted=@isCompleted WHERE id=@id
-- END
