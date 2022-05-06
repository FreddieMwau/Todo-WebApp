CREATE PROCEDURE getUnCompletedToDos
AS
BEGIN
    SELECT id, title, description, date, isCompleted
    FROM ToDos
    WHERE isCompleted=0
END