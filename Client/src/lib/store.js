import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { getBooks, getBook } from "./api.js";
import { put, takeEvery } from "redux-saga/effects";

function* getBooksAction({ payload }) {
  const books = yield getBooks({ params: payload });
  yield put({ type: "BOOKS_FETCH_SUCCEEDED", payload: books });
}
function* getBookAction({ payload }) {
  const book = yield getBook({ id: payload });
  yield put({ type: "BOOK_FETCH_SUCCEEDED", payload: book });
}

function* rootSaga() {
  yield takeEvery("BOOKS_FETCH_REQUESTED", getBooksAction);
  yield takeEvery("BOOK_FETCH_REQUESTED", getBookAction);
}

const books = (state = { books: [] }, action) => {
  switch (action.type) {
    case "BOOKS_FETCH_SUCCEEDED":
      return {
        totalCount: action.payload.totalCount,
        books: [...state.books, ...action.payload.books],
      };
    case "BOOK_FETCH_SUCCEEDED":
      return {
        ...state,
        selectedBook: action.payload,
      };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({ books }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
