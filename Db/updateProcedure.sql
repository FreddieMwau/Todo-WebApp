CREATE PROCEDURE updateToDo(@id VARCHAR(50),
    @title VARCHAR(50),
    @description VARCHAR(150),
    @date VARCHAR(20))
AS
BEGIN
    UPDATE ToDos SET title=@title, description=@description, date=@date WHERE id=@id
END