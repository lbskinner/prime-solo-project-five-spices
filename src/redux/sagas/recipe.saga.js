import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

function* getAllRecipes(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/recipe", config);
    yield put({ type: "SET_ALL_RECIPES", payload: response.data });
  } catch (error) {
    console.log("Get all recipes request failed", error);
  }
}

function* getRecipesByCategory(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(`/api/category/${action.payload}`, config);
    yield put({ type: "SET_ALL_RECIPES_BY_CATEGORY", payload: response.data });
  } catch (error) {
    console.log("Get recipes by category request failed", error);
  }
}

function* recipeSaga() {
  yield takeEvery("GET_ALL_RECIPES", getAllRecipes);
  yield takeEvery("GET_RECIPES_BY_CATEGORY", getRecipesByCategory);
}

export default recipeSaga;
