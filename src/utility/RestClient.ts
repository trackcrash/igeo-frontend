import axios, { AxiosInstance, AxiosResponse } from "axios";

export class RestClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      timeout: 2500,
    });
  }

  get<T>(url: string, config?: any) {
    return this.axiosInstance.get<T>(url, config);
  }

  async post<T, R>(url: string, data: R, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T, R>(url: string, data: R, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<void> {
    await this.axiosInstance.delete(url, config);
  }

  isAxiosError(error: any): error is import("axios").AxiosError {
    return error.isAxiosError === true;
  }
}
