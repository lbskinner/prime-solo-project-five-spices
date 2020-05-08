import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

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

function* categorySaga() {
  yield takeEvery("GET_CATEGORY_LIST", getCategoryList);
  yield takeEvery("GET_RECIPES_BY_CATEGORY", getRecipesByCategory);
}

export default categorySaga;
