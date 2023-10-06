'use client'
import { useState } from 'react'
import useEffectOnce from '../../hooks/use-effect-once'
import axios from 'axios'
import TodoListCard from '../components/todolist/TodoListCard.js'
import UserProfile from '../components/UserProfile.js'
import FilterButtonCard from '../components/filterbutton/FilterButtonCard.js'

export default function Home() {
  const [status, setStatus] = useState('TODO')

  const [task, setTask] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const params = {
    isAsc: true,
    sortBy: 'createdAt',
    page: page,
    status: status,
  }

  const makeApiCall = async (params) => {
    try {
      const { page, sortBy, isAsc, status } = params
      const response = await axios.get(`/api/todolist`, {
        params: {
          offset: page,
          limit: 10,
          sortBy,
          isAsc,
          status,
        },
      })
      const data = response.data
      setTotalPages(data.totalPages)
      setPage(params.page)
      setHasMore(params.page < data.totalPages - 1)

      if (params.page === 0) {
        setTask(data.tasks)
      } else {
        setTask((prevTask) => [...prevTask, ...data.tasks])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffectOnce(() => {
    makeApiCall(params)
  })

  const loadMoreData = () => {
    const nextPage = page + 1
    setPage(nextPage)

    if (nextPage >= totalPages) {
      setHasMore(false)
    }

    makeApiCall({ ...params, page: nextPage })
  }

  const handleClickFilter = (newStatus) => {
    setStatus(newStatus)
    setPage(0)
    setHasMore(true)
    const newParams = {
      isAsc: true,
      sortBy: 'createdAt',
      page: 0,
      status: newStatus,
    }
    makeApiCall(newParams)
  }

  return (
    <main className="flex bg-violet-400 min-h-screen flex-col   items-center justify-between p-10">
      <div className="bg-white w-full ">
        <UserProfile className="absolute" />
        <FilterButtonCard handleClickFilter={handleClickFilter} />
        <TodoListCard
          task={task}
          setTask={setTask}
          loadMoreData={loadMoreData}
          hasMore={hasMore}
        />
      </div>
    </main>
  )
}
