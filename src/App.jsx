import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Fragments/Navbar";
import Footer from "./components/Fragments/Footer";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Calculator from "./pages/Calculator";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/registration";
import { AuthProvider } from "./components/Fragments/AuthContext";
const App = () => {
  return (
    <div className="md:flex flex-col min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="calc-it" element={<Calculator />}></Route>
            <Route path="about-us" element={<AboutUs />} />
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
