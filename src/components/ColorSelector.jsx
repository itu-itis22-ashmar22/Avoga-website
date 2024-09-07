import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ColorSelector = ({ productName, colors }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    // Update selectedColor based on the current path
    const pathParts = location.pathname.split('/');
    if (pathParts.length === 5 && pathParts[3] === 'color') {
      setSelectedColor(pathParts[4]);
    } else {
      setSelectedColor(null);
    }
  }, [location.pathname]);

  const handleColorClick = (colorName) => {
    if (selectedColor === colorName) {
      setSelectedColor(null);
      navigate(`/product/${productName}`);
    } else {
      setSelectedColor(colorName);
      navigate(`/product/${productName}/color/${colorName}`);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {Object.keys(colors).map((colorName) => (
        <div
          key={colorName}
          className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${selectedColor === colorName ? 'border-2 border-gray-500' : ''}`}
          onClick={() => handleColorClick(colorName)}
        >
          <div
            className="w-6 h-6 rounded-full border border-gray-300" // Add a border here
            style={{ backgroundColor: colors[colorName].hex }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
