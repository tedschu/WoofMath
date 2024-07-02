import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function GameSelector({ setGameSelector }) {
  const [alignment, setAlignment] = React.useState("addition");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setGameSelector(newAlignment);
  };

  const buttonStyle = {
    fontFamily: "Schoolbell",
    textTransform: "none",
  };

  return (
    <>
      <div className="gameSelectContainer">
        <h3>What kind of math do you want to play?</h3>

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{
            "& .MuiToggleButton-root": buttonStyle,
          }}
        >
          <ToggleButton value="addition">Addition</ToggleButton>
          <ToggleButton value="subtraction">Subtraction</ToggleButton>
          <ToggleButton value="multiplication">Multiplication</ToggleButton>
          <ToggleButton value="division">Division</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </>
  );
}
