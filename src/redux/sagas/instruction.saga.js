import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//get all instructions for individual recipe
function* getRecipeInstructions(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/instruction/details/${action.payload}`,
      config
    );
    yield put({ type: "SET_RECIPE_INSTRUCTIONS", payload: response.data });
  } catch (error) {
    console.log("Get recipes instructions by ID request failed", error);
  }
}

// update individual instruction description for existing recipe
function* updateInstructionDescription(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.put("/api/instruction/edit", action.payload, config);
    yield put({
      type: "GET_RECIPE_INSTRUCTIONS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Update ingredient item request failed", error);
  }
}

// save new instruction description to existing recipe
function* saveNewInstructionDescription(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post("/api/instruction/edit", action.payload, config);
    yield put({
      type: "GET_RECIPE_INSTRUCTIONS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Save instruction description request failed", error);
  }
}

// delete an instruction description from recipe details page
function* deleteInstructionDescription(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(
      `/api/instruction/${action.payload.instruction_id}`,
      config
    );
    yield put({
      type: "GET_RECIPE_INSTRUCTIONS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Delete instruction description request failed", error);
  }
}

function* InstructionSaga() {
  yield takeEvery("GET_RECIPE_INSTRUCTIONS", getRecipeInstructions);
  yield takeEvery(
    "SAVE_NEW_INSTRUCTION_DESCRIPTION",
    saveNewInstructionDescription
  );
  yield takeEvery(
    "DELETE_INSTRUCTION_DESCRIPTION",
    deleteInstructionDescription
  );
  yield takeEvery("UPDATE_INSTRUCTION", updateInstructionDescription);
}

export default InstructionSaga;
