import React, { useRef, useState, useEffect } from "react";
import { FaAngleDown, FaInfoCircle, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

const Deposit = () => {
    const getWallets = async () => {
        const data = await axios.get("api/wallets");
        return data;
    };

    const { data } = useQuery("wallets", getWallets);

    const [deposit, setDeposit] = useState({
        open: false,
        currency: "",
        address: "",
        Image: "",
        amount: ""
    });

    const [modal, setModal] = useState({ open: false, info: "" });

    useEffect(() => {
        setDeposit({
            ...deposit,
            currency: data?.data[0].name,
            Image: data?.data[0].image,
            address: data?.data[0].value
        });
    }, [data]);

    const handleChange = e => {
        let value = e.target.value;
        setDeposit({
            ...deposit,
            [e.target.name]: value
        });
    };

    return (
        <React.Fragment>
            {modal.open && (
                <div className="info_modal">
                    <div className={`bg-white px-2 py-3 info`}>
                        <FaTimes
                            className="text-white mt-2"
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: false,
                                    info: ""
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
                        <div className="">
                            <h5 className="text-center font-weight-bolder">
                                Transaction Preview
                            </h5>
                            <p className="text-secondary text-center">
                                {modal.info}
                            </p>
                            <hr />
                            <p
                                className="text-center text-secondary mx-2"
                                style={{ wordWrap: "break-word" }}
                            >
                                {deposit.address}
                            </p>
                            <hr />
                            <p className="text-secondary text-center">
                                ${deposit.amount}
                            </p>
                            <hr />
                            <div className="d-flex justify-content-center align-items-center">
                                <button className="btn btn-success py-0">
                                    Process Deposit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <h3 className="text-center my-4 mb-md-5 font-weight-bolder">
                Make Deposit
            </h3>

            <div className="row">
                <div className="col-md-6">
                    {deposit.errors && (
                        <p className="text-danger">{deposit.errors}</p>
                    )}
                    <div
                        onClick={() => {
                            setDeposit({ ...deposit, open: !deposit.open });
                        }}
                        className="d-flex justify-content-between border-bottom"
                    >
                        <div className="d-flex">
                            <img
                                src={`${deposit.Image}`}
                                className="img-fluid mr-2"
                                style={{
                                    width: "30px",
                                    height: "20px"
                                }}
                                alt=""
                            />
                            <b>{deposit.currency}</b>
                        </div>
                        <FaAngleDown />
                    </div>
                    {deposit.open && (
                        <div className="border rounded mt-2 d-flex flex-column px-1 py-3 ">
                            {data?.data.map(i => {
                                return (
                                    <div
                                        onClick={() => {
                                            setDeposit({
                                                ...deposit,
                                                open: !deposit.open,
                                                currency: i.name,
                                                Image: i.image
                                            });
                                        }}
                                        className="d-flex my-2 currency_select py-2 rounded"
                                        key={i.id}
                                    >
                                        <img
                                            src={`${i.image}`}
                                            className="img-fluid mr-2"
                                            style={{
                                                width: "30px",
                                                height: "20px"
                                            }}
                                            alt=""
                                        />
                                        <b>{i.name}</b>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <input
                        className={`mt-3 w-100 `}
                        style={{
                            outline: "none",
                            border: "1px solid white",
                            borderBottom: "1px solid lightgrey"
                        }}
                        type="number"
                        name="amount"
                        onChange={handleChange}
                        value={deposit.amount}
                        placeholder="please enter deposit amount e.g., 1000"
                    />
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            className="img-fluid mt-3  shadow rounded p-2 bg-white mb-3"
                            src="img/scan.png"
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            id="myBut"
                            onClick={() => {
                                deposit.amount
                                    ? setModal({
                                          ...modal,
                                          open: true,
                                          info: `Send ${deposit.currency} (BTC) to the wallet address below. The correct amount should be sent to avoid interruption in the pool.`
                                      })
                                    : setDeposit({
                                          ...deposit,
                                          errors:
                                              "deposit amount cannot be empty."
                                      });
                            }}
                            className="btn-block deposit_button text-white"
                        >
                            Process Request
                        </button>
                    </div>
                </div>
                <div className="col-md-6 mt-5 mt-md-1">
                    <div className="d-flex text-danger ml-md-4">
                        <FaInfoCircle className="mr-1 mt-1" />
                        <h5>Important !!!</h5>
                    </div>
                    <ul>
                        <li>
                            Send only {deposit.currency} to this deposit
                            address. Sending other coins may result in the loss
                            of your crypto asset.
                        </li>
                        <li>
                            Deposit wallet address can change. Make sure to
                            double check deposit address before depositing.
                        </li>
                        <li>
                            Carefully go through the final confirmation process
                            of deposit to ensure no errors were made and loss of
                            your crypto assets can be avoided.
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Deposit;
