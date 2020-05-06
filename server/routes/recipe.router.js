const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET all recipes for home page list
 */
router.get("/", rejectUnauthenticated, (req, res) => {
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
 * GET individual recipe details
 */
router.get("/details/:id", (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT * FROM "recipe" WHERE "recipe_id" = $1;`;
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
 * POST route template
 */
// router.post("/", (req, res) => {});

/**
 * POST new recipe with ingredients and instructions
 */
router.post("/", async (req, res) => {
  const newRecipeData = req.body;
  console.log(newRecipeData);
  try {
    // save recipe data to recipe table and have it return the recipe_id
    const queryTextRecipe = `INSERT INTO "recipe" ("recipe_name", "description", "total_time", "serving_size", "user_id", "image_url", "recipe_url")
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "recipe_id";`;
    // use await to save recipe to recipe table
    const savedRecipeDate = await pool.query(queryTextRecipe, [
      newRecipeData.name,
      newRecipeData.description,
      newRecipeData.time,
      newRecipeData.serving,
      newRecipeData.user_id,
      newRecipeData.image_url,
      newRecipeData.recipe_url,
    ]);
    console.log("Recipe ID: ", savedRecipeDate.rows);
    // map through through the ingredient array to create a new ingredient array for VALUES for queryText
    const newIngredientArray = newRecipeData.ingredient.map((item, index) => {
      return `('${item}', ${savedRecipeDate.rows[0].recipe_id})`;
    });
    console.log(newIngredientArray);
    // create queryText to save data to ingredient table with the new ingredient array created in prior step
    const queryTextIngredient = `INSERT INTO "ingredient" ("ingredient_item", "recipe_id")
        VALUES ${newIngredientArray.join(",")};`;
    console.log(queryTextIngredient);
    // use await to save to ingredient table
    const savedIngredientData = await pool.query(queryTextIngredient);
    console.log(savedIngredientData);
    // map through the instruction array to create a new instruction array for VALUES for queryText
    const newInstructionArray = newRecipeData.instruction.map((step, index) => {
      return `(${step.instruction_number}, '${step.instruction_description}', ${savedRecipeDate.rows[0].recipe_id})`;
    });
    console.log(newInstructionArray);
    // create queryText to save data to instruction table with the new instruction array created in prior step
    const queryTextInstruction = `INSERT INTO "instruction" ("instruction_number", "instruction_description", "recipe_id")
      VALUES ${newInstructionArray.join(",")};`;
    console.log(queryTextInstruction);
    // use await to save to instruction table
    const savedInstructionData = await pool.query(queryTextInstruction);
    console.log(savedInstructionData);
    res.sendStatus(201);
  } catch (error) {
    console.log("Post Recipe Error: ", error);
    res.sendStatus(500);
  }
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
