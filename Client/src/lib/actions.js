export const fetchBooks = ({ params }) => ({
  type: "BOOKS_FETCH_REQUESTED",
  payload: params,
});

export const fetchBook = ({ id }) => ({
  type: "BOOK_FETCH_REQUESTED",
  payload: id,
});
