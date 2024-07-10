import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 1,
    label: "Easier",
  },
  {
    value: 5,
    label: "Harder",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({
  setSliderValue,
  sliderValue,
  setGotRight,
  setGotWrong,
}) {
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setGotRight(false);
    setGotWrong(false);
  };

  //console.log(sliderValue);

  return (
    <div className="sliderContainer">
      <h3>How hard should the questions be?</h3>

      <Box sx={{ width: 300 }} className="sliderBox">
        <Slider
          aria-label="Custom marks"
          value={sliderValue}
          onChange={handleSliderChange}
          defaultValue={1}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={1}
          marks={marks}
          min={1}
          max={5}
          sx={{
            "& .MuiSlider-markLabel": {
              fontFamily: "Schoolbell",
            },
          }}
        />
      </Box>
    </div>
  );
}
