import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// get all recipes for home page
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

// get all favorite recipes for home page
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

// get recipe details for details page
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

// update favorite status for home page
function* updateFavoriteStatus(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.put("/api/recipe/favorite", action.payload, config);
    yield put({ type: "GET_ALL_RECIPES" });
    yield put({ type: "GET_FAVORITE_RECIPES" });
  } catch (error) {
    console.log("Update favorite request failed", error);
  }
}

// update home status for details page, separated into two calls to avoid unnecessary calls to server
function* updateDetailsPageFavoriteStatus(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.put("/api/recipe/favorite", action.payload, config);
    yield put({
      type: "GET_RECIPE_DETAILS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Update favorite request failed", error);
  }
}

// update recipe details
function* updateRecipeDetails(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.put("/api/recipe/edit", action.payload, config);
    yield put({
      type: "GET_RECIPE_DETAILS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Update recipe details request failed", error);
  }
}

function* recipeSaga() {
  yield takeEvery("GET_ALL_RECIPES", getAllRecipes);
  yield takeEvery("GET_FAVORITE_RECIPES", getFavoriteRecipes);
  yield takeEvery("GET_RECIPE_DETAILS", getRecipeDetails);
  yield takeEvery("UPDATE_FAVORITE", updateFavoriteStatus);
  yield takeEvery(
    "UPDATE_DETAILS_PAGE_FAVORITE",
    updateDetailsPageFavoriteStatus
  );
  yield takeEvery("UPDATE_RECIPE_DETAILS", updateRecipeDetails);
}

export default recipeSaga;
