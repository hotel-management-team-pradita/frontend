import { useNavigate } from "react-router-dom";
import { airbnbIcon } from "../../assets/icons";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.password === formValues.confirmPassword) {
      navigate("/login");
    } else {
      setErrorMessage("Passwords do not match");
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
          <p className="text-xl">
            To keep connected with us please login with your personal info
          </p>
          <button className="font-medium duration-300 bg-transparent border rounded-full mt-7 h-14 w-80 hover:bg-white hover:text-pink">
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        {/* Title */}
        <h1 className="text-5xl font-bold text-pink">Create Account</h1>
        {/* Form */}
        <form
          action=""
          className="flex flex-col items-center w-[368px] gap-4 mt-10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            id="fullname"
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          <select
            name="gender"
            id="gender"
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200 text-slate-900"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded bg-slate-200"
          />
          {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}

          {/* Sign up button */}
          <button
            type="submit"
            className="w-1/2 h-10 text-white duration-300 rounded-full bg-pink hover:opacity-80"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
