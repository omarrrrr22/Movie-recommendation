import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid.";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate successful login
      navigate("/home"); // Redirect to the home page after login
    }
  };

  return (
    <div className="w-75 mx-auto py-3">
      <h3 className="my-4 fw-bold text-info">Login Form</h3>
      <form onSubmit={submitLoginForm}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control mb-2 my-input my-2"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control mb-2 my-input my-2"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="text-danger">{errors.password}</div>}

        <button type="submit" className="btn btn-info">
          Login
        </button>
      </form>
    </div>
  );
}