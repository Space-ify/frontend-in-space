import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!query) return; // Exit if the query is empty

    try {
      const response = await axios.get(`YOUR_API_ENDPOINT?search=${query}`);
      console.log(response.data); // Log the response data or set it to state
      // Process your response data here
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error here
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        p: 2,
        bgcolor: "transparent",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSearch}
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
            color: isFocused ? "purple" : "purple",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ExitToAppIcon sx={{ fontSize: "2em" }} />{" "}
          {/* Adjust '2em' as needed */}
        </IconButton>``
      </Box>
    </Box>
  );
};

export default SearchComponent;
