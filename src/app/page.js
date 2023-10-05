"use client";
import { useState} from "react";
import useEffectOnce from "../../hooks/use-effect-once"
import axios from 'axios';

import TodoListCard from "../components/TodoListCard.js"; 
import UserProfile from "../components/UserProfile.js";



export default function Home() {
  const [allTodo, setAllTodo] = useState([]);
  const [status, setStatus] = useState('TODO');
  const [task, setTask] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // New state variable to track total pages

  const params = {
    isAsc: true,
    sortBy: "createdAt",
    page: page,
  };

  const makeApiCall = async (status, params) => {
    try {
      const response = await axios.get(`/api/todolist?offset=${params.page}&limit=10&sortBy=${params.sortBy}&isAsc=${params.isAsc}&status=${status}`);
      const data = response.data;

      setTotalPages(data.totalPages); // Set total pages

      if (params.page >= data.totalPages - 1) {
        setHasMore(false); // No more pages to load
      }

      
      setTask((prevTask) => [...prevTask, ...data.tasks]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffectOnce(()=>{
     makeApiCall(status, params)
  })

  

  const loadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    if (nextPage >= totalPages) {
      setHasMore(false); // No more pages to load
    }

    makeApiCall(status, { ...params, page: nextPage });
  };
  
  console.log(task)
  return (
    <main className="flex bg-violet-400 min-h-screen flex-col items-center justify-between p-10">
       <div className="bg-white w-full"><UserProfile/>
      <TodoListCard task={task} loadMoreData={loadMoreData} hasMore={hasMore} /></div>
      
    </main>
  );
}
