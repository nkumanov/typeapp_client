import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { getBookmarks } from "../features/userLogin";
import DialogContent from "@mui/material/DialogContent";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { login } from "../features/userLogin";
import { AppDispatch } from "./store";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useHistory();
  const cookies = new Cookies();
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (cookies.get("userData") != undefined) {
      navigate.push("/");
    }
  }, []);


  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.length < 4 || password.length < 4) {
      setError("Wrong Username or Password!");
      return;
    }
    const user = { email: username, password: password };

    let token: { token: string } = {
      token: "",
    };

    let response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    console.log(data)
    if (response.status >= 200 && response.status < 300) {
      token = data.token;

      cookies.set("userData", token);
      dispatch(login(data.token));
      navigate.push("/");
      setOpen(false);
      dispatch(getBookmarks())
    } else {
      setError(data["error-message"]);
    }
  };

  return (
    <div>
      <Button
        variant="text"
        style={{ color: "black" }}
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div className="row row-form-content">
            <div className="wrapper">
              <div className="main-content">
                <section className="credential-form">
                  <h2>Login</h2>

                  <form onSubmit={handleForm}>
                    <div className="form-element">
                      <p>Username: </p>
                      <label htmlFor="username">
                        <i className="fas fa-user"></i>
                        <input

                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
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
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
