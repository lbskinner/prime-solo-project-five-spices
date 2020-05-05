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
      console.log("Get All Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET individual recipe details, need more work
 */
router.get("/:id", (req, res) => {
  const recipeId = req.params.id;
  const queryText = `SELECT "recipe".*, array_agg("ingredient".ingredient_item), json_agg(json_build_object('instruction_num', "instruction".instruction_number, 'instruction_descrip', "instruction".instruction_descrption)) as "instructions" FROM "recipe" JOIN "ingredient" ON "recipe".recipe_id = "ingredient".recipe_id JOIN "instruction" on "recipe".recipe_id = "instruction".recipe_id 
  WHERE "recipe".recipe_id = $1 GROUP BY "recipe".recipe_id;`;
  pool
    .query(queryText, [recipeId])
    .then((responseFromDb) => {
      res.send(responseFromDb.rows);
    })
    .catch((error) => {
      console.log("Get All Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * GET category list for individual recipe details page
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
      console.log("Get All Recipes Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
