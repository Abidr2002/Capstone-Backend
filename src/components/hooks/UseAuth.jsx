import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
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

  return { auth, username };
};
