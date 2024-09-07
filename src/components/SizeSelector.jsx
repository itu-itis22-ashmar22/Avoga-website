import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onSizeSelect }) => {

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      onSizeSelect(null);
    } else {
      onSizeSelect(size);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Available Sizes:</h2>
      <div className="flex gap-2 mt-2">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`p-2 border rounded-lg cursor-pointer ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => handleSizeClick(size)}
            style={{ userSelect: 'none' }}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
