import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

function Home() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (id) => {
    axios
      .post("http://localhost:3001/updateuser", { id, name, email, password })
      .then((res) => {
        if (res.data.x === "Updated") {
          alert("updated Successfully");
          window.location.reload();
        } else {
          alert("update Unsuccessfull");
          window.location.reload();
        }
      });
  };

  const deleteUser = (id, name) => {
    console.log("Deleting");
    if (window.confirm(`Are you sure you to delete ${name}`)) {
      axios.post("http://localhost:3001/deleteuser", { id }).then((res) => {
        if (res.data.x === "Delete") {
          alert("deleted Successfully");
          window.location.reload();
        } else {
          alert("deleted Unsuccessfully");
          window.location.reload();
        }
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/fetch-detail", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((s) => {
        console.log(s, "userData");
        setData(s.data);
      });
  }, []);

  return (
    <>
      <div className="table-header">
        <h2>Welcome User, here is your customer data</h2>
        <div className="underline"></div>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((k) => (
              <tr key={k._id}>
                <td>{k._id}</td>
                <td>{k.name}</td>
                <td>{k.email}</td>
                <td>{k.password}</td>
                <td>
                  <button
                    onClick={() => deleteUser(k._id, k.name)}
                    className="del-btn"
                  >
                    Delete
                  </button>
                  <Popup
                    modal
                    trigger={<button className="up-btn">Update</button>}
                    contentClassName="centered-popup"
                  >
                    <div className="popup-inner-content">
                      <input
                        type="text"
                        placeholder={k.name}
                        onChange={(e) => setName(e.target.value)}
                        className="popup-input"
                      />
                      <input
                        type="text"
                        placeholder={k.email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="popup-input"
                      />
                      <input
                        type="password"
                        placeholder={k.password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="popup-input"
                      />
                      <button
                        onClick={() => handleSubmit(k._id)}
                        className=" popup-update-btn"
                      >
                        update
                      </button>
                    </div>
                  </Popup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Home;
