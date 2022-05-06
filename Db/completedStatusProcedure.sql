CREATE PROCEDURE completedStatus(@id VARCHAR(50),
    @isCompleted BIT)
AS
BEGIN
    UPDATE ToDos SET isCompleted=@isCompleted WHERE id=@id
END