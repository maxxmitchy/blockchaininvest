import React, { useState } from "react";
import SelectInput from "../../Auth/common/SelectInput";
import TextInput from "../../Auth/common/TextInput";

const Withdraw = () => {
    const [withdrawal, setWithdrawal] = useState({
        address: "",
        currency: "",
        amount: "",
        access: ""
    });

    const handleChange = e => {
        let value = e.target.value;
        setWallet({
            ...withdrawal,
            [e.target.name]: value
        });
    };
    return (
        <div className="container">
            <form>
            <h5 className="font-bolder mb-3 text-center primary__color">Process withdrawal</h5>
                <div className="row mt-2">
                    <div className="col-md-12 mb-2">
                        <SelectInput
                            name="address"
                            label="Withdrawal Address"
                            defaultOption="Select Wallet"
                            options={[
                                { id: 1, name: "23424wwbBBSGF7Taccxx" }
                            ].map(item => ({
                                value: item.name,
                                text: item.name
                            }))}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-12 mb-2">
                        <SelectInput
                            name="currency"
                            label="Currency"
                            defaultOption="Select Currency"
                            options={[{ id: 1, name: "Bitcoin" }].map(item => ({
                                value: item.name,
                                text: item.name
                            }))}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInput
                            type="number"
                            id="amount"
                            label="Amount"
                            name="amount"
                            onChange={handleChange}
                            value={withdrawal.amount}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInput
                            type="text"
                            id="access"
                            label="Access Token"
                            name="access"
                            onChange={handleChange}
                            value={withdrawal.access}
                        />
                    </div>
                    <div className="col-md-12">
                        <button className="send__button btn-block text-white">
                            Process withdrawal
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Withdraw;
