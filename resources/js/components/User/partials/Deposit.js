import React, { useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Deposit = () => {
    const [condition, setCondition] = useState("Copy and process request");

    let inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.select();
        condition !== "Address copied" && myInp.select();
        document.execCommand("Copy");
        setCondition("Address Copied");
    };

    const handleChange = e => {};

    return (
        <React.Fragment>
            <h3 className="text-center mt-md-4 mb-md-5 font-weight-bolder">
                Make Deposit
            </h3>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img className="img-fluid mt-3" src="img/scan.png" />
                    </div>
                    <input
                        type="text"
                        value="1P5mw1q4RNNWxEx1a8MfbcUvXMydxva35H"
                        className="bg-white w-100 my-2"
                        style={{ border: "none", outline: "none" }}
                        onChange={handleChange}
                        id="myInp"
                        ref={inputRef}
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
                </div>
                <div className="col-md-6 mt-5 mt-md-1">
                    <div className="d-flex text-danger ml-md-4">
                        <FaInfoCircle className="mr-1 mt-1" />
                        <h4>Important !!!</h4>
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
