import React, { useState } from "react";
import TextInput from "../../Auth/common/TextInput";
import { useMutation, useQueryCache } from "react-query";

const AddWallet = ({ currency, currentValue }) => {
    const queryCache = useQueryCache();

    const [wallet, setWallet] = useState({
        name: currency,
        address: currentValue
    });

    const handleChange = e => {
        let value = e.target.value;
        setWallet({
            ...wallet,
            [e.target.name]: value
        });
    };

    const addWalletFunc = async data => {
        await axios.patch("/api/editUser", data);
    };

    const [mutate, someinfo] = useMutation(addWalletFunc, {
        onSuccess: () => {
            queryCache.invalidateQueries("login");
        }
    });

    const addWallet = async e => {
        e.preventDefault();
        try {
            await mutate(wallet);
        } catch (e) {}
    };

    return (
        <div className="container pt-2">
            <div className="mb-3">
                <h5>Update {wallet.name} Address</h5>
                <p className="text-secondary">
                    please cross-check to ensure you put in the correct details.
                </p>
            </div>
            <form>
                <TextInput
                    type="text"
                    id="address"
                    label="Enter Wallet Address"
                    name="address"
                    onChange={handleChange}
                    value={wallet.address}
                />
                <button
                    onClick={addWallet}
                    className="send__button btn-block text-white"
                >
                    {someinfo.isLoading ? "please wait..." : "Process Request"}
                </button>
            </form>
        </div>
    );
};

export default AddWallet;
