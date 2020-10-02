# WorkIndia-API-TEST
API Creation Round for WorkIndia Recruitment Drive




SQL Database Code

LoginInfo Table to store UserId- AutoIncremented, username and password

CREATE TABLE LoginInfo(
	  userId serial PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

UsersInfo Table to store userId and note in an Encrypted Manner with userId working as Common Connection between both Tables


CREATE TABLE NotesInfo(
	  userId PRIMARY KEY,
    note VARCHAR(100) UNIQUE NOT NULL
);
