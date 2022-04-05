const BASE_URL = "api/books";

export const getBooks = async ({ params } = {}) =>
  fetch(`${BASE_URL}?${new URLSearchParams(params).toString()}`).then((res) =>
    res.json()
  );

export const getBook = async ({ id } = {}) =>
  fetch(`${BASE_URL}/${id}`).then((res) => res.json());
