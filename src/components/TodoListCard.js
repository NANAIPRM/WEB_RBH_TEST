import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const TodoListCard = ({ task, loadMoreData, hasMore }) => {
  // Function to group tasks by date
  const groupTasksByDate = (tasks) => {
    const groupedTasks = {};

    tasks.forEach((task) => {
      const date = new Date(task.createdAt).toDateString();
      if (!groupedTasks[date]) {
        groupedTasks[date] = [];
      }
      groupedTasks[date].push(task);
    });

    return groupedTasks;
  };

  const groupedTaskData = groupTasksByDate(task);

  return (
    <div>
      <InfiniteScroll
        dataLength={task.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
        endMessage={<h4 className="">Nothing more to show</h4>}
      >
        {Object.keys(groupedTaskData).map((date) => (
          <div key={date}>
            <h2 className="text-black">{date}</h2>
            {groupedTaskData[date].map((data, index) => (
              <div key={index}>
                <div className="back">
                  <strong>{data.id}</strong> {data.createdAt}
                </div>
                {data.completed}
              </div>
            ))}
          </div>
        ))}
      </InfiniteScroll>
      <style jsx>
        {`
          .back {
            padding: 40px;
            background-color: dodgerblue;
            color: black;
            margin: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default TodoListCard;
