import { useEffect, useState } from "react";
import NavButton from "../Elements/Navbutton";
import { Icon } from "@iconify/react";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleListClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8888/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };

  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8888")
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

  return (
    <div className="bg-white px-5 md:px-10 lg:px-20 py-16 md:py-7 item-center justify-between flex flex-col md:flex-row">
      <div className="flex justify-between">
        <img
          src="/images/fit-life-hub-high-resolution-logo-transparent.png"
          alt="fit-life-hub-logo"
          className="h-8"
        />
        <button onClick={handleListClick}>
          <Icon
            icon="ph:list"
            className="text-cyan-900 md:hidden"
            width={"30"}
            height={"30"}
          />
        </button>
      </div>
      <div
        className={`flex flex-col ${
          isOpen ? "" : "hidden md:flex"
        } md:flex-row md:space-x-10 pt-6 md:pt-0 font-medium text-lg md:text-lg`}
      >
        <NavButton to="/" label="Home" />
        <NavButton to="/articles" label="Articles" />
        <NavButton to="/calc-it" label="Calc It!" />
        <NavButton to="/about-us" label="About Us" />
        {auth ? (
          <>
            <p className="text-gray-400 py-4 md:py-0 border-b border-stone-400 md:border-0">
              Hello, {username}
            </p>
            <button
              className="text-gray-400 py-4 md:py-0 border-b border-stone-400 md:border-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <NavButton to="/login" label="Login" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
