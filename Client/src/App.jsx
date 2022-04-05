import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  List,
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
} from "react-virtualized";

import { fetchBooks } from "./lib/actions";
import { store } from "./lib/store";

import "react-virtualized/styles.css";
import "./App.css";
import Book from "./components/Book";
import BookItem from "./components/Book/BookItem";

const BooksApp = () => {
  const dispatch = useDispatch();
  const { books = [], totalCount = 0 } = useSelector((state) => state.books);
  const params = { limit: 30, skip: books.length };
  const getBooks = async () => await dispatch(fetchBooks({ params }));

  useEffect(() => {
    getBooks();
  }, []);

  function isRowLoaded({ index }) {
    return !!books[index];
  }

  function rowRenderer({ key, index, style }) {
    const book = books[index];
    return <BookItem book={book} key={key} style={style} />;
  }

  return (
    <div>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={getBooks}
        rowCount={totalCount}
        threshold={10}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    className="List"
                    autoHeight
                    height={height}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    isScrolling={isScrolling}
                    ref={registerChild}
                    rowCount={books.length}
                    rowHeight={260}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BooksApp />} />
          <Route path="/:id" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
