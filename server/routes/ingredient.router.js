const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET individual recipe details for ingredients
 */
router.get("/details/:id", rejectUnauthenticated, (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT * FROM "ingredient" WHERE "recipe_id" = $1 ORDER BY "ingredient_id";`;
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
 * POST additional ingredient for existing recipe, for edit page
 */
router.post("/edit", rejectUnauthenticated, (req, res) => {
  const newIngredientData = req.body;
  const queryText = `INSERT INTO "ingredient" ("ingredient_item", "recipe_id")
VALUES ($1, $2);`;
  pool
    .query(queryText, [
      newIngredientData.ingredient_item,
      newIngredientData.recipe_id,
    ])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log("Post Ingredient Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * PUT update existing ingredient to existing recipe on details page for edit
 */
router.put("/edit", rejectUnauthenticated, (req, res) => {
  const updatedIngredientDate = req.body;
  const queryText = `UPDATE "ingredient" SET "ingredient_item" = $1 WHERE "ingredient_id" = $2;`;
  pool
    .query(queryText, [
      updatedIngredientDate.ingredient_item,
      updatedIngredientDate.ingredient_id,
    ])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Put Ingredient Error: ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
