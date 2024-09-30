// src/SmileyButton.js
import React from 'react';
import './SmileyButton.css';

const SmileyButton = ({ onClick }) => {
  return (
    <button className="smiley-button" onClick={onClick}>
      😃
    </button>
  );
};

export default SmileyButton;
