CREATE PROCEDURE getToDos
AS
BEGIN
    SELECT id, title, description, date, isCompleted
    FROM ToDos
END