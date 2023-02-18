import React, {useState} from "react"
import {IRepo} from "../models/model"
import {useActions} from "../hooks/actions"
import {useAppSelector} from "../hooks/redux"

export const RepoCard = ({ repo }: { repo: IRepo }) => {

    const {addFavorite, removeFavorite} = useActions()
    const {favorites} = useAppSelector(state => state.github)
    const [isFavorite, setIsFavorite] = useState(favorites.includes(repo.html_url))

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
       event.preventDefault()
       setIsFavorite(true)
       addFavorite(repo.html_url)
    }

    const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setIsFavorite(false)
        removeFavorite(repo.html_url)
    }


    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p className="text-sm">
                    Forks: <span className="text-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="text-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo?.description}</p>

                { isFavorite ?
                    <button
                        onClick={removeFromFavorite}
                        className="px-2 py-4 bg-red-400 rounded hover:shadow-md transition-all">
                        Remove
                    </button>
                    :
                    <button
                    onClick={addToFavorite}
                    className="px-2 py-4 bg-yellow-400 rounded hover:shadow-md transition-all mr-2">
                    Add
                    </button>
                }

            </a>
        </div>
    )
}