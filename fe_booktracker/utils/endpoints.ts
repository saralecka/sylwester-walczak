// Base URL for the API
export const API_BASE_URL = "http://localhost:8000/api"; // TODO: move to env

// JWT Token Endpoints
export const TOKEN_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/token/`, // POST: { username, password } -> { access, refresh }
  REFRESH: `${API_BASE_URL}/token/refresh/`, // POST: { refresh } -> { access }
};

// Book CRUD Endpoints
export const BOOK_ENDPOINTS = {
  LIST: `${API_BASE_URL}/books/`, // GET: List all books
  CREATE: `${API_BASE_URL}/books/`, // POST: Create a new book
  DETAIL: (id: number) => `${API_BASE_URL}/books/${id}/`, // GET: Get details of a specific book
  UPDATE: (id: number) => `${API_BASE_URL}/books/${id}/`, // PUT: Update a specific book
  DELETE: (id: number) => `${API_BASE_URL}/books/${id}/`, // DELETE: Delete a specific book
};
