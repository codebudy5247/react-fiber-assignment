import React from "react";
import { Box } from "@mui/material";

const Image = (props: any) => {
  const OnClickHandler = (url: string) => {
    props?.getImgUrl(url);
  };

  return (
    <Box
      component="img"
      sx={{
        height: 70,
        width: 70,
        mb: 3,
        mt: 1,
        ml: 1,
        mr: 1,
        cursor: "pointer",
      }}
      alt="image."
      src={props?.ImgData?.url}
      onClick={() => OnClickHandler(props?.ImgData?.url)}
    />
  );
};

export default Image;
