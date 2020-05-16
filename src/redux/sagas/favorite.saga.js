import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

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

// update favorite status for details page, separated into two calls to avoid unnecessary calls to server
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

function* favoriteSaga() {
  yield takeEvery("GET_FAVORITE_RECIPES", getFavoriteRecipes);
  yield takeEvery("UPDATE_FAVORITE", updateFavoriteStatus);
  yield takeEvery(
    "UPDATE_DETAILS_PAGE_FAVORITE",
    updateDetailsPageFavoriteStatus
  );
}

export default favoriteSaga;
