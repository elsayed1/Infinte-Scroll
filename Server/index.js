const express = require("express");
let allBooks = require("./books.json"); //
const app = express();
const port = process.env.PORT || 4000;

allBooks = allBooks.map((book, index) => ({ ...book, id: index + 1 }));

app.get("/api/books", async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  const books = allBooks.slice(skip, skip + limit);

  const data = {
    books,
    totalCount: allBooks.length,
  };
  res.status(200).json(data);
});

app.get("/api/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const book = allBooks.find((book) => book.id === id);
  if (!book) {
    res.status(404).end("Not Found");
  }
  res.status(200).json(book);
});

app.get("*", (req, res) => {
  res.status(404).end("Not Found");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
