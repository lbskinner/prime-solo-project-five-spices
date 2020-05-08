import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getRecipeIngredients(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/ingredient/details/${action.payload}`,
      config
    );
    yield put({ type: "SET_RECIPE_INGREDIENTS", payload: response.data });
  } catch (error) {
    console.log("Get recipes ingredients by ID request failed", error);
  }
}

function* ingredientSaga() {
  yield takeEvery("GET_RECIPE_INGREDIENTS", getRecipeIngredients);
}

export default ingredientSaga;
