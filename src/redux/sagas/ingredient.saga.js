import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//get all ingredients for individual recipe
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

// update individual ingredient item for existing recipe
function* updateIngredientItem(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.put("/api/ingredient/edit", action.payload, config);
    yield put({
      type: "GET_RECIPE_INGREDIENTS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Update ingredient item request failed", error);
  }
}

// save new ingredient item to existing recipe
function* saveNewIngredientItem(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post("/api/ingredient/edit", action.payload, config);
    yield put({
      type: "GET_RECIPE_INGREDIENTS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Save ingredient item request failed", error);
  }
}

// delete an ingredient item from recipe details page
function* deleteIngredientItem(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(
      `/api/ingredient/${action.payload.ingredient_id}`,
      config
    );
    yield put({
      type: "GET_RECIPE_INGREDIENTS",
      payload: action.payload.recipe_id,
    });
  } catch (error) {
    console.log("Delete ingredient item request failed", error);
  }
}

function* ingredientSaga() {
  yield takeEvery("GET_RECIPE_INGREDIENTS", getRecipeIngredients);
  yield takeEvery("UPDATE_INGREDIENT", updateIngredientItem);
  yield takeEvery("SAVE_NEW_INGREDIENT_ITEM", saveNewIngredientItem);
  yield takeEvery("DELETE_INGREDIENT_ITEM", deleteIngredientItem);
}

export default ingredientSaga;
