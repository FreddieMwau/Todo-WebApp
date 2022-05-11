CREATE OR ALTER PROCEDURE getToDos
AS
BEGIN
    SELECT id, title, description, date, isCompleted, assignEmail
    FROM ToDos
END 