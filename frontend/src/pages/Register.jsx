import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Register = () => {
  
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration Successful! Please login.");
      navigate("/login");

    } catch (err) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach(e => {
          toast.error(e.message);
        });
      } else {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create Account ✨
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Register
        </button>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium ml-1 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
