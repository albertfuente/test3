import { useEffect, useState } from "react";

const BookInfo = ({ bookId }) => {
    const [isLoading, SetIsLoading] = useState(false);
    const [book, setBook] = useState([])

    let url = `https://www.anapioficeandfire.com/api/books/${bookId}`;

    const fetchBook = async () => {
        SetIsLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            SetIsLoading(false)

            return data
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getBook = async () => {
            const bookFromServer = await fetchBook()
            setBook(bookFromServer)
        }
        getBook()

    }, [])

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