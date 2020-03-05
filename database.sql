CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "gifs" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (100) NOT NULL,
    "url" VARCHAR (250) NOT NULL
)

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL,
    "gif_id" integer REFERENCES "gifs"."id" ,
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

INSERT INTO "gifs" ("description", "url")
VALUES ('test', 'http://google.com')
