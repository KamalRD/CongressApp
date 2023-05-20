import React from "react";

import Navbar from "../navbar/Navbar";
import Histogram from "../histogram/SponsoredBillHistogram";

function HomePage() {
    const data = [5, 10, 15, 20, 25];
    const width = 300;
    const height = 200;
    const barColor = 'steelblue';

    return (
        <>
            <Navbar></Navbar>
            <Histogram data={data} width={width} height={height} barColor={barColor}></Histogram>
        </>
    );
}

export default HomePage;