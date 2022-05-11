CREATE OR ALTER PROCEDURE updateToDo(@id VARCHAR(50),
    @title VARCHAR(50),
    @description VARCHAR(150),
    @date VARCHAR(20),
    @assignEmail VARCHAR(150))
AS
BEGIN
    UPDATE ToDos SET title=@title, description=@description, date=@date, assignEmail=@assignEmail WHERE id=@id
END