import React, { useState } from "react";
import TextInput from "../../Auth/common/TextInput";

const UpdatePassword = () => {
    const [update, setUpdate] = useState({
        old_password: "",
        new_password: "",
        confirm_pasword: ""
    });

    const handleChange = e => {};

    return (
        <div className="mt-md-3">
            <form>
                <h2 className="mt-2 mb-4">Udate Your Password</h2>
                <div className="row">
                    <div className="col-md-8">
                        <TextInput
                            type="password"
                            id="old_pass"
                            label="Old Password"
                            name="old-password"
                            onChange={handleChange}
                            value={update.old_password}
                            autoComplete="current-password"
                        />
                        <TextInput
                            type="password"
                            id="new_pass"
                            label="New Password"
                            status={status}
                            name="new-password"
                            onChange={handleChange}
                            value={update.new_password}
                            autoComplete="current-password"
                        />
                        <TextInput
                            type="password"
                            id="confirm_pass"
                            label="Confirm Password"
                            status={status}
                            name="confirm-new-password"
                            onChange={handleChange}
                            value={update.confirm_password}
                            autoComplete="current-password"
                        />
                        <button
                            style={{ borderRadius: "10px" }}
                            className="btn btn-block text-white auth__bg__dark"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdatePassword;
