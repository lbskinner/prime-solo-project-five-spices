const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET all recipes for home page list
 */
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "recipe" ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText)
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get All Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET favorite recipes for home page list
 */
router.get("/favorite", (req, res) => {
  const queryText = `SELECT * FROM "recipe" WHERE "favorite" = true ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText)
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get Favorite Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET recipes by search keywords
 */
router.get("/search", (req, res) => {
  const searchWords = req.query.q;
  console.log(searchWords);

  const queryText = `SELECT "recipe".recipe_id, "recipe".recipe_name, "recipe".description, array_agg("ingredient".ingredient_item) FROM "recipe"
    JOIN "ingredient" ON "recipe".recipe_id = "ingredient".recipe_id WHERE "recipe".recipe_name LIKE $1 OR
    "recipe".description LIKE $1 OR "ingredient".ingredient_item LIKE $1 GROUP BY "recipe".recipe_id;`;
  pool
    .query(queryText, [`%${searchWords}%`])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Search Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET individual recipe details for recipe and ingredients
 */
router.get("/details/:id", (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT "recipe".*, array_agg("ingredient".ingredient_item) FROM "recipe" 
  JOIN "ingredient" ON "recipe".recipe_id = "ingredient".recipe_id 
  WHERE "recipe".recipe_id = $1 GROUP BY "recipe".recipe_id;`;
  pool
    .query(queryText, [recipeId])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get Recipe Ingredients Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET individual recipe details for instructions
 */
router.get("/details-instructions/:id", (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT "instruction_number", "instruction_description", "recipe_id" 
  FROM "instruction" WHERE "recipe_id" = $1  ORDER BY "instruction_id" ASC;`;
  pool
    .query(queryText, [recipeId])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get Recipe Instructions Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

/**
 * POST new recipe
 */
router.post("/", async (req, res) => {
  const newRecipeData = req.body;
  //   let ingredientArray = [];
  //   for (let i = 1; i <= newRecipeData.ingredient.length; i++) {
  //     item = `$${i}`;
  //     ingredientArray.push(item);
  //   }
  const queryTextRecipe = `INSERT INTO "recipes" ("recipe_name", "description", "total_time", serving_size", "user_id", "image_url", "recipe_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "recipe_id";`;
  const savedRecipeDate = await pool.query(queryTextRecipe, [
    newRecipeData.name,
    newRecipeData.description,
    newRecipeData.time,
    newRecipeData.serving,
    newRecipeData.user_id,
    newRecipeData.image_url,
    newRecipeData.recipe_url,
  ]);
  const newIngredientArray = newRecipeData.ingredient.map((item, index) => {
    return `('${item}', ${savedRecipeDate.rows[0].recipe_id})`;
  });
  const queryTextIngredient = `INSERT INTO "ingredient" ("ingredient_item", "recipe_id") 
      VALUES (${newIngredientArray.join(".")});`;
  const savedIngredientData = await pool.query(queryTextIngredient);
  const newInstructionArray = newRecipeData.instruction.map((step, index) => {
    return `(${step.instruction_number}, '${step.instruction_description}', ${savedRecipeDate.rows[0].recipe_id})`;
  });
  const queryTextInstruction = `INSERT INTO "instruction" ("instruction_number", "instruction_description", "recipe_id")
    VALUES (${newInstructionArray.join(",")});`;

  const savedInstructionData = await pool.query(queryTextInstruction);
  res.sendStatus(201);

  // .then((responseFromDb) => {
  //   const recipeId = responseFromDb.rows[0].recipe_id;
  //   pool.query(queryTextIngredient);
  // })
  // .catch((error) => {
  //   console.log("Post New Recipe Error: ", error);
  // });
});

/**
 *DELETE individual recipe by recipe id
 */
router.delete("/:id", (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `DELETE FROM "recipe" WHERE "recipe_id" = $1;`;
  pool
    .query(queryText, [recipeId])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Delete Recipe Error: ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
