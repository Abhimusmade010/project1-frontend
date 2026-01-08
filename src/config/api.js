const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ REACT_APP_API_BASE_URL is not defined");
}

export default API_BASE_URL;
