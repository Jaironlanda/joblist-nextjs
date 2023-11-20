import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function SearchJob() {
  const searchQuery = useRef(null)
  const [isSearchEmpty, setSearchEmpty] = useState(true)
  const router = useRouter()

  const handleSearchQuery = async (event) => {
    event.preventDefault()
    setSearchEmpty(false)
    router.push(`?search=${searchQuery.current.value}`)
  }

  const handleClearQuery = async (event) => {
    event.preventDefault()
    setSearchEmpty(true)
    searchQuery.current.value = ''
    router.push(`?`)
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <a className="btn btn-ghost normal-case text-xl">Job List- JSONsilo.com Template</a>
      </div>
      <form className="flex items-center justify-center py-36">
        <div className="form-control">
          <div className="join">
            <input type="text" placeholder="Search…" className="input input-bordered join-item w-96" ref={searchQuery}/>
            
            <button className={`btn join-item ${isSearchEmpty ? 'hidden' : ''}`} type="submit" onClick={handleClearQuery}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button className="btn join-item rounded-r-full" type="submit" onClick={handleSearchQuery}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button> 
          </div>
        </div>
      </form>
    </>
  );
}