import React from "react";
import { Box } from "@mui/material";

const Image = (props: any) => {
  

  return (
    <Box
      component="img"
      sx={{
        height:250,
        width: 250,
        mb: 3,
        mt: 1,
        ml: 1,
        mr: 1,
        cursor: "pointer",
      }}
      alt="image."
      src={props?.imgUrl}
      
    />
  );
};

export default Image;
