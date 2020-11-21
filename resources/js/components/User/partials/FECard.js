import React from "react";

const FECard = ({ action }) => {
    return (
        <div
            className="card bg-light border-0 shadow p-3"
            style={{ borderRadius: "10px" }}
        >
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <img
                        src="img/icon-btc.svg"
                        className="img-fluid mr-2"
                        style={{
                            width: "30px",
                            height: "20px"
                        }}
                        alt=""
                    />
                    <img
                        src="img/icon-eth.svg"
                        className="img-fluid"
                        style={{
                            width: "30px",
                            height: "20px"
                        }}
                        alt=""
                    />
                </div>
                <h6 className="rounded p-2 light__primary__bg">365 Days</h6>
            </div>
            <h5 className="">
                <b>FIXED ROI</b>
            </h5>
            <p className="text-dark">
                Choose your lock-up period on your own terms.
            </p>
            <a
            style={{cursor:"pointer"}}
                onClick={action}
                className="my-2 rounded text-center p-2 light__primary__bg"
            >
                Click Here
            </a>
        </div>
    );
};

export default FECard;
