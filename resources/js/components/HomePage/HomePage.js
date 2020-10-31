import React from "react";
import Hero from "./partials/Hero";
import Stats from "./partials/Stats";
import Body from "./partials/Body";
import Footer from "./partials/Footer";

const HomePage = () => {
    return (
        <div className="container mt-5 py-5">
            <Hero />
            <Stats />
            <Body />
            <br/>
            <br/>
            <br/>
            <Footer/>
        </div>
    );
};

export default HomePage;
