import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import { Route, Switch, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import About from "./components/HomePage/About";
import ProtectedRoutes from "./components/Auth/ProtectedRoute";
import User from "./components/User/User";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Profile from "./components/User/Profile";

function Index() {
    return (
        <React.Fragment>
            <HomePage />
        </React.Fragment>
    );
}

export default Index;

if (document.getElementById("index")) {
    ReactDOM.render(
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/login" exact component={Auth}></Route>
                <Route path="/register" exact component={Auth}></Route>
                <Route path="/about-us" exact component={About}></Route>
                <ProtectedRoutes
                    path="/dashboard"
                    location="/dashboard"
                    exact
                    component={User}
                ></ProtectedRoutes>
                <ProtectedRoutes
                    path="/profile"
                    exact
                    component={User}
                ></ProtectedRoutes>
                <ProtectedRoutes
                    path="/deposit"
                    location="/deposit"
                    exact
                    component={User}
                ></ProtectedRoutes>
                <Route
                    path="/verifyEmail"
                    exact
                    component={VerifyEmail}
                ></Route>
            </Switch>
        </Router>,
        document.getElementById("index")
    );
}
