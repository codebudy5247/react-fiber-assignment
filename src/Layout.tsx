import React, { useRef, useState, useEffect } from "react";
import { Grid, Card, Box, Typography, Button, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Canvas from "./Components/Canvas";
import Image from "./Components/Image";
import Upload from "./Components/Upload";

const Layout = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgUploading, setImgUploading] = useState<boolean>(false);

  // Getting Image data url from Upload component.
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
        {/* Container */}
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
              {/* Upload Image */}
              <Upload
                getImgUrl={getImgUrl}
                setImgUploading={setImgUploading}
                setFileName={setFileName}
                imgUploading={imgUploading}
                fileName={fileName}
              />
              <Box
                sx={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  mt: 5,
                }}
              >
                {/* Preview Image */}
                {imgUploading ? (
                  <>
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  </>
                ) : (
                  <>
                    {imgUrl ? (
                      <Image imgUrl={imgUrl} />
                    ) : (
                      <>
                        <Typography variant="subtitle2">
                          No Preview Image available.
                        </Typography>
                      </>
                    )}
                  </>
                )}
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
              {/* Image Canvas */}
              <Canvas
                imgUrl={imgUrl}
                imgUploading={imgUploading}
                fileName={fileName}
              />
            </Grid>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default Layout;
