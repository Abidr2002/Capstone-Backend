/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://back-end-fitlife-hub.vercel.app/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setUsername(res.data.data);
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const login = async (userData) => {
    try {
      // Gantilah URL dan body request sesuai dengan API login yang Anda miliki
      const response = await axios.post(
        "https://back-end-fitlife-hub.vercel.app/login",
        userData
      );

      if (response.data.Status === "Success") {
        setUsername(response.data.data);
        setAuth(true);
      } else {
        // Handle kondisi lainnya, misalnya tampilkan pesan error atau log
        console.error("Login failed");
      }
    } catch (error) {
      // Handle kesalahan koneksi atau kesalahan lainnya
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        "https://back-end-fitlife-hub.vercel.app/logout"
      );

      if (response.data.Status === "Success") {
        setUsername("");
        setAuth(false);
      } else {
        // Handle kondisi lainnya, misalnya tampilkan pesan error atau log
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle kesalahan koneksi atau kesalahan lainnya
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
