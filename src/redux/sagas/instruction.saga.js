import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

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

function* InstructionSaga() {
  yield takeEvery("GET_RECIPE_INSTRUCTIONS", getRecipeInstructions);
}

export default InstructionSaga;
