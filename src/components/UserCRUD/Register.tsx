import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { register } from "../../features/userLogin";
import { userRegister } from "../_helper/userCRUD";
import { LoadingComponent } from "../LoadingComponent";
interface User {
  username: string;
  email: string;
  password: string;
  confirmPass?: string;
}

const Register = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

    const user: User = {
      email: emailInput?.current?.value as string,
      username: usernameInput.current?.value as string,
      password: passwordInput.current?.value as string,
    };
    let token: string = "";

    if (error.length > 0) {
      return;
    }
    setLoading(true);
    let response = await userRegister(user).then((res) => res);

    if (response.status >= 200 && response.status < 300) {
      token = response.data.token;

      dispatch(register(token));
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      let error = response.data;
      setError(error["error-message"]);
    }
  };
  return (
    <>
      {loading && <LoadingComponent />}
      {!loading && (
        <div className="row row-form-content">
          <div className="wrapper">
            <div className="main-content">
              <section className="credential-form">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-element">
                    <p>Email: </p>
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i>
                      <input
                        ref={emailInput}
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                    </label>
                  </div>
                  <div className="form-element">
                    <p>Username: </p>
                    <label htmlFor="username">
                      <i className="fas fa-user"></i>
                      <input
                        ref={usernameInput}
                        type="text"
                        required
                        id="username"
                        name="username"
                        placeholder="Username"
                      />
                    </label>
                  </div>
                  <div className="form-element">
                    <p>Password: </p>
                    <label htmlFor="password">
                      <i className="fas fa-lock"></i>
                      <input
                        ref={passwordInput}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                    </label>
                  </div>
                  <div className="form-element">
                    <p>Confirm Password: </p>
                    <label htmlFor="rePass">
                      <i className="fas fa-lock"></i>
                      <input
                        ref={confirmPassword}
                        type="password"
                        id="rePass"
                        name="rePass"
                        placeholder="Confirm Password"
                      />
                    </label>
                  </div>
                  <div className="form-element">
                    <p
                      className="error-area"
                      style={{
                        display: `${error.length > 0 ? "block" : "none"}`,
                      }}
                    >
                      {error}
                    </p>

                    <button type="submit">Register</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
