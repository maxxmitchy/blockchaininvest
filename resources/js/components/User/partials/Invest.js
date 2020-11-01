import React from "react";
import { NavLink } from "react-router-dom";

export const Invest = () => {
    return (
        <div className="row">

            <div className="col-md-6 mt-5 mt-md-0">
                <h4 className="text-uppercase font-weight-bolder text-capitalize">
                    Invest in our preformed plans
                </h4>
                <p className="text-secondary">
                    Earn more ROI when you follow our well layed out plans and
                    enjoy additional benefits.
                </p>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <NavLink to="">
                            <div
                                className="card border-0 shadow"
                                style={{ borderRadius: "10px" }}
                            >
                                <div className="card-header bg-white pb-0">
                                    <h5 className="">
                                        <b>BCF QUAD</b>
                                    </h5>
                                    <p className="text-secondary">
                                        Our preformed plans are best suited for
                                        investors looking for long term returns
                                        and benefits.
                                    </p>
                                </div>
                                <div className="card-body py-0">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-column p-2 rounded">
                                            <h6 className="mb-0">ROI</h6>
                                            <b className="text-secondary">
                                                20% - 35%
                                            </b>
                                        </div>
                                        <div className="d-flex flex-column p-2 rounded">
                                            <h6 className="mb-0">Assets</h6>
                                            <b className="text-secondary">
                                                BTC/ETH
                                            </b>
                                        </div>
                                        <div className="d-flex flex-column p-2 rounded">
                                            <h6 className="mb-0">Period</h6>
                                            <b className="text-secondary">
                                                4 - 8 Months
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
