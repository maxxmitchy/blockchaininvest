import React, { useRef, useState, useEffect } from "react";
import "../Homepage.css";
import { NavLink } from "react-router-dom";

const Body = () => {
    const [range, setRange] = useState(15);

    const handleChange = e => {
        setRange(e.target.value);
    };

    return (
        <React.Fragment>
            <div className="row mt-5 pt-5">
                <br />
                <br />
                <div className="col-md-5">
                    <h1 className="primary__color">
                        Your Passport to the Future of Finance
                    </h1>
                    <p className="lead font-weight-bolder text-secondary">
                        The most trusted global cryptocurrency company. Trusted
                        by over 392,758 successful investors, we boast of
                        absolute transparency. All trading risks are covered for
                        a minimal amount for every successful trade carried out
                        on this platform.
                    </p>
                </div>
                <div className="col-md-5 offset-md-1">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <div className="pt-4 pt-md-2 px-md-4">
                            <h3 className="">Earning on BlockChainFinancial</h3>
                            <p className="font-weight-bolder text-secondary">
                                Invest for a period of time and earn good return
                                on investments (15 - 365 days)
                            </p>
                            <div className="range-slider">
                                <input
                                    name="range"
                                    className="range-slider__range"
                                    type="range"
                                    value={range}
                                    onChange={handleChange}
                                    min="15"
                                    max="365"
                                />
                                <span className="range-slider__value">{`${range}days`}</span>
                            </div>
                            <hr />
                            <div className="mb-5 d-flex justify-content-between">
                                <div className="d-flex">
                                    <img
                                        src="img/icon-btc.svg"
                                        alt=""
                                        className="img-fluid mb-2 mr-2"
                                    />
                                    <h5 className="font-weight-bolder mt-2">
                                        BTC
                                    </h5>
                                </div>
                                <div>
                                    <h5 className="font-weight-bolder mt-2">
                                        8.7%
                                    </h5>
                                </div>
                                <div className="d-flex">
                                    <h5 className="font-weight-bolder text-secondary mt-2 mr-2">
                                        $1K
                                    </h5>
                                    <img
                                        style={{
                                            width: "35px",
                                            height: "35px"
                                        }}
                                        src="img/earn.svg"
                                        className="img-fluid mr-2"
                                        alt=""
                                    />
                                    <h5 className="font-weight-bolder text-secondary mt-2">
                                        $11K
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5 pt-5">
                <div className="col-md-4">
                    <div className="card shadow border-0 text-left">
                        <div className="card-body">
                            <h4 className="card-title primary__color font-weight-bolder">
                                Invest
                            </h4>
                            <p className="card-text text-secondary">
                                Invest and transact bitcoin, ethereum, litecon
                                and bitcoin cash using the world's most trusted,
                                reliant and secure cryptocurrency wallet. Gain
                                as much as 8.7% return on investment on a 24hrs
                                basis.
                            </p>
                            <NavLink to="" className="font-weight-bolder">
                                Learn More
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 pt-5">
                <div className="col-md-8 offset-md-2 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="primary__color text-center">
                        Enter the Future of Finance
                    </h1>
                    <p className="text-secondary text-center">
                        Giving individuals and organizations the power of the
                        future in their hands. Join the revolution without
                        regrets.
                    </p>
                    <div className="d-flex">
                        <NavLink
                            to=""
                            className="text-white btn hero__btn mr-2"
                        >
                            Create Wallet
                        </NavLink>
                        <NavLink to="" className="text-white btn hero__btn">
                            Learn More
                        </NavLink>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Body;
