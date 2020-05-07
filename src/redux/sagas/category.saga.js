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

function* categorySaga() {
  yield takeEvery("GET_CATEGORY_LIST", getCategoryList);
}

export default categorySaga;
