CREATE OR ALTER PROCEDURE getToDoById(@id VARCHAR(50))
AS
BEGIN
    SELECT id, title, description, date, isCompleted, assignEmail
    FROM ToDos
    WHERE id=@id
END 