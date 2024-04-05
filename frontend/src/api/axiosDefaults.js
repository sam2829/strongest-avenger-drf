import axios from "axios";

// Setting the base URL for all requests to the specified API
axios.defaults.baseURL = "/api";
// Setting the default headers for POST requests to specify the
// content type as multipart/form-data
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Allowing cross-origin requests to include credentials
// (cookies, HTTP authentication) for requests made by axios
axios.defaults.withCredentials = true;

// Creating separate instances of axios for requests and responses
// to customize them independently if needed
export const axiosReq = axios.create();
export const axiosRes = axios.create();