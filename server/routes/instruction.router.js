const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET individual recipe details for instructions
 */
router.get("/details/:id", rejectUnauthenticated, (req, res) => {
  // id on params us recipe id
  const recipeId = req.params.id;
  const queryText = `SELECT * FROM "instruction" WHERE "recipe_id" = $1  ORDER BY "instruction_id" ASC;`;
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
 * GET route template
 */
router.get("/", (req, res) => {});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
