import React from 'react';

const FilterButton = ({ status, handleClickFilter }) => {
  return (
    <button className='text-black  p-2 md:px-14 lg:px-20 lg:py-5 rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500' onClick={() => handleClickFilter(status)}>{status}</button>
  );
};

export default FilterButton;
