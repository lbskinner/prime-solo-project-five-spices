import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// get all category for category list for home page and details page select box
function* getCategoryList(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("./api/category", config);
    yield put({ type: "SET_CATEGORY_LIST", payload: response.data });
  } catch (error) {
    console.log("Get category list request failed", error);
  }
}

// get all recipes by category on home page
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

// get category information for individual recipe by recipe id on details page
function* getRecipeCategory(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/category/details/${action.payload}`,
      config
    );
    yield put({ type: "SET_RECIPE_CATEGORY", payload: response.data });
  } catch (error) {
    console.log("Get recipe categories request failed", error);
  }
}

// add category to individual recipe
function* addCategoryToRecipe(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post("/api/category/details", action.payload, config);
    yield put({
      type: "GET_RECIPE_CATEGORY",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Add category to recipe request failed", error);
  }
}

// delete a category from recipe details page
function* deleteCategoryFromRecipe(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(
      `/api/category/details/${action.payload.recipe_category_id}`,
      config
    );
    yield put({
      type: "GET_RECIPE_CATEGORY",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Delete category from recipe request failed", error);
  }
}

function* categorySaga() {
  yield takeEvery("GET_CATEGORY_LIST", getCategoryList);
  yield takeEvery("GET_RECIPES_BY_CATEGORY", getRecipesByCategory);
  yield takeEvery("GET_RECIPE_CATEGORY", getRecipeCategory);
  yield takeEvery("ADD_CATEGORY", addCategoryToRecipe);
  yield takeEvery("DELETE_CATEGORY", deleteCategoryFromRecipe);
}

export default categorySaga;
