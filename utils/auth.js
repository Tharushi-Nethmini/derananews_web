'use client'
export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);  
    } else {
      localStorage.removeItem("token");  
    }
  };
  
// utils/auth.js

export const getAuthToken = () => {
    if (typeof window !== "undefined") {
      // Only access localStorage on the client-side
      return localStorage.getItem("token");
    }
    return null;
  };
  
  export const isAuthenticated = () => {
    const token = getAuthToken();
    return token !== null;
  };
  
  export const logout = () => {
    setAuthToken(null);  
  };
  