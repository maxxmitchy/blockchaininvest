import React from "react";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

const Activities = ({ transactions }) => {
    return (
        <>
            {transactions?.map(transaction => {
                return (
                    <React.Fragment key={transaction.id}>
                        <div className="d-flex">
                            {transaction.type === "Deposit" ? (
                                <div className="py-4  sentBg px-3 mr-2 justify-content-center align-items-center rounded">
                                    <FiArrowUpRight className="font-weight-bolder sentCol" />
                                </div>
                            ) : (
                                <div className="py-4 px-3 mr-2 justify-content-center receivedBg  align-items-center rounded">
                                    <FiArrowDownLeft className="font-weight-bolder receivedCol" />
                                </div>
                            )}

                            <div className="">
                                <b className="font-weight-bolder">
                                    {transaction.type === "Deposit"
                                        ? "Sent"
                                        : "Received"}{" "}
                                    BTC
                                </b>
                                <b className="d-flex">
                                    <b className="mr-2 text-success">
                                        {transaction.address.substr(0, 10)}
                                        ...
                                    </b>
                                    <b className="">
                                        {transaction.created_at.substr(0, 10)}
                                    </b>
                                </b>
                                <b
                                    className={`badge ${
                                        transaction.status === "pending"
                                            ? "pending"
                                            : "success"
                                    } `}
                                >
                                    pending confirmation
                                </b>
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default Activities;
