import React, { useState } from 'react';

function ColorChooser({ availableColors, onColorChange }) {
  const [selectedColor, setSelectedColor] = useState('');

  const setColor = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div className='color-chooser'>
      {availableColors.map((color) => {
        return (
          <div
            className={
              selectedColor === color
                ? 'color-item color-item-selected'
                : 'color-item'
            }
            key={color}
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
          />
        );
      })}
    </div>
  );
}

export default ColorChooser;
