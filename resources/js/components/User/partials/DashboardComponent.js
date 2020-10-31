import Axios from "axios";
import React, { useEffect, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import SvgRep from "./SvgRep";

const DashboardComponent = ({ user }) => {
    const [pctdata, setPctdata] = useState([]);

    useEffect(() => {
        Axios.get("api/endpointpct").then(res => {
            setPctdata(res.data);
        });
    }, []);

    const handleChange = e => {};

    console.log(pctdata);

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
                <div className="col-md-8">
                    <br />
                    <h5 className="font-weight-bolder mb-3">
                        Marketcap (24HR CHANGE)
                    </h5>
                    <div className="table-responsive mb-3">
                        <table className="table border">
                            <thead className="thead-dark py-0">
                                <tr>
                                    <th scope="col">Currency</th>
                                    <th scope="col">Last Price</th>
                                    <th scope="col">Change</th>
                                    <th scope="col">Last 24hrs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pctdata?.map(data => {
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
                                                            )}{" "}
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
                                            <td><SvgRep/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-4">
                    <br />
                    <br />
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashboardComponent;
