import axios from "axios";

/**
 * Centralized Axios Instance
 * Reusable across the application
 */
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000, // prevents hanging requests
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor (Optional but Professional)
 * Useful for auth tokens later
 */
apiClient.interceptors.request.use(
  (config) => {
    // Example: Attach JWT token in future
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor (Very Important)
 * Centralized error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "Bad request. Please check input.";
          break;
        case 401:
          error.message = "Unauthorized access.";
          break;
        case 404:
          error.message = "Resource not found.";
          break;
        case 500:
          error.message = "Server error. Please try later.";
          break;
        default:
          error.message = "Something went wrong.";
      }
    } else {
      error.message = "Network error. Please check connection.";
    }

    return Promise.reject(error);
  }
);

/**
 * Member APIs
 */

export const getMembers = () => apiClient.get("/members");

export const addMember = (member) =>
  apiClient.post("/members", member);

export const deleteMember = (id) =>
  apiClient.delete(`/members/${id}`);

