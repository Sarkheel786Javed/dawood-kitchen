// UpdateCategoryform.js
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";

function UpdateCategoryform({ handleSubmit, value, setValue }) {
  return (
    <div sx={{ paddingTop: "50px", width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontWeight: "700",
            color: "Teal",
          }}
        >
          Update Category
        </Typography>
        <Box>
          <TextField
            sx={{ py: 2 }}
            id="outlined-controlled"
            label="Category Name"
            fullWidth
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default UpdateCategoryform;
