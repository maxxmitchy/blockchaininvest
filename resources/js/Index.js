import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import { Route, Switch, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import About from "./components/HomePage/About";
import ProtectedRoutes from "./components/Auth/ProtectedRoute";
import Dashboard from "./components/User/Dashboard";
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
                    exact
                    component={Dashboard}
                ></ProtectedRoutes>
                <ProtectedRoutes
                    path="/user-profile"
                    exact
                    component={Dashboard}
                ></ProtectedRoutes>
                <ProtectedRoutes
                    path="/deposit"
                    exact
                    component={Dashboard}
                ></ProtectedRoutes>
                <ProtectedRoutes
                    path="/product/fixed-earning"
                    exact
                    component={Dashboard}
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
