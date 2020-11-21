import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUserData from "../customHooks/useUserData";

const ProtectedRoutes = ({ component: Component, isAdmin, ...rest }) => {
    let verification = useUserData();

    const userLogout = async () => {
        await axios.get("/sanctum/csrf-cookie").then(response => {
            return axios.post("/api/logout").then(res => {
                localStorage.removeItem("token");
                location.href = "/login";
            });
        });
    };

    return (
        <Route
            {...rest}
            render={props => {
                if (!verification?.verified && !localStorage.getItem("token")) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                if (verification?.verified !== "") {
                    switch (verification?.verified) {
                        case true:
                            return (
                                <Component
                                    transactions={verification?.transactions}
                                    user={verification?.user}
                                    allTransactions={
                                        verification?.allTransactions
                                    }
                                    {...props}
                                />
                            );
                        case false:
                            return <Redirect to="/verifyEmail" />;
                    }
                }
                if (verification?.verify === null) userLogout();
            }}
        />
    );
};

export default ProtectedRoutes;
