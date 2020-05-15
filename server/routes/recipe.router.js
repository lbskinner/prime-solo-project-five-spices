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
  const queryText = `SELECT * FROM "recipe" WHERE "user_id" = $1 ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [req.user.id])
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
router.get("/favorite", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "recipe" WHERE "user_id" = $1 AND "favorite" = true ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [req.user.id])
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
router.get("/search", rejectUnauthenticated, (req, res) => {
  const searchWords = req.query.q;
  console.log(searchWords);

  const queryText = `SELECT "recipe".*, array_agg("ingredient".ingredient_item) FROM "recipe" JOIN "ingredient" 
  ON "recipe".recipe_id = "ingredient".recipe_id WHERE "recipe".user_id = $1 
  AND ("recipe".recipe_name iLIKE $2 OR "recipe".description iLIKE $2 
  OR "ingredient".ingredient_item iLIKE $2) GROUP BY "recipe".recipe_id;`;
  pool
    .query(queryText, [req.user.id, `%${searchWords}%`])
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
router.get("/details/:id", rejectUnauthenticated, (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT * FROM "recipe" WHERE "recipe_id" = $1 AND "user_id" = $2;`;
  pool
    .query(queryText, [recipeId, req.user.id])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get Recipe Details Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * POST new recipe with ingredients and instructions
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  const newRecipeData = req.body;
  console.log(newRecipeData);
  try {
    // save recipe data to recipe table and have it return the recipe_id
    const queryTextRecipe = `INSERT INTO "recipe" ("recipe_name", "description", "total_time", "serving_size", "user_id", "image_url", "recipe_url")
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "recipe_id";`;
    // use await to save recipe to recipe table
    const savedRecipeDate = await pool.query(queryTextRecipe, [
      newRecipeData.recipe_name,
      newRecipeData.description,
      newRecipeData.total_time,
      newRecipeData.serving_size,
      req.user.id,
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
    res.send(savedRecipeDate.rows);
    // res.sendStatus(201);
  } catch (error) {
    console.log("Post Recipe Error: ", error);
    res.sendStatus(500);
  }
});

/**
 * PUT update recipe details except for original recipe URL
 */
router.put("/edit", rejectUnauthenticated, (req, res) => {
  const updatedRecipeData = req.body;
  const queryText = `UPDATE "recipe" SET "recipe_name" = $1, "description" = $2, "total_time" = $3, 
    "serving_size" = $4, "image_url" = $5 WHERE "recipe_id" = $6;`;
  pool
    .query(queryText, [
      updatedRecipeData.recipe_name,
      updatedRecipeData.description,
      updatedRecipeData.total_time,
      updatedRecipeData.serving_size,
      updatedRecipeData.image_url,
      updatedRecipeData.recipe_id,
    ])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Put Recipe Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * PUT update favorite status of recipe, assuming the true and false logic check will be in the front
 */
router.put("/favorite", rejectUnauthenticated, (req, res) => {
  const favoriteData = req.body;
  const queryText = `UPDATE "recipe" SET "favorite" = $1 WHERE "recipe_id" = $2;`;
  pool
    .query(queryText, [favoriteData.favorite, favoriteData.recipe_id])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Put Favorite Error: ", error);
      res.sendStatus(500);
    });
});

/**
 *DELETE individual recipe by recipe id, database is set up with on delete cascade, 
 when delete a recipe, all ingredients and instructions related are deleted as well
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
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
