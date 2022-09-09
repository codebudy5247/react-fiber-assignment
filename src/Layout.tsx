import React, { useState } from "react";
import Canvas from "./Components/Canvas";
import Upload from "./Components/Upload";
import { Grid, Card, Box} from "@mui/material";
import { ImgData } from "./data/_imgdata";
import Image from "./Components/Image";
const Layout = () => {
  const [imgUrl, setImgUrl] = useState("");
  console.log({imgUrl});
  
  const getImgUrl = (url: string) => {
    setImgUrl(url);
  };
  return (
    <Grid container alignItems="center" direction="column">
      <Card
        sx={{
          p: 2,
          mt: 5,
          boxShadow: 5,
          height: "80vh",
          width: "80%",
          border: "1px solid white",
          borderRadius: "1%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "35%",
              borderRight: "1px solid gray",
              height: "80vh",
            }}
          >
            <Grid
              container
              alignItems="center"
              direction="column"
              sx={{ minHeight: "100vh", mt: 5 }}
            >
              <Upload getImgUrl={getImgUrl} />
              <Box
                sx={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  mt: 5,
                }}
              >
                {ImgData.map((img: any) => (
                  <>
                    <Image ImgData={img} getImgUrl={getImgUrl}/>
                  </>
                ))}
              </Box>
            </Grid>
          </Box>
          <Box sx={{ width: "60%" }}>
            <Grid
              container
              alignItems="center"
              direction="column"
              sx={{ minHeight: "100vh", mt: 5 }}
            >
              <Canvas imgUrl={imgUrl} />
            </Grid>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default Layout;
