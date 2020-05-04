
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
  "image_url" VARCHAR (2083),
  "recipe_url" VARCHAR (2083),
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

INSERT INTO "instruction" ("instruction_number", "instruction_descrption", "recipe_id")
VALUES (1, 'Heat oven to 400°F. Line 13x9-inch pan with foil; spray with cooking spray.', 2), 
(2, 'In large bowl, mix all ingredients. Shape mixture into 24 (1 1/2-inch) meatballs. Place 1 inch apart in pan.', 2),(3, 'Bake uncovered 18 to 22 minutes or until temperature reaches 160°F and no longer pink in center.', 2);

INSERT INTO "recipe" ("recipe_name", "description", "total_time", "serving_size", "user_id")
VALUES ('Classic Meatballs', '', 'PT0H40M', '4', '3');

INSERT INTO "ingredient" ("ingredient_item", "recipe_id")
VALUES ('1 lb lean (at least 80%) ground beef', 2), ('1/2 cup Progresso™ Italian-style bread crumbs', 2),('1/4 cup milk', 2), 
('1/2 teaspoon salt', 2), ('1/2 teaspoon Worcestershire sauce', 2), ('1/4 teaspoon pepper', 2),
('1 small onion, finely chopped (1/4 cup)', 2), ('1 egg', 2);

INSERT INTO "recipe" ("recipe_name", "description", "total_time", "serving_size", "user_id", "image_url", "recipe_url")
VALUES ('The Best Lemon Bars', 'These tart, rich lemon bars need just seven common ingredients you probably already have, and are done in 55 minutes!', 'PT55M', '1 - 9x13 inch pan or 36', '3', '', 'https://www.allrecipes.com/recipe/10294/the-best-lemon-bars/');

INSERT INTO "ingredient" ("ingredient_item", "recipe_id")
VALUES ('1 cup butter, softened', 3), ('½ cup white sugar', 3),('2 cups all-purpose flour', 3), 
('4 eggs', 3), ('1 ½ cups white sugar', 3), ('¼ cup all-purpose flour', 3),
('2 lemons, juiced', 3);


INSERT INTO "instruction" ("instruction_number", "instruction_descrption", "recipe_id")
VALUES (1, 'Preheat oven to 350 degrees F (175 degrees C).', 3), 
(2, 'In a medium bowl, blend together softened butter, 2 cups flour and 1/2 cup sugar. Press into the bottom of an ungreased 9x13 inch pan.', 3),
(3, 'Bake for 15 to 20 minutes in the preheated oven, or until firm and golden. In another bowl, whisk together the remaining 1 1/2 cups sugar and 1/4 cup flour. Whisk in the eggs and lemon juice. Pour over the baked crust.', 3), 
(4, 'Bake for an additional 20 minutes in the preheated oven. The bars will firm up as they cool. For a festive tray, make another pan using limes instead of lemons and adding a drop of green food coloring to give a very pale green. After both pans have cooled, cut into uniform 2 inch squares and arrange in a checker board fashion.', 3);