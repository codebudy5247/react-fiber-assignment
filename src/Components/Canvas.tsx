import { fabric } from "fabric";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";


const Canvas = (props: any) => {

  const [imgUrl, setImgUrl] = useState<string>(props?.imgUrl);
  
  useEffect(() => {
    setImgUrl(props?.imgUrl)
  }, [props?.imgUrl])
  
  
  useEffect(() => {
    var canvas = new fabric.Canvas("c");
  canvas.setWidth(400);
  canvas.setHeight(400);
  
    fabric.Image.fromURL(imgUrl, function (oImg) {
      oImg.set({
        width: canvas.width,
        height: canvas.height,
        originX: "left",
        originY: "top",
      });
      canvas.setOverlayImage(oImg, canvas.renderAll.bind(canvas));
      canvas.add(oImg);
    });
   
  }, [imgUrl])
  
  if (!props?.imgUrl) {
    return <Box sx={{ display: "flex" }}>Select any image file.</Box>;
  }
  return (
    <>
      <div style={{  }}>
        <canvas id="c" 
        style={{ border: "1px solid #D3D3D3" }} 
        />
        <h6>{props?.imgUrl}</h6>
      </div>
    </>
  );
};

export default Canvas;
