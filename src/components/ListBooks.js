import { useEffect, useState } from "react";
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Book from "../atoms/Book";
import BookInfo from "../atoms/BookInfo";

const ListBooks = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [isTitleFilterClicked, SetIsTitleFilterClicked] = useState(false);
    const [filter, SetFilter] = useState('');
    const [firstName, setFirstName] = useState('');

    let url = 'https://www.anapioficeandfire.com/api/books';

    const fetchBooks = async () => {
        SetIsLoading(true)
        const res = await fetch(url)
        const data = await res.json()
        SetIsLoading(false)

        return data
    }

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchBooks()
            setBooks(tasksFromServer)
        }
        getTasks()
    }, [])

    useEffect(() => {
        if (filter === 'asc') {
            books.sort(function (a, b) {
                var keyA = a.name,
                    keyB = b.name
                if (keyA < keyB) return -1
                if (keyA > keyB) return 1
                return 0
            })
        } else if (filter === 'desc') {
            books.sort(function (a, b) {
                var keyA = a.name,
                    keyB = b.name;
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            })
        }
        SetFilter('')
    }, [filter, books])

    function BookDetail() {
        const params = useParams();

        return (
            <div className="list-book-container">
                <Link to="/" style={{ textDecoration: 'none', background: '#095BEB', color: '#E0EAF5', padding: '5px' }}>Go back</Link>
                <BookInfo bookId={params.bookId} />
            </div>
        );
    }

    function openFilter() {
        SetIsTitleFilterClicked(!isTitleFilterClicked)
    }

    function filterBooksAsc() {
        SetFilter('asc')
    }
    function filterBooksDesc() {
        SetFilter('desc')
    }

    function logQuery() {
        console.log('query', firstName)
    }

    function Input() {
        return (
            <div>
                {/* <input value={firstName}   name="firstName" onInput={e => setFirstName(e.target.value)} /> */}

                <form>
                    <label>Enter your name:
                        <input
                            type="text"

                        />
                    </label>

                </form>
                <button type="submit" onClick={logQuery}>Search</button>

            </div>



        );
    }

    function Books() {
        return (
            <div className="list-books-main-container">
                {!isLoading ? <div>
                    <div className="list-books-header-container">
                        <div className="list-books-title-filter">
                            <h2 >Title</h2>
                            <Input />
                            <label onClick={openFilter} className="list-books-title-btn"  >* Sort title by:</label>
                            {isTitleFilterClicked && <div >
                                <div onClick={filterBooksAsc} className="list-books-title-btn">Ascending</div>
                                <div onClick={filterBooksDesc} className="list-books-title-btn">Descending</div>
                            </div>}
                        </div>
                        <h2>Publisher</h2>
                    </div>
                    <div className="list-books-container">{books.map((book) => (
                        <Link to={`/book/${book.url.slice(-1)}`} className="list-books-element" style={{ textDecoration: 'none' }}>
                            <Book book={book} />
                        </Link>
                    ))}
                    </div>
                </div> : <h1>Loading...</h1>}
            </div>
        )
    }


    return (
        <div>
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/book/:bookId" element={<BookDetail />} />
            </Routes>
        </div>
    );
}

export default ListBooks;
