CREATE DATABASE "giphy_search_favorites";


-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "gifs" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (100) NOT NULL,
    "url" VARCHAR (250) NOT NULL
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "category_name" VARCHAR (100) NOT NULL,
    "gif_id" integer REFERENCES "gifs" 
);

-- Default categories. You may change them :)
INSERT INTO "category" ("category_name", "gif_id")
VALUES ('nsfw', 2);

INSERT INTO "gifs" ("description", "url")
VALUES ('another test', 'http://google.com');

-- join the two tables for when we display gifs by category
SELECT  "gifs"."id", "gifs"."description", "gifs"."url", "category"."category_name" 
FROM "gifs"
JOIN "category" ON "gifs"."id" = "category"."gif_id";

