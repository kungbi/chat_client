import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useAxios = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (config: AxiosRequestConfig<any>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(config);
      setData(response.data);
      setLoading(false);
      return response;
    } catch (error) {
      // setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { data, loading, error, request };
};

export default useAxios;
