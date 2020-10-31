import React, { useState, useRef } from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import "./Auth.css";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

const Register = () => {
    const [register, setRegister] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        referral_code: "",
        password: "",
        password_confirmation: ""
    });

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

    const userRegister = async () => {
        await axios.get("/sanctum/csrf-cookie").then(response => {
            return axios.post("/api/register", register);
        });
    };

    const { isSuccess, refetch } = useQuery("register", userRegister, {
        enabled: false,
        refetchOnWindowFocus: false
    });

    const handleChange = e => {
        let value = e.target.value;
        setRegister({
            ...register,
            [e.target.name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        refetch();
    };
    return (
        <form className="mx-md-3 mt-md-1" onSubmit={handleSubmit}>
            <h2 className="mb-3">Create Your Account</h2>
            <div className="row">
                <div className="col-md-6">
                    <TextInput
                        type="text"
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        onChange={handleChange}
                        value={register.first_name}
                        autoComplete="first_name"
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        type="text"
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        onChange={handleChange}
                        value={register.last_name}
                        autoComplete="last_name"
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        type="number"
                        id="phone"
                        label="Phone"
                        name="phone"
                        onChange={handleChange}
                        value={register.phone}
                        autoComplete="phone"
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        value={register.email}
                        autoComplete="email"
                    />
                </div>
                <div className="col-md-6">
                    <SelectInput
                        name="plan"
                        label="Investment Plan"
                        defaultOption="Select Investment Plan"
                        options={[].map(item => ({
                            value: item.id,
                            text: item.name
                        }))}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        type="text"
                        id="referral"
                        label="Referral Code"
                        name="referral_code"
                        onChange={handleChange}
                        value={register.referral_code}
                        // autoComplete="email"
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
                        value={register.password}
                        // autoComplete="current-password"
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        type="password"
                        id="confirm_password"
                        label="Confirm Password"
                        name="password_confirmation"
                        onChange={handleChange}
                        value={register.password_confirmation}
                    />
                </div>
                <div className="col-md-12">
                    <button
                        style={{ borderRadius: "10px" }}
                        className="btn btn-block text-white auth__bg__dark"
                    >
                        Create Account
                    </button>
                </div>
                <div className="col-md-12 mt-md-4">
                    <NavLink to="/login" className="mt-3 font-weight-bolder">
                        Login Instead ?
                    </NavLink>
                    <br />
                    <br />
                </div>
            </div>
        </form>
    );
};

export default Register;
