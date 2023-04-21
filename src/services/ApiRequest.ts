import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetchParams {
  id: string;
}

const API_KEY = 'ea5533f125msh7381b88297d175fp1bdaf6jsn100496398d91';
const API_HOST = 'youtube-mp36.p.rapidapi.com';
const API_URL = 'https://youtube-mp36.p.rapidapi.com/dl';

const fetch = async ({ id }: FetchParams): Promise<AxiosResponse> => {
  const requestOptions: AxiosRequestConfig = {
    method: 'GET',
    url: API_URL,
    params: { id },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };
  const response = await axios.request(requestOptions);
  return response;
};

export { fetch };