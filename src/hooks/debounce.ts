import {useEffect, useState} from "react"

// Задержка отправки запросов к серверу
export function useDebounce(value: string, delay: number = 300) {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
     const handler = setTimeout(() => setDebounced(value), delay)
     return () => clearTimeout(handler)
    }, [value, delay])

    return debounced
}