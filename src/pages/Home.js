import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  //   use useEffect tot ell the component needs to update after the render
  useEffect(() => {
    loadUsers();
    // runs once
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get(
        "https://springboot-create-user.herokuapp.com/users"
      );
      //   const result = await axios.get("http://localhost:8080/users");
      //   gets the data from the sql db
      //   console.log(result.data);

      //   set Users equal to the data from db table,
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   delete user when delete button is clicked
  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(
      `https://springboot-create-user.herokuapp.com/user/${id}`
    );
    // await axios.delete(`http://localhost:8080/user/${id}`);
    // after deleting, reload
    loadUsers();
  };

  return (
    <div className="container">
      {/* <Navbar /> */}
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
