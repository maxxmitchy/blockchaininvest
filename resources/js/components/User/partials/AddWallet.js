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
        setWallet({ name: "", address: "" });
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
        <div className="container pt-4">
            <form>
                <TextInput
                    type="text"
                    id="address"
                    label="Wallet Address"
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
