import Axios from "axios";
import React, { useEffect, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

const DashboardComponent = ({ user }) => {
    const Crypto = async () => {
        let data = await axios.get("api/endpointpct");
        return data;
    };

    const { data } = useQuery("cryptodata", Crypto, {
        refetchOnWindowFocus: false
    });

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6">
                    <h1 className="text-secondary mt-3">Overview</h1>
                    <p className="text-secondary">
                        Hi {`${user.first_name} ${user.last_name}`}, welcome
                        back to blockchainfinancial.
                    </p>
                </div>
                <div className="col-md-6 mb-3 mb-md-1">
                    <br />
                    <div className="d-flex">
                        <GrNotification className="mt-md-2 h1 rounded-circle p-2 shadow mr-3 mr-md-4" />
                        <div className="pt-md-3 pt-2">
                            <NavLink
                                to="deposit"
                                className="deposit_button text-white"
                            >
                                Make Deposit
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <br />
                    <h5 className="font-weight-bolder mb-3">
                        Marketcap (24HR CHANGE)
                    </h5>
                    <div className="table-responsive mb-3">
                        <table className="table">
                            <thead className="thead-light py-0">
                                <tr>
                                    <th scope="col">Currency</th>
                                    <th scope="col">Last Price</th>
                                    <th scope="col">Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.map(data => {
                                    return (
                                        <tr key={data.id}>
                                            <td className="d-flex">
                                                <img
                                                    src={data.logo_url}
                                                    alt=""
                                                    className="img-fluid mr-2"
                                                    style={{
                                                        width: "20px",
                                                        height: "20px"
                                                    }}
                                                />
                                                <div className="d-flex flex-column">
                                                    <b className="mr-3">
                                                        {data.currency === "BTC"
                                                            ? "Bitcoin"
                                                            : data.currency ===
                                                              "ETH"
                                                            ? "Ethereum"
                                                            : "Litecoin"}
                                                        [{data.currency}]
                                                    </b>
                                                    <b className="mr-3">
                                                        <small className="text-secondary">
                                                            Mkt Cap
                                                        </small>{" "}
                                                        &nbsp;
                                                        <small className="text-secondary mt-0 font-weight-bolder">
                                                            $
                                                            {data.market_cap.substr(
                                                                0,
                                                                data.currency ===
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
                                                    {Number(data.price).toFixed(
                                                        2
                                                    )}
                                                </b>
                                            </td>
                                            <td>
                                                <b
                                                    className={`
                                                        ${
                                                            Math.sign(
                                                                data["1d"]
                                                                    .price_change_pct
                                                            ) === 1
                                                                ? "text-success"
                                                                : "text-danger"
                                                        }
                                                    `}
                                                >
                                                    {Number(
                                                        data["1d"]
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
                <div className="col-md-5 mt-4">
                    <h5 className="font-weight-bolder text-capitalize">
                        Earn on blockchainfinancial
                    </h5>
                    <p className="text-secondary">
                        Our experts trade your crypto assets for a specified
                        period of time, while you earn in compound interest
                        daily.
                    </p>
                    <NavLink to="/product/fixed-earning">
                        <div
                            className="card bg-secondary text-white border-0 shadow p-3"
                            style={{ borderRadius: "10px" }}
                        >
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <img
                                        src="img/icon-btc.svg"
                                        className="img-fluid mr-2"
                                        style={{
                                            width: "30px",
                                            height: "20px"
                                        }}
                                        alt=""
                                    />
                                    <img
                                        src="img/icon-eth.svg"
                                        className="img-fluid"
                                        style={{
                                            width: "30px",
                                            height: "20px"
                                        }}
                                        alt=""
                                    />
                                </div>
                                <h6 className="rounded p-2 light__primary__bg">
                                    365 Days
                                </h6>
                            </div>
                            <h5 className="">
                                <b>FIXED ROI</b>
                            </h5>
                            <p className="text-white">
                                Choose your lock-up period on your own terms.
                            </p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashboardComponent;
