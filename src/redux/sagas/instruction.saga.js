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
function* InstructionSaga() {
  yield takeEvery("GET_RECIPE_INSTRUCTIONS", getRecipeInstructions);
  yield takeEvery(
    "SAVE_NEW_INSTRUCTION_DESCRIPTION",
    saveNewInstructionDescription
  );
}

export default InstructionSaga;
