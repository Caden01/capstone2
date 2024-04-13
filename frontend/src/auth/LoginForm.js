import React, { useState } from "react";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      console.log("success");
    } else {
      console.error("failure");
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <label>Username</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-floating mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary float-right"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
