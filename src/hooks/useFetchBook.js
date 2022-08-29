import { useEffect, useState } from "react";

const useFetchBook = url => {
    const [book, setBook] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBook = async () => {
        SetIsLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            SetIsLoading(false)

            return data
        } catch (e) {
            console.log(e)
            setError(e)
        }
    }

    useEffect(() => {
        const getBook = async () => {
            const bookFromServer = await fetchBook()
            setBook(bookFromServer)
        }
        getBook()

    }, [])

    return { book, isLoading, error };
};

export default useFetchBook;