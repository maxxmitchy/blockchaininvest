import React,{useState,useEffect} from 'react'
import SelectInput from '../../Auth/common/SelectInput'
import TextInput from '../../Auth/common/TextInput'
import { useMutation, useQueryCache } from "react-query";

const AddWallet = () => {
    const [wallet, setWallet] = useState({
        name: "",
        address: ""
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

    const queryCache = useQueryCache();

    const [mutate, someinfo] = useMutation(addWalletFunc, {
        onSuccess: () => {
            // Query Invalidations
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
            <div className="row">
                <div className="col-md-12">
                    <h5 className="primary__color">
                        Add a wallet to start investing.
                    </h5>
                </div>
                <hr />
                <br />
                <div className="col-md-6 mb-2">
                    <SelectInput
                        name="name"
                        label="Investment Currencies"
                        defaultOption="Select Wallet"
                        options={[
                            { id: 1, name: "Bitcoin" },
                            { id: 2, name: "Ethereum" }
                        ].map(item => ({
                            value: item.name,
                            text: item.name
                        }))}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <TextInput
                        type="text"
                        id="address"
                        label="Wallet Address"
                        name="address"
                        onChange={handleChange}
                        value={wallet.address}
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <button
                        onClick={addWallet}
                        className="send__button btn-block text-white"
                    >
                        {someinfo.isLoading
                            ? "please wait..."
                            : "Process Request"}
                    </button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default AddWallet
