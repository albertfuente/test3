const Book = ({ book }) => {
    return (
            <div className="book-container">
                <p className="book-name">{book.name}</p>
                <p>{book.publisher}</p>
            </div>
    );
}

export default Book;
