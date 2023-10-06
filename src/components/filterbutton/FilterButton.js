import React from 'react'

const FilterButton = ({ status, handleClickFilter, active }) => {
  return (
    <button
      className={`text-black p-2 md:px-14 lg:px-20 lg:py-5 rounded-full ${
        active ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-300' // You can replace 'bg-gray-300' with the default background color when not active
      }`}
      onClick={() => handleClickFilter(status)}
    >
      {status}
    </button>
  )
}

export default FilterButton
