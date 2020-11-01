import Axios from "axios";
import { round } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryCache } from "react-query";
import SelectInput from "../../Auth/common/SelectInput";
import TextInput from "../../Auth/common/TextInput";

const FixedEarning = () => {
    const [fixedEarn, setFixedEarn] = useState({
        currency: "BTC",
        btcPrice: "",
        ethPrice: "",
        estimatedTotal: "235",
        amount: "100",
        duration: "15",
        feedback: "",
        roi: 0.09
    });

    const [transact, setTransact] = useState({
        currency: "",
        range: 15,
        amount: "",
        type:"Deposit",
        open:""
    });

    console.log(transact);

    const handleTransactChange = e => {
        let value = e.target.value;
        setTransact({
            ...transact,
            [e.target.name]: value
        });
    };

    const handleChange = e => {
        let value = e.target.value;
        setFixedEarn({
            ...fixedEarn,
            [e.target.name]: value
        });
    };

    const currencyData = async () => {
        const data = await Axios.get("/api/endpointpct");
        setFixedEarn({
            ...fixedEarn,
            btcPrice: Number(data.data[0].price).toFixed(2),
            ethPrice: Number(data.data[1].price).toFixed(2)
        });
        return data;
    };

    const currency = useQuery("verify", currencyData, {
        retry: 2,
        retryDelay: 1000
    });

    useEffect(() => {
        const estimate =
            Number(fixedEarn.amount) +
            Number(fixedEarn.roi * fixedEarn.amount * fixedEarn.duration);
        if (fixedEarn.amount > 99 && fixedEarn.duration > 14) {
            setFixedEarn({
                ...fixedEarn,
                estimatedTotal: round(estimate),
                feedback: ""
            });
        } else {
            setFixedEarn({
                ...fixedEarn,
                feedback: "invalid",
                estimatedTotal: 0
            });
        }
    }, [fixedEarn.amount, fixedEarn.duration]);

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
            await mutate(transact);
        } catch (e) {}
    };

    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="text-uppercase text-center">
                        <b>Earn on BCF</b>
                    </h2>
                    <h6 className="text-secondary text-center">
                        Our experts trade your crypto assets for a specified
                        period of time, while yoiu earn in compound interest
                        daily. Lock it up as long as you want, earn more.
                    </h6>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <b className="h4" style={{ lineHeight: "3rem" }}>
                        Invest{" "}
                        <input
                            className={`py-0 mx-2 text-center text-secondary ${fixedEarn.feedback}`}
                            style={{
                                outline: "none",
                                width: "60px",
                                border: "1px solid white",
                                borderBottom: "1px solid grey"
                            }}
                            value={fixedEarn.amount}
                            type="number"
                            onChange={handleChange}
                            name="amount"
                        />{" "}
                        USD&nbsp;/&nbsp;
                        {(
                            Number(fixedEarn.amount) /
                            Number(
                                fixedEarn.currency === "BTC"
                                    ? fixedEarn.btcPrice
                                    : fixedEarn.ethPrice
                            )
                        ).toFixed(4)}{" "}
                        {fixedEarn.currency} &nbsp;for{" "}
                        <input
                            className={`py-0 mx-2 text-center primary__color ${fixedEarn.feedback}`}
                            style={{
                                outline: "none",
                                width: "60px",
                                border: "1px solid white",
                                borderBottom: "1px solid grey"
                            }}
                            value={fixedEarn.duration}
                            onChange={handleChange}
                            type="number"
                            name="duration"
                        />{" "}
                        days, and earn an additional{" "}
                        <b className="primary__color">
                            {fixedEarn.estimatedTotal} USD&nbsp;/&nbsp;
                            {(
                                Number(fixedEarn.estimatedTotal) /
                                Number(
                                    fixedEarn.currency === "BTC"
                                        ? fixedEarn.btcPrice
                                        : fixedEarn.ethPrice
                                )
                            ).toFixed(4)}{" "}
                            {fixedEarn.currency}
                            &nbsp;
                        </b>{" "}
                        to your investment.
                    </b>
                    <div className="d-flex py-3">
                        <button
                            onClick={() =>
                                setFixedEarn({ ...fixedEarn, currency: "BTC" })
                            }
                            className="btn primary__bg text-white mr-3"
                        >
                            BITCOIN
                        </button>
                        <button
                            onClick={() =>
                                setFixedEarn({ ...fixedEarn, currency: "ETH" })
                            }
                            className="btn btn-outline-primary"
                        >Ethereum</button>
                    </div>
                </div>
                <div className="col-md-6 mt-3 mt-md-1">
                    <h5 className="mb-3">
                        <b>Start Investing Now.</b>
                    </h5>
                    <SelectInput
                        name="currency"
                        label="Investment Currencies"
                        defaultOption="Select Currency"
                        options={[
                            { id: 1, name: "Bitcoin" },
                            { id: 2, name: "Ethereum" }
                        ].map(item => ({
                            value: item.name,
                            text: item.name
                        }))}
                        onChange={handleTransactChange}
                    />
                    <TextInput
                        type="number"
                        id="amount"
                        label="Transaction Amount"
                        name="amount"
                        onChange={handleTransactChange}
                        value={transact.amount}
                    />
                    <p className="text-secondary">Investment Period</p>
                    <div className="range-slider">
                        <input
                            name="range"
                            className="range-slider__range"
                            type="range"
                            value={transact.range}
                            onChange={handleTransactChange}
                            min="15"
                            max="365"
                        />
                        <span className="range-slider__value">{`${transact.range}days`}</span>
                    </div>
                    <br />
                    <button
                        onClick={processTransact}
                        style={{ borderRadius: "10px" }}
                        className="text-white auth__bg__dark btn btn-block"
                    >
                        Complete Transactions
                    </button>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default FixedEarning;
