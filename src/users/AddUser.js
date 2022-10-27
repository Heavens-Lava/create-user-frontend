import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddUser = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({ name: "", username: "", email: "" });
  // put each user object value into these values
  const { name, username, email } = user;

  //   updates user variable when user enters values into inputbox
  const onInputChange = (e) => {
    // set user while keeping old user values using '...user' property
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(e.target.name);
    // console.log(e.target.value);
    console.log(user);
  };

  const onSubmit = async (e) => {
    // prevents changing the url
    e.preventDefault();

    // use post method to submit
    await axios.post("https://springboot-create-user.herokuapp.com/user", user);
    // await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        {/* add form properties */}
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow ">
          {/* add form title */}
          <h2 className="text-center m-4">Register User</h2>

          {/* add form elements */}
          {/* pass the event */}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              {/* add name label */}
              <label htmlFor="name" className="form-label">
                Name
              </label>
              {/* add name input box */}
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                //   everytime a value is entered into input box, the variable 'user' will be updated
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              {/* add Username label */}
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              {/* add username input box */}
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              {/* add label */}
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              {/* add email input box */}
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button
              // when submit is pushed, form will update user
              type="submit"
              className="btn btn-outline-primary justify-content-center"
            >
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
