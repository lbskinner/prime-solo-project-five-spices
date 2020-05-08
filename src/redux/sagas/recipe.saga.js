import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

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

function* getFavoriteRecipes(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/recipe/favorite", config);
    yield put({ type: "SET_ALL_FAVORITE_RECIPES", payload: response.data });
  } catch (error) {
    console.log("Get favorite recipes request failed", error);
  }
}

function* getRecipeDetails(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/recipe/details/${action.payload}`,
      config
    );
    yield put({ type: "SET_RECIPE_DETAILS", payload: response.data });
  } catch (error) {
    console.log("Get recipes details by ID request failed", error);
  }
}

function* recipeSaga() {
  yield takeEvery("GET_ALL_RECIPES", getAllRecipes);
  yield takeEvery("GET_FAVORITE_RECIPES", getFavoriteRecipes);
  yield takeEvery("GET_FAVORITE_RECIPE_DETAILS", getRecipeDetails);
}

export default recipeSaga;
