import React, { useState } from 'react'
import FilterButton from './FilterButton.js'
export default function FilterButtonCard({ handleClickFilter }) {
  const [activeStatus, setActiveStatus] = useState('TODO')

  const handleButtonClick = (status) => {
    handleClickFilter(status)
    setActiveStatus(status)
  }
  return (
    <div className=" bg-gray-100  relative bottom-10 h-20  w-4/5 flex items-center justify-around rounded-full mx-auto">
      <FilterButton
        status="TODO"
        handleClickFilter={handleButtonClick}
        active={activeStatus === 'TODO'}
      />
      <FilterButton
        status="DOING"
        handleClickFilter={handleButtonClick}
        active={activeStatus === 'DOING'}
      />
      <FilterButton
        status="DONE"
        handleClickFilter={handleButtonClick}
        active={activeStatus === 'DONE'}
      />
    </div>
  )
}
