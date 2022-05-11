CREATE OR ALTER PROCEDURE getUnCompletedToDos
AS
BEGIN
    SELECT id, title, description, date, isCompleted, assignEmail
    FROM ToDos
    WHERE isCompleted=0
END