import { useState, useEffect } from "react";

import API from "./API.js";

const useLoad = (loadEndpoint) => {
  //State
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Loader
  const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    setIsLoading(false);
    if (response.isSuccess) setRecords(response.result);
  };

  useEffect(() => {
    loadRecords(loadEndpoint);
  }, []);

  //Return
  return [records, isLoading, loadRecords];
};

export default useLoad;
