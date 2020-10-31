import React from "react";
import "../Homepage.css";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

const Hero = () => {
    return (
        <React.Fragment>
            <div className="row my-md-5">
                <div className="col-md-6">
                    <p className="font-weight-bold lead">
                        <Loading />
                    </p>
                    <h1 className="hero__header__font">
                        EARN MORE CRYPTO FROM{" "}
                        <b className="hero__header">ACCRUED INVESTMENT.</b>
                    </h1>
                    <p className="font-weight-bold lead text-secondary">
                        Effortless and very stable. Allow our financial experts
                        do the hard work while you sit back and earn crypto
                        assets on a daily basis.
                    </p>
                    <div className="d-flex mt-4">
                        <NavLink
                            to=""
                            className="mr-3 btn font-weight-bolder h2 hero__btn text-white"
                        >
                            Get Started Here
                        </NavLink>
                        <NavLink
                            to=""
                            className="btn font-weight-bolder h2 hero__btn1 primary__color"
                        >
                            Current Stats
                        </NavLink>
                    </div>
                </div>
                <div className="col-md-6"></div>
            </div>
            <br />
            <br />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h6 className="text-secondary">Assets Protected by BitGo</h6>
                <img
                    src="img/bitgo-logo-grey.svg"
                    className="img-fluid"
                    alt=""
                />
            </div>
        </React.Fragment>
    );
};

export default Hero;
