CREATE DATABASE statistics;

\c statistics;

CREATE TABLE users (
  email VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE collections (
  collectionID SERIAL PRIMARY KEY,
  collectionName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  CONSTRAINT user_log FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE logs (
  logID SERIAL PRIMARY KEY,
  label VARCHAR NOT NULL,
  value int NOT NULL,
  logDate date not null default CURRENT_TIMESTAMP,
  collectionID int NOT NULL,
  CONSTRAINT collection_log FOREIGN KEY (collectionID) REFERENCES collections(collectionID) ON DELETE CASCADE ON UPDATE CASCADE
);
