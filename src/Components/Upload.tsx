import React, { useState, useEffect, useRef } from "react";
import { Button, Typography } from "@mui/material";
import * as Api from "../Services/Api";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircularProgress from "@mui/material/CircularProgress";

const Upload = (props: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleDropFiles = async (files: FileList) => {
    const file = files[0];
    props?.setFileName(file?.name);
    const formData = new FormData();
    formData.append("image", file);
    props?.setImgUploading(true);
    const [err, res] = await Api.getImageUrl(formData);
    if (err) {
      console.log(err);
    }
    if (res) {
      props.getImgUrl(res?.data?.url);
    }
    props?.setImgUploading(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleInputFileRefClick}
        sx={{ maxWidth: "auto" }}
        disabled={props?.imgUploading}
      >
        {props?.imgUploading ? (
          <>
            {" "}
            <CircularProgress />
          </>
        ) : (
          <>
            {props?.fileName ? (
              props?.fileName
            ) : (
              <>
                <FileUploadIcon /> <Typography>Upload Image</Typography>
              </>
            )}
          </>
        )}
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
