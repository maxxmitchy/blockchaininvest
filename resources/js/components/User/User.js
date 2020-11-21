import React, { useState, useEffect } from "react";
import "./users.css";
import { FaTimes } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import AddWallet from "./partials/AddWallet";
import Withdraw from "./partials/Withdraw";
import Deposit from "./partials/Deposit";
import Dashboard from "./partials/Dashboard";
import Profile from "./Profile";
import Activities from "./partials/Activities";
import useComponent from "../customHooks/useComponent";

const User = ({ user, transactions, allTransactions }) => {
    const [modal, setModal] = useState({
        open: false,
        component: "",
        form: ""
    });

    const handleWithdraw = () => {
        setModal({
            ...modal,
            open: true,
            component: <Withdraw />,
            form: "pt-3 info info_plus"
        });
    };

    let component = useComponent([
        <Deposit />,
        <Dashboard user={user} withdraw={handleWithdraw} />,
        <Profile />
    ]);

    let currentAmount = allTransactions
        ?.filter(i => i.status === "complete")
        .reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.amount;
        }, 0);

    useEffect(() => {
        modal.open
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "scroll");
    }, [modal]);

    return (
        <React.Fragment>
            {/**modal */}
            {modal.open && (
                <div className="info_modal">
                    <div className={`bg-white py-3 ${modal.form}`}>
                        <FaTimes
                            className="text-white mt-2 fa-times"
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: false,
                                    component: "",
                                    form: ""
                                })
                            }
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
                        style={{ minHeight: "103vh" }}
                    >
                        <br />
                        <b className="text-uppercase font-weight-bolder">
                            current balance
                        </b>
                        <h1>
                            <b>{currentAmount} usd</b>
                        </h1>
                        <h6 className="text-success">
                            <b>0 BTC</b>
                        </h6>
                        <button
                            onClick={handleWithdraw}
                            style={{ cursor: "pointer" }}
                            className="btn light__primary__bg mb-3"
                        >
                            Withdraw Funds
                        </button>

                        <br />
                        <div className="">
                            <div className="">
                                {[
                                    {
                                        id: 1,
                                        address: user?.btc,
                                        roi: user?.roiBTC,
                                        symbol: "BITCOIN"
                                    },
                                    {
                                        id: 2,
                                        address: user?.eth,
                                        roi: user?.roiETH,
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
                                                                    i.symbol ===
                                                                    "BITCOIN"
                                                                        ? "Bitcoin"
                                                                        : "Ethereum"
                                                                }
                                                                currentValue={
                                                                    i.address
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
                            recent activities
                        </b>
                        <div className="mt-3 text-secondary">
                            {transactions ? (
                                <Activities transactions={transactions} />
                            ) : (
                                "Fund your wallet and start getting huge returns on investment. Our traders are top notch experts and all risks are covered for a minimal cost."
                            )}
                        </div>
                    </div>

                    <div className="col-md-8 py-md-3 px-md-5">
                        {component.component}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default User;
