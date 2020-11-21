import React, { useState } from "react";
import { GrNotification } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import FECard from "./FECard";
import EarningCalc from "./EarningCalc";

const Dashboard = ({ user, withdraw }) => {
    const Crypto = async () => {
        let data = await axios.get("api/endpointpct");
        return data;
    };

    const { data } = useQuery("crypto", Crypto);

    const [FEcomponent, setFEcomponent] = useState({
        component: (
            <FECard
                action={() => setFEcomponent({ component: <EarningCalc /> })}
            />
        )
    });

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6">
                    <h1 className="text-secondary mt-4">Overview</h1>
                    <p className="text-secondary">
                        Hi <b>{`${user.first_name} ${user.last_name}`}</b>,
                        welcome back to blockchainfinancial.
                    </p>
                </div>
                <div className="col-md-6 mb-3 mb-md-1">
                    <br />
                    <div className="d-flex">
                        <GrNotification className="mt-md-2 h1 rounded-circle p-2 shadow mr-3 mr-md-4" />
                        <div className="pt-md-3 pt-2">
                            <NavLink
                                to="deposit"
                                className="deposit_button text-white mr-3"
                            >
                                Deposit
                            </NavLink>
                        </div>
                        <div className="pt-md-3 pt-2">
                            <a
                                onClick={withdraw}
                                className="withdraw_button text-white"
                            >
                                Withdraw
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h5 className="font-weight-bolder">
                        Stop waiting, start earning.
                    </h5>
                    <p className="text-secondary">
                        Earn daily compounding interest on your crypto. Earn with unique
                        daily payouts. Add or withdraw funds at any time.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <br />
                    <h5 className="font-weight-bolder mb-3">
                        Marketcap (24HR CHANGE)
                    </h5>
                    <div className="table-responsive  mb-3">
                        <table className="table">
                            <thead className="thead-light py-0">
                                <tr>
                                    <th scope="col">Currency</th>
                                    <th scope="col">Last Price</th>
                                    <th scope="col">Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.map(i => {
                                    return (
                                        <tr key={i.id}>
                                            <td className="d-flex">
                                                <img
                                                    src={i.logo_url}
                                                    alt=""
                                                    className="img-fluid mr-2"
                                                    style={{
                                                        width: "20px",
                                                        height: "20px"
                                                    }}
                                                />
                                                <div className="d-flex flex-column">
                                                    <b className="mr-3">
                                                        {i.currency === "BTC"
                                                            ? "Bitcoin"
                                                            : i.currency ===
                                                              "ETH"
                                                            ? "Ethereum"
                                                            : "Litecoin"}
                                                        [{i.currency}]
                                                    </b>
                                                    <b className="mr-3">
                                                        <small className="text-secondary">
                                                            Mkt Cap
                                                        </small>{" "}
                                                        &nbsp;
                                                        <small className="text-secondary mt-0 font-weight-bolder">
                                                            $
                                                            {i.market_cap.substr(
                                                                0,
                                                                i.currency ===
                                                                    "BTC"
                                                                    ? 3
                                                                    : 2
                                                            )}
                                                            B
                                                        </small>
                                                    </b>
                                                </div>
                                            </td>
                                            <td>
                                                <b className="text-secondary">
                                                    $
                                                    {Number(i.price).toFixed(2)}
                                                </b>
                                            </td>
                                            <td>
                                                <b
                                                    className={`
                                                        ${
                                                            Math.sign(
                                                                i["1d"]
                                                                    .price_change_pct
                                                            ) === 1
                                                                ? "text-success"
                                                                : "text-danger"
                                                        }
                                                    `}
                                                >
                                                    {Number(
                                                        i["1d"]
                                                            .price_change_pct *
                                                            100
                                                    ).toFixed(2)}
                                                    %
                                                </b>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 my-4 mb-md-0">
                    <h5 className="font-weight-bolder text-capitalize">
                        Earn on blockchainfinancial
                    </h5>
                    <p className="text-secondary">
                        Our experts trade your crypto assets for a specified
                        period of time.
                    </p>
                    <React.Fragment>{FEcomponent.component}</React.Fragment>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
