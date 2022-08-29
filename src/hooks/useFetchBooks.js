

import { useEffect, useState } from "react";

const useFetchBooks = url => {
    const [books, setBooks] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        SetIsLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            SetIsLoading(false)

            return data
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }

    useEffect(() => {
        const getBooks = async () => {
            const booksFromServer = await fetchBooks()
            setBooks(booksFromServer)
        }
        getBooks()
    }, [])

    return { books, isLoading, error };
};

export default useFetchBooks;