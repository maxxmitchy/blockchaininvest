import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SelectInput from "../../Auth/common/SelectInput";

const Deposit = () => {
    const [condition, setCondition] = useState("Copy and process request");

    const handleClick = () => {
        condition !== "copied" && myInp.select();
        document.execCommand("Copy");
        setCondition("Address Copied");
    };

    const handleChange = e => {};

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between mt-4 mt-md-1 show">
                <NavLink to="/dashboard">
                    <BsArrowLeft className="h5" />
                </NavLink>
                <h5>Deposit</h5>
                <h4 className="text-white">.</h4>
            </div>
            <br />
            <h3 className="hide mb-md-3 text-uppercase">Make Quick Deposit</h3>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <SelectInput
                            name="currency"
                            label=""
                            defaultOption="BITCOIN"
                            options={[{ id: 1, name: "BITCOIN" }].map(item => ({
                                value: item.name,
                                text: item.name
                            }))}
                            onChange={handleChange}
                        />
                    </form>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img className="img-fluid mt-3" src="img/scan.png" />
                    </div>
                    <input
                        type="text"
                        value="1P5mw1q4RNNWxEx1a8MfbcUvXMydxva35H"
                        className="bg-white form-control text-center my-2"
                        style={{ border: "none", outline: "none" }}
                        disabled={true}
                        onChange={handleChange}
                        id="myInp"
                    />
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            id="myBut"
                            onClick={handleClick}
                            className="btn-block deposit_button text-white"
                        >
                            {condition}
                        </button>
                    </div>
                    <br />
                    Invest today and become eligible for withdrawal in 15days.
                    You get 9% of your investment as profit everyday.
                </div>
                <div className="col-md-4 offset-md-1 mt-4 mt-md-1">
                    <div className="d-flex text-danger ml-md-4">
                        <FaInfoCircle className="mr-1 mt-1" />
                        <p>Important !!!</p>
                    </div>
                    <ul>
                        <li>
                            Send only BTC to this deposit address. Sending other
                            coins may result in the loss of your crypto asset.
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
