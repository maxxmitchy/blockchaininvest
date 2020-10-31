import React, { useEffect, useRef, useState } from "react";
import { select, line } from "d3";
import Axios from "axios";
import { round } from "lodash";

const SvgRep = () => {
    const [cryptodata, setCryptodata] = useState([]);

    const svgRef = useRef();

    useEffect(() => {
        Axios.get("api/endpoint").then(res => {
            setCryptodata(res.data[0].prices);
        });
    }, []);

    useEffect(() => {
        const svg = select(svgRef.current);
        if (cryptodata?.length) {
            const myLine = line()
                .x((value, index) => index)
                .y(value => value);
            svg.selectAll("path")
                .data([cryptodata])
                .join("path")
                .attr("d", value =>
                    myLine(
                        value.map(function(x) {
                            console.log(round(Number(x)));
                            return round(Number(x / 50));
                        })
                    )
                )
                .attr("fill", "none")
                .attr("stroke", "orangered");
        }
    }, [cryptodata]);
    return (
        <svg
            ref={svgRef}
            className="mx-3 mb-3 border-0 mx-md-0 rounded-0 chart__card btc__eth__chart"
        ></svg>
    );
};

export default SvgRep;
