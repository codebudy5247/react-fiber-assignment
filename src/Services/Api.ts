import * as axios from "axios";

const apiURL = "https://media-uploading-api.herokuapp.com";

interface ResponseData {
  data: any;
  status: any;
}

function normalizeServerResponse(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.data,
    status: serverResponse.status,
  };

  return response;
}

function normalizeServerError(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.message,
    status: serverResponse.status,
  };

  return response;
}

export async function getImageUrl(formData: any) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
