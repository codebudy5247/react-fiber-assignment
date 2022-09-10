import { fabric } from "fabric";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Canvas = (props: any) => {
  useEffect(() => {
    var canvas = new fabric.Canvas("c", {
      hoverCursor: "pointer",
      selection: true,
    });
    canvas.setWidth(400);
    canvas.setHeight(400);
    fabric.Image.fromURL(props?.imgUrl, function (img: any) {
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
  }, [props?.imgUrl]);

  return (
    <>
      {props?.imgUploading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {props?.imgUrl ? (
            <>
              <div style={{}}>
                <canvas id="c" style={{ border: "1px solid #D3D3D3" }} />
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  {props?.fileName}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex" }}>
                <Typography variant="subtitle2">
                  Select any image file.
                </Typography>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Canvas;
