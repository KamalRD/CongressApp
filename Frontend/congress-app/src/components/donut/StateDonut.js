import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "./stateDonut.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart(props) {
    const [ chartDataset, setChartDataset ] = useState([]);
    const [ chartLabels, setChartLabels ] = useState([]);
    const [ totalDonationAmount, setTotalDonationAmount ] = useState(0);

    const numberWithCommas = (x) => {
        if (x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    const convertKey = (originalKey) => {
        if (originalKey === "individualContributions") {
            return "Individuals";
        } else if (originalKey === "pacContributions") {
            return "PACs";
        } else if (originalKey === "otherContributions") {
            return "Other Committees";
        } else {
            return "Candidate";
        }
    }

    useEffect(() => {
        if (props.funding) {
            const tempChartData = [];
            const tempChartLabels = [];
            for (let [key, value] of Object.entries(props.funding)) {
                if (key !== "total") {
    
                    tempChartData.push(value.amount);
                    tempChartLabels.push(convertKey(key));
                } else {
                    setTotalDonationAmount(value.amount);
                }
            }
            setChartDataset(tempChartData);
            setChartLabels(tempChartLabels);
            
        }
    }, [props]);
    
    const data = {
        labels: chartLabels,
        datasets: [
            {
            data: chartDataset,
            backgroundColor: ['#0B3954', '#FF4B3E', '#FFC857', '#A60067' ],
            hoverBackgroundColor: ['#0B3954', '#FF4B3E', '#FFC857', '#A60067' ],
            },
        ],
    };
        
    const options = {
        maintainAspectRatio: true,
    };

    return (
        <div className="donutContainer">
            <Doughnut data={data} options={options}></Doughnut>
            <h3>Total Raised: ${numberWithCommas(totalDonationAmount)}</h3>
        </div>
    );
}

export default DonutChart;
