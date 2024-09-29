// src/utils/auth/apiRequest.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Replace with your API base URL

export const apiRequest = async ({
  method,
  url,
  data = null,
  params = null,
}) => {
  try {
    const response = await axios({
      method, // HTTP method ('GET', 'POST', 'PUT', 'DELETE')
      url: `${API_BASE_URL}${url}`, // API endpoint
      data, // Data for POST, PUT, PATCH
      params, // Query params for GET requests
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: error.message };
  }
};
