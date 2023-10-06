import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import TodoListDetail from './TodoListDetail'
import CircularProgress from '@mui/material/CircularProgress'

export default function TodoListCard  ({ task, setTask, loadMoreData, hasMore }) {
  const groupTasksByDate = (tasks) => {
    const groupedTasks = {}

    tasks?.forEach((task) => {
      const date = new Date(task.createdAt).toDateString()
      if (!groupedTasks[date]) {
        groupedTasks[date] = []
      }
      groupedTasks[date].push(task)
    })

    return groupedTasks
  }

  const groupedTaskData = groupTasksByDate(task)

  const handleDelete = (taskId) => {
    const updatedTasks = task.filter((task) => task.id !== taskId)
    setTask(updatedTasks)
  }

  return (
    <div className=" cursor-pointer">
      <InfiniteScroll
        dataLength={task?.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <div className="w-full flex justify-center mb-40 mx-auto overflow-hidden">
            <CircularProgress />{' '}
          </div>
        }
        endMessage={
          <h4 className="text-black pb-20 px-20 ">
            <hr />
          </h4>
        }
      >
        <div className="px-4  lg:p-16  ">
          {Object.keys(groupedTaskData).map((date) => (
            <div key={date} className="mb-10 mx">
              <h2 className="text-lg lg:text-xl text-black">{date}</h2>
              {groupedTaskData[date].map((data, index) => (
                <div key={index}>
                  <TodoListDetail task={data} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

