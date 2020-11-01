import React, { useState, useEffect, useRef } from "react";
import "./users.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import AddWallet from "./partials/AddWallet";
import Withdraw from "./partials/Withdraw";
import Deposit from "./partials/Deposit";
import DashboardComponent from "./partials/DashboardComponent";
import FixedEarning from "./partials/FixedEarning";
import Profile from "./Profile";
import { Invest } from "./partials/Invest";

const Dashboard = ({ user, transactions }) => {
    const [modal, setModal] = useState({
        open: false,
        component: "",
        form: ""
    });

    const [component, setComponent] = useState({
        component: "",
        hide: "",
        change: false
    });

    useEffect(() => {
        switch (location.pathname) {
            case "/deposit":
                setComponent({
                    ...component,
                    component: <Deposit />,
                    hide: "hide"
                });
                break;
            case "/dashboard":
                setComponent({
                    ...component,
                    component: <DashboardComponent user={user} />,
                    hide: ""
                });
                break;
            case "/product/fixed-earning":
                setComponent({
                    ...component,
                    component: <FixedEarning />,
                    hide: ""
                });
                break;
            case "/user-profile":
                setComponent({
                    ...component,
                    component: <Profile />,
                    hide: ""
                });
                break;
        }
    }, [location.pathname]);

    useEffect(() => {
        if (modal.open) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    }, [modal]);

    return (
        <React.Fragment>
            {/**modal */}
            {modal.open && (
                <div className="info_modal">
                    <div className={`bg-white py-3 ${modal.form}`}>
                        <FaTimes
                            className="text-white mt-2"
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: false,
                                    component: "",
                                    form: ""
                                })
                            }
                            style={{
                                position: "absolute",
                                right: "-.6rem",
                                top: "-1.5rem",
                                fontSize: "1em",
                                cursor: "pointer"
                            }}
                        />
                        {modal.component}
                    </div>
                </div>
            )}
            {/**modal end*/}
            <div className="container mt-5">
                <div className="row">
                    <div
                        className={`col-md-4 light__primary__bg py-3 py-md-3 px-md-4 ${component.hide}`}
                        style={{ height: "140vh" }}
                    >
                        <br />
                        <b className="text-uppercase font-weight-bolder">
                            current balance
                        </b>
                        <h1>
                            <b>0.0000 USD</b>
                        </h1>
                        <h6 className="text-success">
                            <b>0 BTC</b>
                        </h6>
                        <button className="btn light__primary__bg mb-3">
                            Withdraw Funds
                        </button>
                        <br />
                        <div className="">
                            <div className="">
                                {[
                                    {
                                        id: 1,
                                        address: user.btc,
                                        roi: user.roiBTC,
                                        symbol: "BITCOIN"
                                    },
                                    {
                                        id: 2,
                                        address: user.eth,
                                        roi: user.roiETH,
                                        symbol: "ETHEREUM"
                                    }
                                ].map(i => {
                                    return (
                                        <div
                                            className="d-flex justify-content-between"
                                            key={i.id}
                                        >
                                            <div className="d-flex flex-column">
                                                <b className="font-weight-bold text-secondary mb-0">
                                                    {i.symbol}
                                                </b>
                                                <p className="font-weight-bolder text-secondary mb-0">
                                                    {i.address ? (
                                                        i.address
                                                    ) : (
                                                        <b>
                                                            please update wallet
                                                            address...
                                                        </b>
                                                    )}{" "}
                                                </p>
                                                <p className="font-weight-bolder text-secondary">
                                                    ${i.roi}
                                                </p>
                                            </div>
                                            <AiOutlineEdit
                                                onClick={() =>
                                                    setModal({
                                                        ...modal,
                                                        open: true,
                                                        component: (
                                                            <AddWallet
                                                                currency={
                                                                    user.symbol ===
                                                                    "BTC"
                                                                        ? "Bitcoin"
                                                                        : "Ethereum"
                                                                }
                                                                currentValue={
                                                                    user.address
                                                                }
                                                            />
                                                        ),
                                                        form: "info"
                                                    })
                                                }
                                                className="mt-3"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <b className="text-uppercase font-weight-bolder">
                            recent transactions
                        </b>
                        <div className="mt-3 text-secondary">
                            {transactions ? (
                                <div className="table-responsive mb-3">
                                    <table className="table border">
                                        <thead className="thead-light py-0">
                                            <tr>
                                                <th scope="col">Type</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Currency</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map(transaction => {
                                                return (
                                                    <tr key={transaction.id}>
                                                        <td>
                                                            <b
                                                                className={`${
                                                                    transaction.type ==
                                                                    "Deposit"
                                                                        ? "text-success"
                                                                        : "text-danger"
                                                                }`}
                                                            >
                                                                {
                                                                    transaction.type
                                                                }
                                                            </b>
                                                        </td>
                                                        <td>
                                                            <b>
                                                                $
                                                                {
                                                                    transaction.amount
                                                                }
                                                            </b>
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {
                                                                    transaction.currency
                                                                }
                                                            </b>
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {transaction.address.substr(
                                                                    0,
                                                                    6
                                                                )}
                                                                ...
                                                            </b>
                                                        </td>
                                                        <td>
                                                            <b
                                                                className={`${
                                                                    transaction.status ===
                                                                    "pending"
                                                                        ? "text-danger"
                                                                        : "text-success"
                                                                }`}
                                                            >
                                                                {
                                                                    transaction.status
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                "Fund your wallet and start getting huge returns on investment. Our traders are top notch experts and all risks are covered for a minimal cost."
                            )}
                        </div>
                        <button
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: true,
                                    component: <Withdraw />,
                                    form: "pt-3 info info_plus"
                                })
                            }
                            style={{ cursor: "pointer" }}
                            className="btn btn-outline-secondary mt-3"
                        >
                            Start Earning
                        </button>
                    </div>

                    <div className="col-md-8 py-md-3 px-md-5">
                        {component.component}
                        <hr />
                        <Invest />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Dashboard;
