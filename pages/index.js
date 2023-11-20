import Bar from "./components/bar"
import Footer from "./components/footer"
import ListJob from "./components/listjob"
import SearchJob from "./components/searchjob"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function Home() {
  const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState(false)
  const [rawData, setRawData] = useState()
  
  // data empty result
  let data = []
  // Get search value from searchParams
  // example: ?search=software%20engineer
  const q = searchParams.get('search')

  const handleJobList = async () => {
    // Fetching data from JSONsilo
    setLoading(true)
    axios.get(process.env.NEXT_PUBLIC_API_SILO_URL).then((res)=> {
      setRawData(res.data)
      setLoading(false)
    }).catch((err)=> {
      alert(err);
      setLoading(false)
    })
  }

  // Filter search data
  if (rawData && rawData.length !== 0 && q !== null) {
    data = rawData.filter(job => {
      return job.title.toLowerCase().includes(q.toLowerCase())
    })
  } else {
    data = rawData;
  }

  useEffect(() => {
    handleJobList()
  },[]);

  return (
    <>
      <SearchJob />
      <Bar q={q} total={data && data.length}/>
      <div className="h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ): data && data.length > 0 ? (
        <ListJob data={data}/>
      ):(
        <div className="flex items-center justify-center py-10">
          <p>No data available</p>
        </div>
      )}
      </div>
      <Footer />
    </>
  )
}