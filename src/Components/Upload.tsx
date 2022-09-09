import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import * as Api from "../Services/Api";
import pic from "../img/1.jpg";

const Upload = (props: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
 

  const handleDropFiles = async (files: FileList) => {
    const file = files[0];
    setFileName(file?.name);
    const formData = new FormData();
    formData.append("image", file);

    const [err, res] = await Api.getImageUrl(formData);
    if (err) {
      console.log(err);
    }
    setFileUrl(res?.data?.url);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  useEffect(() => {
    const init = () => {
      props.getImgUrl(fileUrl);
    };
    init();
  }, [fileUrl]);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleInputFileRefClick}
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
    </>
  );
};

export default Upload;
