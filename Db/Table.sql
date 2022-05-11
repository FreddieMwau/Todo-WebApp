CREATE TABLE ToDos
(
    id VARCHAR(50),
    title VARCHAR(50),
    description VARCHAR(150),
    isCompleted BIT DEFAULT 0,  
    date DATE,
    assignEmail VARCHAR(150),
    completedDate DATE DEFAULT NULL
)

