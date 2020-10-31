import React, { useState, useEffect, useRef } from "react";
import "./users.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import AddWallet from "./partials/AddWallet";
import Withdraw from "./partials/Withdraw";
import Deposit from "./partials/Deposit";
import DashboardComponent from "./partials/DashboardComponent";
import { Invest } from "./partials/Invest";
import FixedEarning from "./partials/FixedEarning";

const Dashboard = ({ user, transactions }) => {
    console.log(transactions);
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
                        className={`col-md-3 light__primary__bg py-3 py-md-3 px-md-4 ${component.hide}`}
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
                        <b className="text-uppercase font-weight-bolder">
                            Your Wallets
                        </b>
                        <br />
                        <br />

                        <div className="-flex justify-content-beteen">
                            <div className="btc-grid">
                                <div
                                    style={{ background: "orange" }}
                                    className="rounded pt-2 text-white d-flex flex-column justify-content-center align-tems-center"
                                >
                                    <p className="text-center">BITCOIN</p>
                                    <p className="font-weight-bolder text-center">
                                        {user.btc?.substr(0, 5) ?? "xxxxx"}...
                                    </p>
                                    <p className="mb-2 font-weight-bolder text-center">
                                        {user.roiBTC} btc
                                    </p>
                                </div>
                                <div
                                    style={{ background: "darkgrey" }}
                                    className="rounded pt-2 text-white d-flex flex-column justify-content-center align-tems-center"
                                >
                                    <p className="text-center">ETHEREUM</p>
                                    <p className="font-weight-bolder text-center">
                                        {user.eth?.substr(0, 5) ?? "xxxxx"}...
                                    </p>
                                    <p className="mb-2 font-weight-bolder text-center">
                                        {user.roiETH} eth
                                    </p>
                                </div>
                            </div>
                            <br />
                            <div
                                style={{
                                    cursor: "pointer",
                                    boxShadow: "0px 0px 10px #411485",
                                    width: "45px"
                                }}
                                onClick={() =>
                                    setModal({
                                        ...modal,
                                        open: true,
                                        component: <AddWallet />,
                                        form: "info"
                                    })
                                }
                                className="d-flex primary__bg text-white mt-2 rounded-circle p-3"
                            >
                                <FaPlus />
                            </div>
                        </div>
                        <br />
                        <br />
                        <b className="text-uppercase font-weight-bolder">
                            recent transactions
                        </b>
                        <div className="mt-3 text-secondary">
                            {transactions ? (
                                <div className="table-responsive mb-3">
                                    <table className="table border">
                                        <thead className="thead-dark py-0">
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Currency</th>
                                                <th scope="col">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map(transaction => {
                                                return (
                                                    <tr key={transaction.id}>
                                                        <td>
                                                            {transaction.id}
                                                        </td>
                                                        <td>
                                                            {transaction.amount}
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.address
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.currency
                                                            }
                                                        </td>
                                                        <td>
                                                            {transaction.type}
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

                    <div className="col-md-9 py-md-3 px-md-5">
                        {component.component}

                        {location.pathname !== "/product/fixed-earning" ? (
                            <>
                                <hr />
                                <Invest />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Dashboard;
