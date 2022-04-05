import { useNavigate } from "react-router-dom";

const BookItem = ({ book, style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${book.id}`);
  };

  return (
    <div style={style} onClick={handleClick}>
      <div className="card flex">
        <div style={{ marginRight: "10px" }}>
          <img src={book.thumbnailUrl} alt={book.title} />
        </div>
        <div>
          <h3>{book.title}</h3>
          <h5>{book.shortDescription}</h5>
          <p>Authors : {book.authors}</p>
          <p>Status : {book.status}</p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
