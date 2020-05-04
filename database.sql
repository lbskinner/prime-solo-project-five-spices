
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "recipe" (
  "recipe_id" SERIAL PRIMARY KEY,
  "recipe_name" VARCHAR (255) NOT NULL,
  "description" VARCHAR (1000),
  "total_time" VARCHAR (80),
  "serving_size" VARCHAR (80),
  "favorite" BOOLEAN,
  "user_id" INT REFERENCES "user" ON DELETE CASCADE
);

CREATE TABLE "ingredient" (
  "ingredient_id" SERIAL PRIMARY KEY,
  "ingredient_item" VARCHAR (255) NOT NULL,
  "recipe_id" INT REFERENCES "recipe" ON DELETE CASCADE
);

CREATE TABLE "instruction" (
  "instruction_id" SERIAL PRIMARY KEY,
  "instruction_number" INTEGER,
  "instruction_descrption" VARCHAR (1000) NOT NULL,
  "recipe_id" INT REFERENCES "recipe" ON DELETE CASCADE
);

CREATE TABLE "category" (
  "category_id" SERIAL PRIMARY KEY,
  "category_name" VARCHAR (80)
);

CREATE TABLE "recipe_category" (
  "recipe_category_id" SERIAL PRIMARY KEY,
  "category_id" INT REFERENCES "category",
  "recipe_id" INT REFERENCES "recipe" ON DELETE CASCADE
);

