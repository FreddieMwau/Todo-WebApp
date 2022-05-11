CREATE OR ALTER PROCEDURE getCompletedToDos
AS
BEGIN
    SELECT id, title, description, assignEmail, completedDate, FORMAT(date, 'dd/MM/yyy') as date,
        FORMAT(completedDate, 'dd/MM/yyyy') as completedDate,
        DATEDIFF(hour, completedDate, date) as hourDifference
    FROM ToDos
    WHERE isCompleted=1
END