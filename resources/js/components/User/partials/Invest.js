import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

export const Invest = () => {
    const Plans = async () => {
        let data = await axios.get("api/plans");
        return data;
    };

    const { data } = useQuery("plans", Plans, {
        refetchOnWindowFocus: false
    });

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6">
                        <h4 className="text-uppercase font-weight-bolder text-capitalize">
                            Invest in our preformed plans
                        </h4>
                        <p className="text-secondary">
                            Earn more ROI when you follow our well layed out
                            plans and enjoy additional benefits.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                {data?.data.map(i => {
                    return (
                        <div className="col-md-6 mb-3" key={i.id}>
                            <NavLink to="">
                                <div
                                    className="card border-0 shadow"
                                    style={{ borderRadius: "10px" }}
                                >
                                    <div className="card-header bg-white pb-0">
                                        <h5 className="">
                                            <b>{i.name}</b>
                                        </h5>
                                        <p className="text-secondary">
                                            Our preformed plans are best suited
                                            for investors looking for long term
                                            returns and benefits.
                                        </p>
                                    </div>
                                    <div className="card-body py-0">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-column p-2 rounded">
                                                <h6 className="mb-0">ROI</h6>
                                                <b className="text-secondary">
                                                    <small>{i.roi}</small>
                                                </b>
                                            </div>
                                            <div className="d-flex flex-column p-2 rounded">
                                                <h6 className="mb-0">Assets</h6>
                                                <b className="text-secondary">
                                                    <small>BTC/ETH</small>
                                                </b>
                                            </div>
                                            <div className="d-flex flex-column p-2 rounded">
                                                <h6 className="mb-0">Period</h6>
                                                <b className="text-secondary">
                                                    <small>
                                                        {i.duration} Months
                                                    </small>
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    );
                })}

            </div>
        </React.Fragment>
    );
};
