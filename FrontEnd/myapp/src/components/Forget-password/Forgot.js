import { useState } from "react";

function Forgot(props) {
  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/forgot-password", {
      method: "POST",
      crossDomain: "true",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "userRegister");
      });
  };
  return (
    <div className="main-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Forgot Password </h2>
              <div className="card-body py-md-4">
                <form _lpchecked="1" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="submit-btn d-flex flex-row align-items-center justify-content-between">
                    <button className="btn btn-primary">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
