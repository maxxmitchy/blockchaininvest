import React, { useState, useEffect } from "react";
import { FaAngleDown, FaInfoCircle, FaTimes } from "react-icons/fa";
import { useQuery, useMutation, useQueryCache } from "react-query";

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
        amount: "",
        range: 15,
        type: "Deposit",
        errors: ""
    });

    const [modal, setModal] = useState({ open: false, info: "" });

    const storeDeposit = async data => {
        await axios.post("/api/storedeposit", data);
    };

    const queryCache = useQueryCache();

    const [mutate, someinfo] = useMutation(storeDeposit, {
        onSuccess: () => {
            // Query Invalidations
            queryCache.invalidateQueries("login");
        }
    });

    const processTransact = async e => {
        e.preventDefault();
        try {
            await mutate(deposit);
        } catch (e) {}
    };

    useEffect(() => {
        setDeposit({
            ...deposit,
            currency: data?.data[0].name,
            Image: data?.data[0].image,
            address: data?.data[0].value
        });
    }, [data, !deposit.currency]);

    useEffect(() => {
        if (deposit.error !== "") {
            let timer = setTimeout(() => {
                setDeposit({
                    ...deposit,
                    errors: ""
                });
                timer;
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [deposit.errors]);

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
                            className="text-white mt-2 fa-times"
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: false,
                                    info: ""
                                })
                            }
                        />
                        <div className="">
                            {someinfo.status === "success" && (
                                <p className="text-success text-center">
                                    Deposit successful
                                </p>
                            )}
                            <h5 className="text-center font-weight-bolder">
                                Transaction Preview
                            </h5>
                            <p className="text-secondary text-center">
                                {modal.info}
                            </p>
                            <hr />
                            <h5
                                className="text-center font-weight-bolder mx-2"
                                style={{ wordWrap: "break-word" }}
                            >
                                {deposit.address}
                            </h5>
                            <hr />
                            <h5 className="font-weight-bolder text-center">
                                usd {deposit.amount}
                            </h5>
                            <hr />
                            <div className="d-flex justify-content-center align-items-center">
                                <button
                                    onClick={processTransact}
                                    className="btn primary__bg text-white "
                                >
                                    Process Deposit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <h3 className="text-center mt-4 font-weight-bolder">
                Make Deposit
            </h3>
            <p className="text-secondary mb-4 text-center mb-md-5">
                Invest in the cryptocurrency of your choice and start earening a
                daily return on investment depending on your invested amount.
                Please note that investment through this channel runs for a
                period of 15days minimum. You can withdraw your profit at any
                time. Withdrawal of your invested amount plus profit is after
                your specified period of investment.
            </p>

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
                                        className={`d-flex my-2 currency_select py-2 rounded ${
                                            deposit.currency === i.name
                                                ? "currency_sel"
                                                : ""
                                        }`}
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
                    <div className="range-slider mt-4">
                        <input
                            name="range"
                            className="range-slider__range"
                            type="range"
                            value={deposit.range}
                            onChange={handleChange}
                            min="15"
                            max="365"
                        />
                        <span className="range-slider__value">{`${deposit.range}days`}</span>
                    </div>
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
                                deposit.amount && deposit.amount >= 100
                                    ? setModal({
                                          ...modal,
                                          open: true,
                                          info: `Send ${deposit.currency} to the wallet address below. The correct amount should be sent to avoid interruption in the pool.`
                                      })
                                    : deposit.amount < 100
                                    ? setDeposit({
                                          ...deposit,
                                          errors:
                                              "deposit amount cannot be less than $100."
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
                    <div className="mb-3 bg-light p-2 rounded">
                        <h6 className="text-secondary">
                            For a more accurate return on investment, choose an
                            invesment period that best suits your income
                            schedule.
                        </h6>
                    </div>
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
