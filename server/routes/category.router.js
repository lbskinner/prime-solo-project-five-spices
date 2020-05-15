const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET all recipes by category
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  // id on params is category id
  const categoryId = req.params.id;
  const queryText = `SELECT * FROM "recipe" JOIN "recipe_category" ON "recipe".recipe_id = "recipe_category".recipe_id
    WHERE "recipe_category".category_id = $1 AND "recipe".user_id = $2 ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [categoryId, req.user.id])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get Recipes By Category Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET categories for individual recipe details page
 */
router.get("/details/:id", rejectUnauthenticated, (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT "category".category_id, "category".category_name, "recipe_category".recipe_id, "recipe_category".recipe_category_id
    FROM "category" JOIN "recipe_category" ON "category".category_id = "recipe_category".category_id
    WHERE "recipe_category".recipe_id = $1;`;
  pool
    .query(queryText, [recipeId])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get Category for Recipe Details Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET category list for individual recipe details page select box & home page
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "category";`;
  pool
    .query(queryText)
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get All Categories Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * POST category to individual recipe
 */
router.post("/details", rejectUnauthenticated, (req, res) => {
  const recipeCategoryDate = req.body;
  const queryText = `INSERT INTO "recipe_category" ("category_id", "recipe_id")
      VALUES ($1, $2);`;
  pool
    .query(queryText, [
      recipeCategoryDate.category_id,
      recipeCategoryDate.recipe_id,
    ])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log("Post Recipe Category Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * DELETE category from individual recipe
 */
router.delete("/details/:id", rejectUnauthenticated, (req, res) => {
  // id on params is recipe_category_id
  const recipeCategoryId = req.params.id;
  console.log(recipeCategoryId);
  const queryText = `DELETE FROM "recipe_category" WHERE "recipe_category_id" = $1`;
  pool
    .query(queryText, [recipeCategoryId])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Delete Recipe Category Error: ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
