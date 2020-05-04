
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

-- create additional tables for app
CREATE TABLE "recipe" (
  "recipe_id" SERIAL PRIMARY KEY,
  "recipe_name" VARCHAR (255) NOT NULL,
  "description" VARCHAR (1000),
  "total_time" VARCHAR (80),
  "serving_size" VARCHAR (80),
  "favorite" BOOLEAN DEFAULT false,
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

-- insert some values to test
INSERT INTO "user" ("username", "email", "password") 
VALUES ('new-user', 'new-user@example.com', '$2b$10$kSMbZyBRs/6oOM92HdY8pebXPlyehd6FIqg8.EEdWkQqamSisMKTe');
-- user_id created was 3 and password was 1234

INSERT INTO "recipe" ("recipe_name", "description", "total_time", "serving_size", "user_id")
VALUES ('Quick and Easy Brownies', 'This quick and easy recipe for chocolate brownies with walnuts takes about 45 minutes to make.',
'PT35M', '20 bars', '3');

INSERT INTO "ingredient" ("ingredient_item", "recipe_id")
VALUES ('1 cup butter, melted', 1), ('2 cups white sugar', 1),('½ cup cocoa powder', 1), ('1 teaspoon vanilla extract', 1),
('4 eggs', 1), ('1 ½ cups all-purpose flour', 1),('½ teaspoon baking powder', 1), ('½ teaspoon salt', 1),
('½ cup walnut halves', 1);

INSERT INTO "instruction" ("instruction_number", "instruction_descrption", "recipe_id")
VALUES (1, 'Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch pan.', 1), 
(2, 'Combine the melted butter, sugar, cocoa powder, vanilla, eggs, flour, baking powder, and salt. Spread the batter into the prepared pan. Decorate with walnut halves, if desired.', 1),
(3, 'Bake in preheated oven for 20 to 30 minutes or until a toothpick inserted in the center comes out with crumbs, not wet. Cool on wire rack.', 1);

INSERT INTO "category" ("category_name") 
VALUES ('Appetizers & Sides'), ('Beverages'), ('Desserts & Bread'), ('Meat'), ('Pasta'), ('Rice & Noodles'), 
('Soups & Salads'), ('Seafood'), ('Vegetables'), ('Miscellaneous');

