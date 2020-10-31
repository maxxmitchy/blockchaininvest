import React from "react";
import { NavLink } from "react-router-dom";
import "../Homepage.css";

const Stats = () => {
    const stats = [
        {
            id: 1,
            img: "Safety_and_Security_of_Funds.svg",
            fig: "320K+",
            desc: "Total Number of Secured Payouts"
        },
        {
            id: 4,
            img: "bitcoin.svg",
            desc: "Our Investment channels include Bitcoin, Ethereum, Litecoin, and Bitcoin Cash"
        },
        {
            id: 2,
            img: "Regular_Contest_Promotions.svg",
            fig: "173K+",
            desc: "Happy Clients with Promotional Referrals"
        },
        {
            id: 3,
            img: "Wide_Range_of_Trading_Instrument.svg",
            fig: "3.5%",
            desc: "Get ROI's across a wide range of investments."
        }
    ];
    return (
        <div className="row mt-5 py-5">
            <div className="col-md-6 mt-md-5 pt-md-3">
                <h1
                    className="lead text-secondary"
                    style={{ fontSize: "2rem" }}
                >
                    Some Facts of Our
                </h1>
                <h1>Achievements Number</h1>
                <p className="mt-2 font-weight-bolder lead text-secondary">
                    We do not borrow your deposits for a future interest.
                    Instead, we invest your cryptocurrency for you with
                    minimized risk. That’s why your earnings at
                    BlockChainFinancial can go higher than at any other
                    cryptoservice platforms. Thus, depending on your range of investment and
                    the amount invested, you are eligible for withdrawal at
                    anytime with a sure 15% daily increase in original amount deposited.
                </p>
                <br />
                <NavLink
                    to=""
                    className="mr-3 btn font-weight-bolder hero__btn h2 text-white"
                >
                    Started Earning Here
                </NavLink>
            </div>
            <div className="col-md-6">
                <div className="row">
                    {stats.map(stat => {
                        return (
                            <div className="col-md-6 pt-3 " key={stat.id}>
                                <div className="pl-3 bg-light">
                                    <br />
                                    <img
                                        className="img-fluid"
                                        style={{
                                            width: "50px",
                                            height: "50px"
                                        }}
                                        src={`img/${stat.img}`}
                                        alt=""
                                    />
                                    <h4 className="mt-2">{stat.fig}</h4>
                                    <p className="font-weight-bolder">
                                        {stat.desc}
                                    </p>
                                    <br />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Stats;
