import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";

function Signup(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          alert("Signup Successful!!!!");
          // Store the auth token if needed
          localStorage.setItem("authtoken", result.data.authtoken);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <h2 className="card-title text-center">Register</h2>
                <div className="card-body py-md-4">
                  <form _lpchecked="1" onSubmit={handleSubmit} id="main-form">
                    <div className="form-group">
                      <label>Enter the Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Enter the Email Id </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Enter the Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="submit-btn">
                      <button className="btn btn-primary">
                        Create Account
                      </button>
                    </div>
                    <div className="nav-to-login">
                      <h4>
                        Already have account?
                        <Link className="login-link" to="/login">
                          Login
                        </Link>
                      </h4>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
