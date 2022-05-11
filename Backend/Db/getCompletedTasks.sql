CREATE OR ALTER PROCEDURE getCompletedTasks
AS
BEGIN
    SELECT *
    FROM ToDos
    WHERE isCompleted=1 AND isAdminSent =0
END