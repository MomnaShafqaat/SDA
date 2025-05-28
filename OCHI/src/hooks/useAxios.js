import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
        console.log("Fetching data with params:", params);
      const result = await axiosInstance.request(params);
      console.log("Response received:", result.data);
      setResponse(result.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []); 

  return { response, error, loading };
};

export default useAxios;
