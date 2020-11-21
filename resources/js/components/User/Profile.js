import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import UpdatePassword from "./partials/UpdatePassword";
import UpdateProfile from "./partials/UpdateProfile";
import "./users.css";

const Profile = () => {
    const [update, setUpdate] = useState({
        component: <UpdateProfile />,
        title:"profile-update",
    });
    return (
        <div className="my-4 mx-2">
            <div className="d-flex">
                <button
                    onClick={() =>
                        setUpdate({
                            ...update,
                            title: "profile-update",
                            component: <UpdateProfile />
                        })
                    }
                    className={`btn  light__primary__bg mb-3 mr-3 ${
                        update.title === "profile-update" ? "activeBorder" : ""
                    }`}
                >
                    Profile <AiOutlineEdit />
                </button>
                <button
                    onClick={() =>
                        setUpdate({
                            ...update,
                            title: "password-update",
                            component: <UpdatePassword />
                        })
                    }
                    className={`btn light__primary__bg mb-3 ${
                        update.title === "password-update" ? "activeBorder" : ""
                    }`}
                >
                    Password <AiOutlineEdit />
                </button>
            </div>
            <br/>
            {update.component}
        </div>
    );
};

export default Profile;
