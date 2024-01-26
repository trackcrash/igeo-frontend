import axios, { AxiosInstance } from "axios";

const springAxiosInst: AxiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://localhost:8080",
  timeout: 2500,
});

export function isAxiosError(error: any): error is import("axios").AxiosError {
  return error.isAxiosError === true;
}

export default springAxiosInst;
