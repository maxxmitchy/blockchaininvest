import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "react-query";

const ProtectedRoutes = ({ component: Component, isAdmin, ...rest }) => {
    const isVerified = async () => {
        const data = await axios.get("/api/email/verify");
        return data;
    };

    const userLogout = async () => {
        await axios.get("/sanctum/csrf-cookie").then(response => {
            return axios.post("/api/logout").then(res => {
                localStorage.removeItem("token");
                location.href = "/login";
            });
        });
    };

    const { data } = useQuery("login", isVerified);

    const { isSuccess, refetch } = useQuery("logout", userLogout, {
        enabled: data?.data.user === null && localStorage.getItem("token")
    });

    // if (isAdmin !== undefined && isVerified !== "") {
    //     if (isAdmin != role) {
    //         return <Redirect to="/dashboard" />;
    //     }
    // }

    return (
        <Route
            {...rest}
            render={props => {
                if (
                    !data?.data.verified &&
                    (!localStorage.getItem("token") ||
                        !localStorage.getItem("token").length === 244)
                ) {
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

                if (data?.data.verified !== "") {
                    switch (data?.data.verified) {
                        case true:
                            return (
                                <Component transactions={data?.data.transactions} user={data?.data.user} {...props} />
                            );
                        case false:
                            return <Redirect to="/verifyEmail" />;
                    }
                }
            }}
        />
    );
};

export default ProtectedRoutes;
