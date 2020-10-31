import React from "react";
import Login from "./Login";
import Register from "./Register";
import "./Auth.css";
import { NavLink } from "react-router-dom";
``;

const Auth = () => {
    let component, header, body, quest, ans, link;

    switch (location.pathname) {
        case "/login":
            header = "Welcome Back.";
            component = <Login />;
            body = "Revolution in trading.";
            quest = "Don't have an account?";
            ans = "Create an account";
            link = "/register";
            break;
        case "/register":
            header = "Sign Up";
            quest = "Already have an account?";
            ans = "Sign in to proceed";
            link = "/login";
            body =
                "Register and have access to all the features provided by our platform. Get started in a few clicksand enjoy good returns on investment.";
            component = <Register />;
            break;
    }

    return (
        <div className="container auth__container">
            <div className="row rounded p-md-3 auth__bg mt-md-5 auth__content__container">
                <div className="side__auth__nav col-md-4 py-4 rounded bg-white d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-center flex-column">
                        <h2 className="auth__text__color">{header}</h2>
                        <p className="text-secondary ml-1">{body}</p>
                    </div>
                    <div className="p-3 rounded auth__bg">
                        <p>{quest}</p>
                        <NavLink to={`${link}`} className="font-weight-bolder">
                            {ans}
                        </NavLink>
                    </div>
                </div>
                <div className="col-md-8">{component}</div>
            </div>
        </div>
    );
};

export default Auth;
