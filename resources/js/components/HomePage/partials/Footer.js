import React from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <React.Fragment>
            <div className="container text-center py-5 text-md-left">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <img
                            src="img/LOGO.svg"
                            className="img-fluid"
                            alt="blockchainfinancial"
                        />
                        <br />
                        <br />
                        <p className="text-secondary">
                            The BLOCKCHAINFINANCIAL platform is equipped with a
                            top-quality security infrastructure designed to
                            ensure maximum protection of assets at all times.
                        </p>
                    </div>

                    <hr className="clearfix w-100 d-md-none" />

                    <div className="col-md-2 mx-auto">
                        <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                            Company
                        </h5>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink className="text-secondary" to="/faq">
                                    FAQs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/login">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-secondary"
                                    to="/privacypolicy"
                                >
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-secondary"
                                    to="/aboutus"
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <a className="text-secondary" href="#!">
                                    Services
                                </a>
                            </li>
                        </ul>
                    </div>

                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-2 mx-auto">
                        <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                            Products
                        </h5>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    Wallet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    Markets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    BCF Support
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    Developers
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2 mx-auto">
                        <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                            Learn & info
                        </h5>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    What is Bitcoin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    What is Ethereum
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    Getting Started
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="text-secondary" to="/">
                                    Terms and Conditions
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul className="list-unstyled secondColor list-inline text-center py-2">
                <li className="list-inline-item">
                    <h5 className="mb-1 secondColor ">Register for free</h5>
                </li>
                <li className="list-inline-item">
                    <NavLink
                        to="/register"
                        style={{
                            background: "#411485",
                            borderRadius: "4px",
                            padding: ".2rem .5rem",
                            fontSize: "1rem",
                            color: "#fff",
                            boxShadow: "0px 0px 10px #411485"
                        }}
                    >
                        Create Account
                    </NavLink>
                </li>
            </ul>

            <div className="footer-copyright  text-center py-3">
                © 2020 Copyright &nbsp; &nbsp;
                <NavLink className="font-weight-bolder" to="/">
                    BLOCKCHAINFINANCIAL
                </NavLink>
            </div>
        </React.Fragment>
    );
};

export default Footer;
