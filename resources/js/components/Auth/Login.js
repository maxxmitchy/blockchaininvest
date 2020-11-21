import React, { useState, useRef } from "react";
import TextInput from "./common/TextInput";
import { useMutation } from "react-query";
import { NavLink, Redirect } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const Login = ({location}) => {
    let redirectTo = location?.state && location.state.from.pathname;

    const [status, setStatus] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const inputRef = useRef(null);

    const userLogin = async () => {
        await axios.get("/sanctum/csrf-cookie").then(() => {
            return axios.post("/api/login", { ...login }).then(res => {
                localStorage.setItem(
                    "token",
                    res.config.headers["X-XSRF-TOKEN"]
                );
            });
        });
    };

    const handleChange = e => {
        let value = e.target.value;
        setLogin({
            ...login,
            [e.target.name]: value
        });
    };

    const handlePassword = () => {
        if (inputRef.current.type === "password") {
            inputRef.current.type = "text";
            setStatus(!status);
        } else {
            inputRef.current.type = "password";
            setStatus(!status);
        }
    };

    const [
        mutate,
        { isIdle, isLoading, isError, isSuccess, error }
    ] = useMutation(userLogin);

    const handleSubmit = e => {
        e.preventDefault();
        mutate();
    };

    if (localStorage.getItem("token")) {
        return (
            <Redirect
                to={redirectTo !== undefined ? redirectTo : "/dashboard"}
            />
        );
    }

    return (
        <form className="mx-md-3 mt-md-1" onSubmit={handleSubmit}>
            <h2 className="mb-3">Sign In</h2>
            {error?.response.data.errors && (
                <div className="d-flex">
                    <MdErrorOutline className="mr-2 text-danger mt-1" />
                    <p className="text-danger errorCss ">
                        {error?.response.data.errors.email[0]}
                    </p>
                </div>
            )}
            <div className="row">
                <div className="col-md-6 ">
                    <TextInput
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        value={login.email}
                        autoComplete="email"
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        refs={inputRef}
                        type="password"
                        id="pass"
                        label="Password"
                        status={status}
                        name="password"
                        onChange={handleChange}
                        onClick={handlePassword}
                        value={login.password}
                        autoComplete="current-password"
                    />
                </div>
                <div className="col-md-12 px-3 d-flex justify-content-between">
                    <div className="form-check">
                        <input
                            className="form-check-input rounded-0"
                            type="checkbox"
                            name="remember"
                            id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                            <b>Remember me</b>
                        </label>
                    </div>
                    <NavLink to="">Forgot password?</NavLink>
                </div>
                <br />
                <br />
                <div className="col-md-12">
                    <button
                        disabled={isLoading}
                        style={{ borderRadius: "10px" }}
                        className="btn btn-block text-white auth__bg__dark"
                    >
                        {isLoading ? "please wait..." : "Login Account"}
                    </button>
                </div>
                <div className="col-md-12">
                    <p className="mt-4">
                        By signing up and login in, you agree to our &nbsp;
                        <a className="text-primary">Terms and Conditions</a>
                        &nbsp; &{" "}
                        <NavLink to="/privacypolicy"> Privacy Policy</NavLink>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default Login;
