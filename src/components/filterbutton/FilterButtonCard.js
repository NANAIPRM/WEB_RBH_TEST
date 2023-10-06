import React from 'react'
import FilterButton from './FilterButton.js'
export default function FilterButtonCard({handleClickFilter}) {
  return (
    <div className=" bg-gray-100  relative bottom-10 h-20  w-4/5 flex items-center justify-around rounded-full mx-auto">
        
       <FilterButton status="TODO" handleClickFilter={handleClickFilter} />
      <FilterButton status="DOING" handleClickFilter={handleClickFilter} />
      <FilterButton status="DONE" handleClickFilter={handleClickFilter} />
   
      </div>
  )
}
