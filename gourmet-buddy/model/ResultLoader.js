import { useEffect, useState } from "react";

import API from "./API";

const resultLoader = (endpoint) => {
  //State
  const [resultRecords, setResultRecords] = useState([]);
  const [areResultsLoading, setAreResultsLoading] = useState(true);

  //Loader
  const loadResultRecords = async (specifiedEndpoint) => {
    const response = await API.get(specifiedEndpoint);
    setAreResultsLoading(false);
    if (response.isSuccess) {
      setResultRecords(response.result);
    }
  };

  useEffect(() => {
    loadResultRecords(endpoint);
  }, []);

  //Return values
  return [resultRecords, areResultsLoading, loadResultRecords];
};

export default resultLoader;
