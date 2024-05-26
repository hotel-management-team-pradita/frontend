import { useNavigate } from "react-router-dom";
import { airbnbIcon } from "../../assets/icons";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5173/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/Auth`,
        {
          Email: formValues.email,
          Password: formValues.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex w-full h-dvh">
      {/* Left side */}
      <div className="relative w-1/2 h-full bg-pink">
        {/* Airbnb logo */}
        <img
          src={airbnbIcon}
          alt="airbnbIcon"
          className="absolute top-4 left-4 size-16"
        />
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white">
          <h1 className="font-bold text-7xl">Welcome Back!</h1>
          <p className="text-xl">Please sign up if you don't have an account</p>
          <button
            className="font-medium duration-300 bg-transparent border rounded-full mt-7 h-14 w-80 hover:bg-white hover:text-pink"
            onClick={() => navigate("/register")}
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        {/* Title */}
        <h1 className="text-5xl font-bold text-pink">LOG IN</h1>
        {/* Form */}
        <form
          className="flex flex-col items-center w-[368px] gap-4 mt-10"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}

          {/* Sign in button */}
          <button
            type="submit"
            className="w-1/2 h-10 text-white duration-300 rounded-full bg-pink hover:opacity-80"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
