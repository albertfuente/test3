import { useEffect, useState } from "react";
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Book from "../atoms/Book";
import BookInfo from "../atoms/BookInfo";
import useFetchBooks from "../hooks/useFetchBooks";
import { booksUrl } from "../services/urlPaths";

const ListBooks = () => {
    const [filter, SetFilter] = useState('');
    const [searchedBooks, setSearchedBooks] = useState(null);
    let url = booksUrl;

    const { books, isLoading } = useFetchBooks(url)

    useEffect(() => {
        if (!searchedBooks) {
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
        }
        else if (searchedBooks) {
            if (filter === 'asc') {
                searchedBooks.sort(function (a, b) {
                    var keyA = a.name,
                        keyB = b.name
                    if (keyA < keyB) return -1
                    if (keyA > keyB) return 1
                    return 0
                })
            } else if (filter === 'desc') {
                searchedBooks.sort(function (a, b) {
                    var keyA = a.name,
                        keyB = b.name;
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                })
            }
        }
        SetFilter('')

    }, [filter, books, searchedBooks])

    function filterBooksAsc() {
        SetFilter('asc')
    }
    function filterBooksDesc() {
        SetFilter('desc')
    }

    function onSearch() {
        const i = document.getElementById('input')
        const wordToSearch = i.value.toLowerCase()
        setSearchedBooks(books.filter(book => {
            if (book.name.toLowerCase().includes(wordToSearch)) {
                return book
            }
        }))
    }

    function BookDetail() {
        const params = useParams();

        return (
            <div className="list-book-container">
                <Link to="/" style={{ textDecoration: 'none', background: '#095BEB', color: '#E0EAF5', padding: '10px', borderRadius: '5px' }}>Go back</Link>
                <BookInfo bookId={params.bookId} />
            </div>
        );
    }

    function Books() {
        return (
            <div className="list-books-main-container">
                {!isLoading ? <div>
                    <div className="list-books-title-filter">
                        <form>
                            <input
                                type="text"
                                id='input'
                                placeholder="Enter a search word"
                            />
                            <button type="submit" onClick={onSearch} className="list-books-btn">Search</button>
                        </form>
                        <label >* Sort title by:</label>
                        <div >
                            <button onClick={filterBooksAsc} className="list-books-title-btn">A - Z</button>
                            <button onClick={filterBooksDesc} className="list-books-title-btn">Z - A</button>
                        </div>
                    </div>
                    <div className="list-books-header-container">
                        <h2 >Title</h2>
                        <h2>Publisher</h2>
                    </div>
                    {searchedBooks ? <div className="list-books-container">{searchedBooks.map((book, index) => (
                        <Link key={index} to={`/book/${book.url.slice(-1)}`} className="list-books-element" style={{ textDecoration: 'none' }}>
                            <Book book={book} />
                        </Link>
                    ))}
                    </div>
                        :
                        <div className="list-books-container">{books.map((book, index) => (
                            <Link key={index} to={`/book/${book.url.slice(-1)}`} className="list-books-element" style={{ textDecoration: 'none' }}>
                                <Book book={book} />
                            </Link>
                        ))}
                        </div>}
                </div> : <div className="loader"></div>}
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
