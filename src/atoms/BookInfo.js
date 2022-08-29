import useFetchBook from "../hooks/useFetchBook";
import { bookUrl } from "../services/urlPaths";

const BookInfo = ({ bookId }) => {
    let url = `${bookUrl}${bookId}`;

    const { book, isLoading } = useFetchBook(url)

    return (
        <>
            {!isLoading ? <div className="book-info-container">
                <label>Title:</label>
                <h4>{book.name}</h4>
                <label>Authors:</label>
                <h4>{book.authors}</h4>
                <label>Country:</label>
                <h4>{book.country}</h4>
                <label>Number of Pages:</label>
                <h4>{book.numberOfPages}</h4>
                <label>Publisher:</label>
                <h4>{book.publisher}</h4>
                <label>Released:</label>
                <h4>{book.released}</h4>
            </div> : <div class="loader"></div>}
        </>
    );
}

export default BookInfo;