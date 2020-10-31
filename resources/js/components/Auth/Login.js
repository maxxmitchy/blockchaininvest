import React, { useState, useRef, useEffect } from "react";
import TextInput from "./common/TextInput";
import { useQuery } from "react-query";
import { NavLink, Redirect } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
    let redirectTo = location.state && location.state.from.pathname;

    const userLogin = async () => {
        await axios.get("/sanctum/csrf-cookie").then(response => {
            return axios.post("/api/login", { ...login }).then(res => {
                localStorage.setItem(
                    "token",
                    res.config.headers["X-XSRF-TOKEN"]
                );
            });
        });
    };

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [enable, setEnable] = useState(false);

    const handleChange = e => {
        let value = e.target.value;
        setLogin({
            ...login,
            [e.target.name]: value
        });
    };

    const [status, setStatus] = useState(false);

    const inputRef = useRef(null);

    const handlePassword = () => {
        if (inputRef.current.type === "password") {
            inputRef.current.type = "text";
            setStatus(!status);
        } else {
            inputRef.current.type = "password";
            setStatus(!status);
        }
    };

    const isVerified = async () => {
        await axios.get("/api/email/verify");
    };

    const { isSuccess, error } = useQuery("login", userLogin, {
        enabled: enable,
        refetchOnWindowFocus: false
    });

    const info = useQuery("verify", isVerified, {
        enabled: isSuccess || localStorage.getItem("token"),
        retry: 2,
        retryDelay: 1000
    });

    const handleSubmit = e => {
        e.preventDefault();
        setEnable(!enable);
    };

    useEffect(() => {
        let clear = setTimeout(() => {
            setEnable(false);
        }, 3000);
        if (enable) clear;
        return () => {
            clearTimeout(clear);
        };
    }, [enable]);

    if (info.isSuccess && localStorage.getItem("token")) {
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
                    <button style={{borderRadius:"10px"}} className="btn btn-block text-white auth__bg__dark">
                        Login Account
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
