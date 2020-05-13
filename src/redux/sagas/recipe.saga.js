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

//delete whole recipe from database
function* deleteRecipe(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(`/api/recipe/${action.payload}`, config);
  } catch (error) {
    console.log("Delete recipe request failed", error);
  }
}

// save new recipe to database
function* saveNewRecipe(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.post("/api/recipe", action.payload, config);
    yield put({
      type: "SET_SAVED_RECIPE_ID",
      payload: response.data,
    });
  } catch (error) {
    console.log("Add new recipe request failed", error);
  }
}

function* recipeSaga() {
  yield takeEvery("GET_ALL_RECIPES", getAllRecipes);
  yield takeEvery("GET_RECIPE_DETAILS", getRecipeDetails);
  yield takeEvery("UPDATE_RECIPE_DETAILS", updateRecipeDetails);
  yield takeEvery("DELETE_RECIPE", deleteRecipe);
  yield takeEvery("SAVE_NEW_RECIPE", saveNewRecipe);
}

export default recipeSaga;
