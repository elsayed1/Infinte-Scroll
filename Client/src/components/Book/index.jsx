import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBook } from "../../lib/actions";

const Book = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBook } = useSelector((state) => state.books);
  const getBook = async () => await dispatch(fetchBook({ id }));

  useEffect(() => {
    getBook();
  }, []);
  if (!selectedBook) return <>loading....</>;

  return (
    <div className="card">
      <div className="flex">
        <div style={{ marginRight: "10px" }}>
          <img src={selectedBook.thumbnailUrl} alt={selectedBook.title} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <h2>{selectedBook.title}</h2>
          <p>Authors : {selectedBook.authors}</p>

          <div className="flex" style={{ justifyContent: "space-evenly" }}>
            <p>Status : {selectedBook.status}</p>
            <p>Categories : {selectedBook.categories}</p>
          </div>
          <div className="flex" style={{ justifyContent: "space-evenly" }}>
            <p>
              Publish At :{" "}
              {new Date(selectedBook.publishedDate.$date).toDateString()}
            </p>
            <p>Pages Count : {selectedBook.pageCount}</p>
          </div>
        </div>
      </div>

      <h4>{selectedBook.longDescription}</h4>
    </div>
  );
};

export default Book;
