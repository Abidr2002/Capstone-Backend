import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Reset error message for the current input
      general: "", // Reset general error message
    }));
  };

  const navigate = useNavigate();
  const validatePasswordLength = () => {
    if (formData.password.length <= 10) {
      setErrorMessage({
        ...errorMessage,
        password: "Password harus memiliki lebih dari 10 karakter",
      });
      return false;
    } else if (
      formData.password !== formData.confirmPassword &&
      formData.confirmPassword.length > 0
    ) {
      setErrorMessage({
        ...errorMessage,
        confirmPassword: "Password dan konfirmasi password tidak cocok",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage({
        ...errorMessage,
        general: "Lengkapi seluruh formulir untuk mendaftar.",
      });
      return;
    }

    if (!validatePasswordLength()) {
      return;
    }

    axios
      .post("http://localhost:8888/register", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          setErrorMessage({
            ...errorMessage,
            general: "Error registering user",
          });
        }
      })
      .catch((err) => {
        console.error(err);

        // Handle kesalahan dengan informasi lebih lanjut
        if (err.response && err.response.data) {
          const { Error } = err.response.data;
          if (Error === "Username and Email already registered") {
            setErrorMessage({
              ...errorMessage,
              username:
                "Username sudah terdaftar, silakan pilih username lain.",
              email: "Email sudah terdaftar, silakan gunakan email lain.",
            });
          } else if (Error === "Username already registered") {
            setErrorMessage({
              ...errorMessage,
              username:
                "Username sudah terdaftar, silakan pilih username lain.",
              email: "", // Reset email error
            });
          } else if (Error === "Email already registered") {
            setErrorMessage({
              ...errorMessage,
              email: "Email sudah terdaftar, silakan gunakan email lain.",
              username: "", // Reset username error
            });
          } else {
            setErrorMessage({
              ...errorMessage,
              general: "Terjadi kesalahan saat melakukan permintaan ke server",
            });
          }
        }
      });
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg border-2 rounded-lg inline-block p-6"
      >
        <h1 className="text-2xl mb-4 font-semibold">Sign Up</h1>
        {errorMessage.general && (
          <div className="mb-4 text-red-500">{errorMessage.general}</div>
        )}
        <div className="mb-4 flex items-center">
          <div className="border rounded-full p-1 mr-2 flex-shrink-0">
            <FontAwesomeIcon icon={faUser} className="mx-1" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="inputClass"
          />
        </div>
        {errorMessage.username && (
          <div className="text-red-500">{errorMessage.username}</div>
        )}
        <div className="mb-4 flex items-center">
          <div className="border rounded-full p-1 mr-2 flex-shrink-0">
            <FontAwesomeIcon icon={faEnvelope} className="mx-1" />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="inputClass"
          />
        </div>
        {errorMessage.email && (
          <div className="text-red-500">{errorMessage.email}</div>
        )}
        <div className="mb-4">
          <div className="flex items-center">
            <div className="border rounded-full p-1 mr-2 flex-shrink-0">
              <FontAwesomeIcon icon={faLock} className="mx-1" />
            </div>
            <input
              type="password"
              placeholder="Create Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="inputClass w-full"
            />
          </div>
          {errorMessage.password && (
            <div className="text-red-500">{errorMessage.password}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="border rounded-full p-1 mr-2 flex-shrink-0">
              <FontAwesomeIcon icon={faLock} className="mx-1" />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="inputClass w-full"
            />
          </div>
          {errorMessage.confirmPassword && (
            <div className="text-red-500">{errorMessage.confirmPassword}</div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
