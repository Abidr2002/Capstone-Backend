import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/register", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("Error");
        }
      })
      .then((err) => console.log(err));

    if (formData.password.length <= 10) {
      alert("Password harus memiliki lebih dari 10 karakter");
      return;
    }
  };
  return (
    <div className="flex items-center justify-center mb-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg border-2 rounded-lg inline-block p-6"
      >
        <h1 className="text-2xl mb-4 font-semibold">Sign Up</h1>
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
        <div className="mb-4 flex items-center">
          <div className="border rounded-full p-1 mr-2 flex-shrink-0">
            <FontAwesomeIcon icon={faEnvelope} className="mx-1" />
          </div>

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="inputClass"
          />
        </div>
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
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="border rounded-full p-1 mr-2 flex-shrink-0">
              <FontAwesomeIcon icon={faLock} className="mx-1" />
            </div>
            <input
              type="password"
              placeholder="Confirmed Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="inputClass w-full"
            />
          </div>
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
}

export default Signup;
