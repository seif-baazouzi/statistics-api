CREATE DATABASE statistics;

\c statistics;

CREATE TABLE users (
  email VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE collections (
  collectionName VARCHAR PRIMARY KEY,
  email VARCHAR NOT NULL,
  CONSTRAINT user_log FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE logs (
  logID SERIAL PRIMARY KEY,
  label VARCHAR NOT NULL,
  value int NOT NULL,
  logDate date not null default CURRENT_TIMESTAMP,
  collectionName VARCHAR NOT NULL,
  CONSTRAINT collection_log FOREIGN KEY (collectionName) REFERENCES collections(collectionName) ON DELETE CASCADE ON UPDATE CASCADE
);
