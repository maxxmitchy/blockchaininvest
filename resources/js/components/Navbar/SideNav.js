import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { GiTalk } from "react-icons/gi";
import { RiDashboardLine, RiGitRepositoryPrivateLine } from "react-icons/ri";
import { FaRegRegistered } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useMutation } from "react-query";

const SideNav = ({ control, open, auth }) => {
    const userLogout = async () => {
        await axios.get("/sanctum/csrf-cookie").then(response => {
            return axios.post("/api/logout").then(res => {
                localStorage.removeItem("token");
                location.href = "/login";
            });
        });
    };
    const [
        mutate,
        { isIdle, isLoading, isError, isSuccess, error }
    ] = useMutation(userLogout);

    return (
        <div
            className={"pt-2 pl-2 sidenav " + open}
            style={{ overflowY: "scroll" }}
        >
            <div className=" mt-1 border">
                <img
                    style={{ width: "160px", height: "40px" }}
                    src="img/LOGO.svg"
                    className="img-fluid"
                    alt=""
                />
            </div>
            <br />
            <div onClick={control} className="d-flex ml-3 my-3">
                <AiOutlineHome className="bg-white shadow p-2 h2 rounded-circle font-weight-bolder mr-4" />
                <NavLink to="/" className="text-dark mt-2 h6 thick-font">
                    Home
                </NavLink>
            </div>
            {auth?.verified && (
                <React.Fragment>
                    <div onClick={control} className="d-flex ml-3 my-3">
                        <RiDashboardLine className="bg-white p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <NavLink
                            to="/dashboard"
                            className="mt-2 text-dark h6 font-weight-bolder"
                        >
                            Dashboard
                        </NavLink>
                    </div>

                    <div onClick={control} className="d-flex ml-3 my-3">
                        <FiUser className="bg-white p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <NavLink
                            to="/profile"
                            className="mt-2 text-dark h6 font-weight-bolder"
                        >
                            Profile
                        </NavLink>
                    </div>
                </React.Fragment>
            )}

            <div onClick={control} className="d-flex ml-3 my-3">
                <BsQuestionCircle className="bg-white shadow p-2 h2 rounded-circle font-weight-bolder mr-4" />
                <NavLink
                    to="/about-us"
                    className="mt-2 thick-font text-dark h6"
                >
                    About Us
                </NavLink>
            </div>
            {!auth?.verified && (
                <React.Fragment>
                    <div onClick={control} className="d-flex ml-3 my-3">
                        <FiLogIn className="bg-white shadow p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <NavLink
                            to="/login"
                            className="mt-2 thick-font text-dark h6"
                        >
                            Login
                        </NavLink>
                    </div>
                    <div onClick={control} className="d-flex ml-3 my-3">
                        <FaRegRegistered className="bg-white shadow p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <NavLink
                            to="/register"
                            className="mt-2 thick-font text-dark h6"
                        >
                            Register
                        </NavLink>
                    </div>
                    <div onClick={control} className="d-flex ml-3 my-3">
                        <RiGitRepositoryPrivateLine className="bg-white shadow p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <NavLink
                            to="/privacypolicy"
                            className="mt-2 thick-font text-dark h6"
                        >
                            Privacy Policy
                        </NavLink>
                    </div>
                    <div onClick={control} className="d-flex ml-3 my-3">
                        <GiTalk className="bg-white shadow p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <NavLink
                            to="/givefeedback"
                            className="mt-2 thick-font text-dark h6 mr-2"
                        >
                            Give feedback
                        </NavLink>
                    </div>
                </React.Fragment>
            )}
            <br />
            {auth?.verified && (
                <React.Fragment>
                    <hr className="bg-white mx-2" />
                    <div className="d-flex ml-3 mt-3">
                        <AiOutlineLogout className="bg-white p-2 h2 rounded-circle font-weight-bolder mr-4" />
                        <h6
                            onClick={() => mutate()}
                            className="mt-2 text-dark h6 font-weight-bolder"
                        >
                            {isLoading || isSuccess ? "logging user out..." : "Logout"}
                        </h6>
                    </div>
                </React.Fragment>
            )}
            <br />
        </div>
    );
};

export default SideNav;
