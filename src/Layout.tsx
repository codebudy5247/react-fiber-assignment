import React, { useRef, useState, useEffect } from "react";
import {
  Grid,
  Card,
  Box,
  imageListClasses,
  Typography,
  Button,
} from "@mui/material";
import { ImgData } from "./data/_imgdata";
import Image from "./Components/Image";
import * as Api from "./Services/Api";
import { fabric } from "fabric";
import CircularProgress from "@mui/material/CircularProgress";
const Layout = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [fileName, setFileName] = useState("");
  // Image Upload
  const [imgUploading, setImgUploading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleDropFiles = async (files: FileList) => {
    const file = files[0];
    setFileName(file?.name);
    const formData = new FormData();
    formData.append("image", file);
    setImgUploading(true);
    const [err, res] = await Api.getImageUrl(formData);
    if (err) {
      console.log(err);
    }
    if (res) {
      //update the image url state
      setImgUrl(res?.data?.url);
    }
    setImgUploading(false);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };
  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  //create canvas
  useEffect(() => {
    var canvas = new fabric.Canvas("c", {
      hoverCursor: "pointer",
      selection: true,
    });
    canvas.setWidth(400);
    canvas.setHeight(400);
    fabric.Image.fromURL(imgUrl, function (img: any) {
      img.scale(0.5).set({
        left: 150,
        top: 150,
        angle: 0,
        originX: "left",
        originY: "top",
      });
      // canvas.setOverlayImage(img, canvas.renderAll.bind(canvas));
      // canvas.add(img)
      canvas.centerObject(img).add(img).renderAll();
    });
  }, [imgUrl]);

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
              <Button
                variant="contained"
                color="success"
                onClick={handleInputFileRefClick}
                sx={{ maxWidth: "auto" }}
              >
                {fileName ? fileName : "Upload Image"}
              </Button>
              <input
                onChange={handleFileInput}
                type="file"
                id="file"
                ref={inputFileRef}
                style={{ display: "none" }}
              />
              <Box
                sx={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  mt: 5,
                }}
              >
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
                        <Typography>No Images.</Typography>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Grid>
          </Box>

          {/* Image Canvas */}

          <Box sx={{ width: "60%" }}>
            <Grid
              container
              alignItems="center"
              direction="column"
              sx={{ minHeight: "100vh", mt: 5 }}
            >
              {/* Image Canvas */}
              {imgUploading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {imgUrl ? (
                    <>
                      <div style={{}}>
                        <canvas
                          id="c"
                          style={{ border: "1px solid #D3D3D3" }}
                        />
                        <h6>{fileName}</h6>
                      </div>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: "flex" }}>Select any image file.</Box>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default Layout;
