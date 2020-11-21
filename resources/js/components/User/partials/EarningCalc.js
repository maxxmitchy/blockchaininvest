import Axios from "axios";
import { round } from "lodash";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const EarningCalc = () => {
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

    return (
        <div className="p-1">
            <b className="h6" style={{ lineHeight: "2rem" }}>
                Invest{" "}
                <input
                    className={`py-0 mx-2 text-center text-secondary ${fixedEarn.feedback}`}
                    style={{
                        outline: "none",
                        width: "50px",
                        border: "1px solid white",
                        borderBottom: "1px solid grey"
                    }}
                    value={fixedEarn.amount}
                    type="number"
                    onChange={handleChange}
                    name="amount"
                />{" "}
                USD&nbsp;&nbsp;or&nbsp;&nbsp;
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
                        width: "50px",
                        border: "1px solid white",
                        borderBottom: "1px solid grey"
                    }}
                    value={fixedEarn.duration}
                    onChange={handleChange}
                    type="number"
                    name="duration"
                />{" "}
                days, and earn a total of{" "}
                <b className="primary__color">
                    {fixedEarn.estimatedTotal} USD&nbsp;&nbsp;or&nbsp;&nbsp;
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
                </b>{" "}. All transactions for a fee of $10.
            </b>
            <div className="d-flex py-3">
                <button
                    onClick={() =>
                        setFixedEarn({ ...fixedEarn, currency: "BTC" })
                    }
                    className={`btn mr-3 light__primary__bg mb-3 ${
                        fixedEarn.currency === "BTC" ? "activeBorder" : ""
                    }`}
                >
                    BITCOIN
                </button>
                <button
                    onClick={() =>
                        setFixedEarn({ ...fixedEarn, currency: "ETH" })
                    }
                    className={`btn light__primary__bg mb-3 ${
                        fixedEarn.currency === "ETH" ? "activeBorder" : ""
                    }`}
                >
                    Ethereum
                </button>
            </div>
        </div>
    );
};

export default EarningCalc;
