import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const SearchComponent = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSearch({ query });
  };

  return (
    <Box
      style={{
        marginBottom: ".5em",
      }}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 75,
        right: 0,
        display: "flex",
        justifyContent: "center",
        p: 2,
        bgcolor: "transparent",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit} // Use the defined handleSubmit function here
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter Playlist"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            ".MuiInputBase-input": {
              color: "white",
            },
            ".MuiOutlinedInput-root": {
              backgroundColor: "transparent",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            ".MuiInputLabel-outlined": {
              color: "white",
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "white", // Ensure label color remains white when focused
            },
          }}
        />
        <IconButton
          className="submit"
          type="submit"
          sx={{
            color: "#1ED760",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ExitToAppIcon sx={{ fontSize: "2em" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchComponent;
