import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
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

    if (!formData.first_name) {
      formErrors.first_name = "First name is required.";
      isValid = false;
    }

    if (!formData.last_name) {
      formErrors.last_name = "Last name is required.";
      isValid = false;
    }

    if (!formData.age || formData.age <= 0) {
      formErrors.age = "Please enter a valid age.";
      isValid = false;
    }

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
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submitRegisterForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/login");
    }
  };

  return (
    <div className="w-75 mx-auto py-3">
      <h3 className="my-4 fw-bold text-info">Registration Form</h3>
      <form onSubmit={submitRegisterForm}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          className="form-control mb-2 my-input my-2"
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && <div className="text-danger">{errors.first_name}</div>}

        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          className="form-control mb-2 my-input my-2"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {errors.last_name && <div className="text-danger">{errors.last_name}</div>}

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          className="form-control mb-2 my-input my-2"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <div className="text-danger">{errors.age}</div>}

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
          Register
        </button>
      </form>
    </div>
  );
}