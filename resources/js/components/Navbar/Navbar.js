import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import SideNav from "./SideNav";
import "./Nav.css";
import useUserData from "../customHooks/useUserData";

const Navbar = () => {
    const [openNav, setOpenNav] = useState("sidenav_transform");

    let fadeOut = "fadeOutLeft animate__animated";

    let fadeIn = "fadeInLeft animate__animated";

    let verification = useUserData(); //returns response from verifiesEmail.php

    const handleSidenav = () => {
        openNav !== fadeIn ? setOpenNav(fadeIn) : setOpenNav(fadeOut);
    };

    useEffect(() => {
        if (openNav === fadeOut) {
            setTimeout(() => {
                setOpenNav("sidenav_transform");
            }, 400);
            document.body.style.overflowY = "scroll";
        } else if (openNav === fadeIn) {
            document.body.style.overflowY = "hidden";
        }
    }, [openNav]);

    let noAuth = (
        <React.Fragment>
            <li>
                <NavLink to="/login" className="btn py-0 btn-outline-light">
                    Sign In
                </NavLink>
            </li>
            <li>
                <NavLink to="/register" className="btn py-0 btn-outline-light">
                    Start Earning
                </NavLink>
            </li>
        </React.Fragment>
    );

    let Auth = (
        <React.Fragment>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/user-profile">
                    <FaUser className="mb-1" /> Profile
                </NavLink>
            </li>
        </React.Fragment>
    );

    return (
        <header className="toolbar">
            <SideNav
                auth={verification}
                control={handleSidenav}
                open={openNav}
            />
            <nav className="toolbar_navigation container">
                <img
                    src="img/LOGO.svg"
                    className="img-fluid"
                    style={{ width: "160px", height: "40px" }}
                    alt=""
                />
                <div className="spacer"></div>
                <div className="toolbar_nav_items">
                    <ul>
                        <li>
                            <NavLink to="/" exact>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about-us">About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/how-it-works">How It Works</NavLink>
                        </li>
                        {verification?.verified ? Auth : noAuth}
                    </ul>
                </div>
                <React.Fragment>
                    {openNav !== fadeIn ? (
                        <FaBars
                            className="text-white hamburgerIcon icon p-2 h1"
                            onClick={() =>
                                openNav !== fadeIn
                                    ? setOpenNav(fadeIn)
                                    : setOpenNav(fadeOut)
                            }
                        />
                    ) : (
                        <FaTimes
                            className="text-white ml-auto hamburgerIcon icon p-2 h1"
                            onClick={() =>
                                openNav === fadeIn
                                    ? setOpenNav(fadeOut)
                                    : setOpenNav(fadeIn)
                            }
                        />
                    )}
                    {openNav === fadeIn ? (
                        <div
                            onClick={() =>
                                openNav !== fadeIn
                                    ? setOpenNav(fadeIn)
                                    : setOpenNav(fadeOut)
                            }
                            className="backdrop"
                        ></div>
                    ) : (
                        ""
                    )}
                </React.Fragment>
            </nav>
        </header>
    );
};

export default Navbar;
