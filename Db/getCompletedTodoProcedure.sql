CREATE PROCEDURE getCompletedToDos
AS
BEGIN
    SELECT id, title, description, date, isCompleted
    FROM ToDos
    WHERE isCompleted=1
END