CREATE OR ALTER PROCEDURE completedStatus(@id VARCHAR(50),
    @isCompleted BIT)
AS
BEGIN
    UPDATE ToDos SET isCompleted=@isCompleted, completedDate =  CURRENT_TIMESTAMP WHERE id=@id
END