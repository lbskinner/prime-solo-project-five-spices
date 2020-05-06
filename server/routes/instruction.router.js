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
 * POST additional instruction for existing recipe, for edit page
 */
router.post("/edit", rejectUnauthenticated, (req, res) => {
  const newInstructionData = req.body;
  const queryText = `INSERT INTO "instruction" ("instruction_number", "instruction_description", "recipe_id")
  VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [
      newInstructionData.instruction_number,
      newInstructionData.instruction_description,
      newInstructionData.recipe_id,
    ])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log("Post Instruction Error: ", error);
      res.sendStatus(500);
    });
});

/**
 * PUT update existing instruction to existing recipe on details page for edit
 */
router.put("/edit", rejectUnauthenticated, (req, res) => {
  const updatedInstructionData = req.body;
  const queryText = `UPDATE "instruction" SET "instruction_description" = $1 WHERE "instruction_id" = $2;`;
  pool
    .query(queryText, [
      updatedInstructionData.instruction_description,
      updatedInstructionData.instruction_id,
    ])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("Put Instruction Error: ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
