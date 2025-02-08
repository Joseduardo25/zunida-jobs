import React from 'react'

const CategoryButton = ({ id, name, isSelected, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
        isSelected
          ? 'bg-pink-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      onClick={() => onClick(id)}
    >
      {name}
    </button>
  );
};

export default CategoryButton
