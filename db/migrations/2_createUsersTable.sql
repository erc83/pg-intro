DROP TABLE if exists users;

CREATE TABLE users(
  id serial not null,
  name varchar(30),
  lastname varchar(30)
);
