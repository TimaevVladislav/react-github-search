import React, {useEffect, useState} from "react"
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api"
import {useDebounce} from "../hooks/debounce"
import {RepoCard} from "../components/RepoCard"


export const HomePage = () => {
    const [dropdown, setDropdown] = useState(false)
    const [search, setSearch] = useState("")
    const debounced = useDebounce(search)
    const {isLoading, isError, data: users} = useSearchUsersQuery(debounced, {skip: debounced.length < 3, refetchOnFocus: true})
    const [fetchRepos, { isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && users?.length! > 0)
    }, [debounced, users])

    return (
     <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
         { isError && <p className="text-center text-red-600">Something went wrong...</p> }

         <div className="relative w-[560px]">
             <input
             type="text"
             className="border px-4 py-2 w-full h-[42px] mb-2"
             placeholder="Search for github username..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             />

             { dropdown &&
                 <ul className="list-none absolute top-[42px] left-0 right-0 overflow-y-scroll max-h-[200px] shadow-md bg-white">
                 { isLoading && <p className="text-center">Loading...</p> }
                 { users?.map(user => (
                     <li
                         key={user.id}
                         onClick={() => clickHandler(user.login)}
                         className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                     >
                         {user.login}
                     </li>
                 ))
                 }
             </ul>
             }

             <div className="container">
                 { areReposLoading && <p className="text-center">Loading...</p> }
                 { repos?.map(repo => <RepoCard key={repo.id} repo={repo} /> )}
             </div>
         </div>
     </div>
    )
}

