import React, { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../features/store";
import { login } from "../../features/userLogin";
import { userLogin } from "../_helper/userCRUD";
import { LoadingComponent } from "../LoadingComponent";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isLogged = useSelector((state: RootState) => state.user.userLogin);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);
  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (email.length < 4 || password.length < 4) {
      setError("Wrong Email or Password!");
      return;
    }
    const user = { email: email, password: password };

    let token: string = "";
    setLoading(true);
    let response = await userLogin(user).then((res) => res);

    if (response.status >= 200 && response.status < 300) {
      token = response.data.token;
      dispatch(login(token));
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      setError(response.data["error-message"]);
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
                <h2>Login</h2>

                <form onSubmit={handleForm}>
                  <div className="form-element">
                    <p>Email: </p>
                    <label htmlFor="email">
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        placeholder="email"
                      />
                    </label>
                  </div>
                  <div className="form-element">
                    <p>Password: </p>
                    <label htmlFor="password">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        placeholder="Password"
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
                    <button type="submit">Login</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
