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
      console.log("Get All Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET all recipes by category
 */
router.get("/category/:id", (req, res) => {
  const categoryId = req.params.id;
  const queryText = `SELECT * FROM "recipe" JOIN "recipe_category" ON "recipe".recipe_id = "recipe_category".recipe_id
  WHERE "recipe_category".category_id = $1 ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [categoryId])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get All Recipes Error: ", error);
      res.sendStatus(500);
    });
});
/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
