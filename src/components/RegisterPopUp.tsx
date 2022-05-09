import React, {useRef, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RegisterPopUp = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const usernameInput = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);
    const [error, setError] = useState([]);
    const navigate = useHistory();
    const cookies = new Cookies();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const abortCont = new AbortController();
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

        // if (!email.toLowerCase().trim().match(pattern)) {
        //     setError('Please enter valid email!');
        //     return;
        // }

        // if (username.length < 3) {
        //     if (error.indexOf('The username must be at least 3 characters long!') != -1) {

        //     } else {
        //         setError('The username must be at least 3 characters long!');
        //         return;
        //     }
        // }
        // if (password != confirmPass) {
        //     if (error.indexOf('Passwords do not match!') != -1) {

        //     } else {

        //         setError('Passwords do not match!');
        //         return;
        //     }

        // }

        const user = { email: emailInput.current?.value, username: usernameInput.current?.value, password: passwordInput.current?.value };
    
        let token: {token: string} = {
            token: ''
        };


        if (error.length > 0) {
            return;
        }
        let response = await fetch('http://localhost:5000/auth/register', {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-Type': "application/json" }
        });
        
        if (response.status >= 200 && response.status < 300) {

            token = await response.json();

            cookies.set('userData', token.token);
            navigate.push('/');
        } else {
            let error = await response.json();
            setError(error['error-message'])
        }




    }
    return (
        <div>
            <Button onClick={handleOpen} style={{color: 'black'}}>Get Started</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <section className="credential-form">
                        <h2>Register</h2>



                        <form onSubmit={handleSubmit}>

                            <div className="form-element">
                                <p>Email: </p>
                                <label htmlFor="email"><i className="fas fa-envelope"></i><input ref={emailInput} type="text" id="email" name="email"
                                    placeholder="Email" /></label>

                            </div>
                            <div className="form-element">
                                <p>Username: </p>
                                <label htmlFor="username"><i className="fas fa-user"></i><input ref={usernameInput} type="text" id="username" name="username"
                                    placeholder="Username" /></label>

                            </div>
                            <div className="form-element">
                                <p>Password: </p>
                                <label htmlFor="password"><i className="fas fa-lock"></i><input ref={passwordInput} type="password" id="password" name="password"
                                    placeholder="Password" /></label>

                            </div>
                            <div className="form-element">
                                <p>Confirm Password: </p>
                                <label htmlFor="rePass"><i className="fas fa-lock"></i><input ref={confirmPassword} type="password" id="rePass" name="rePass"
                                    placeholder="Confirm Password" /></label>

                            </div>
                            <div className="form-element">
                                <p className="error-area" style={{ 'display': `${error.length > 0 ? 'block' : 'none'}` }}>{error}</p>

                                <button type="submit">Register</button>
                            </div>
                        </form>
                    </section>
                </Box>
            </Modal>
        </div>
    )
}

export default RegisterPopUp