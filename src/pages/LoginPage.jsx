
import "../css/LoginPage.css";
import { useEffect } from "react";
import {    saveToken,    saveRole} from "../utils/auth";

import {isLoggedIn} from "../utils/auth";

import {useState} from "react";

import {

useNavigate

} from "react-router-dom";

import {

login

} from "../services/authService";

function LoginPage() {

const navigate =
        useNavigate();

        useEffect(() => {

    if (

        isLoggedIn()

    ) {

        navigate(

            "/admin"

        );

    }

}, []);

const [username,
    setUsername] =
        useState("");

const [password,
    setPassword] =
        useState("");

const [error,
    setError] =
        useState("");

const handleLogin =
        () => {

    login({

        username,

        password

    })

            .then(response => {

                saveToken(

                    response.data.token

                );

                saveRole(

                    response.data.role

                );

                navigate(
                        "/admin"
                );

            })

            .catch(error => {

                console.error(
                        error
                );

                setError(
                        "Invalid credentials"
                );

            });

};

return (

        <div className="login-container">

            <h1>

                Login

            </h1>

            <input className="login-input"

                    type="text"

                    placeholder="Username"

                    value={username}

                    onChange={

                            e =>

                                    setUsername(

                                            e.target.value

                                    )

                    }

            />

            <br/>

            <br/>

           <input className="login-input"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={

                            e =>

                                    setPassword(

                                            e.target.value

                                    )

                    }

            />

            <br/>

            <br/>

            <button
                    className="login-button"

                    onClick={

                            handleLogin

                    }

            >

                Login

            </button>

            <p className="error-message">

                {error}

            </p>

        </div>

);

}

export default LoginPage;