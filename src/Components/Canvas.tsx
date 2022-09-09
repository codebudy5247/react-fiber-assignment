import { fabric } from "fabric";
import { Box } from "@mui/system";


const Canvas = (props: any) => {
  var canvas = new fabric.Canvas("c");
  canvas.setWidth(400);
  canvas.setHeight(400);
  fabric.Image.fromURL(props?.imgUrl, function (oImg) {
    oImg.set({
      width: canvas.width,
      height: canvas.height,
      originX: "left",
      originY: "top",
    });
    canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
    canvas.add(oImg);
  });

  if (!props?.imgUrl) {
    return <Box sx={{ display: "flex" }}>Select any image file.</Box>;
  }
  return (
    <>
      <div style={{ height: "60%", width: "60%" }}>
        <canvas id="c" style={{ border: "1px solid #D3D3D3" }} />
        <h6>{props?.imgUrl}</h6>
      </div>
    </>
  );
};

export default Canvas;
