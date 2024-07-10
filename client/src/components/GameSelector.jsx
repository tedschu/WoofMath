import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function GameSelector({
  setGameSelector,
  setGotRight,
  setGotWrong,
}) {
  const [alignment, setAlignment] = useState("addition");

  const handleChange = (event, newAlignment) => {
    if (newAlignment != null) {
      setAlignment(newAlignment);
      setGameSelector(newAlignment);
      setGotRight(false);
      setGotWrong(false);
    }
  };

  const buttonStyle = {
    fontFamily: "Schoolbell",
    textTransform: "none",
  };

  //console.log(alignment);

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
          required
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
