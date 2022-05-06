CREATE PROCEDURE getToDoById(@id VARCHAR(50))
AS
BEGIN
    SELECT id, title, description, date, isCompleted
    FROM ToDos
    WHERE id=@id
END 