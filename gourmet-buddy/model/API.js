const API = {};

API.post = (endpoint, data) => fetchObject(endpoint, "POST", data);

const fetchObject = async (endpoint, method, data = null) => {
  let requestObject = { method: method }; //GET, POST, PUT, DELETE
  if (data)
    requestObject = {
      ...request,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

  try {
    const response = await fetch(endpoint, fetchObject);
    const result = await response.json();
    return response.status < 300 && response.status > 200
      ? { isSuccess: true, result }
      : { isSuccess: false, message: `${result.message}` };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default API;
