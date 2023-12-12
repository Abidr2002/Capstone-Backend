import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lakukan sesuatu dengan data formulir, seperti mengirim ke server
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <form onSubmit={handleSubmit} className="max-w-lg border-2 rounded-lg inline-block p-6">
        <h1 className="text-2xl mb-4 font-semibold">Login</h1>
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
        <div className="mb-4">
          <div className="flex items-center">
            <div className="border rounded-full p-1 mr-2 flex-shrink-0">
              <FontAwesomeIcon icon={faLock} className="mx-1" />
            </div>
            <input
              type="password"
              placeholder="Password"
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
            Login
          </button>
        </div>
        <p className="mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;