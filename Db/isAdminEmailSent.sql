CREATE OR ALTER PROCEDURE isAdminSent(@id VARCHAR(50))
AS BEGIN
UPDATE ToDos SET isAdminSent=1 WHERE id=@id
END


