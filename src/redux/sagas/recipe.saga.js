import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

function* getAllRecipes(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("./api/recipe", config);
    yield put({ type: "SET_ALL_RECIPES", payload: response.data });
  } catch (error) {
    console.log("Get all recipes request failed", error);
  }
}

function* recipeSaga() {
  yield takeEvery("GET_ALL_RECIPES", getAllRecipes);
}

export default recipeSaga;
