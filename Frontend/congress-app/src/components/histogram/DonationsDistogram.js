import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';

import "./donationHistogram.css";

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );


function DonationsHistogram(props) {
    const [ histogramDataset, setHistogramDataset ] = useState({});
    const historgramLabels = ["$0 - $100", "$100 - $500", "$500 - $1000", "$1000 - $2000", "$2000 - $3000", "$3000 - $4000", "$4000 - $5000", "$5000+"];
    const [ histogramData, setHistogramData ] = useState([]); 
    const [ histogramOptions, setHistogramOptions ] = useState({});
    const [ shouldRender, setShouldRender] = useState(false);

    
    const convertMajorKey = (originalKey) => {
        if (originalKey === "individualContributions") {
            return "Individuals";
        } else if (originalKey === "pacContributions") {
            return "PACs";
        } else if (originalKey === "otherCommittees") {
            return "OtherCommittees";
        } else {
            return "Candidate";
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldRender(true);  
        }, 2000);
      
        const dataset = {
            Individuals: [],
            PACs: [],
            OtherCommittees: [],
            Candidate: []
        }
        for (let [key, majorValue] of Object.entries(props.funding)) {
            let formattedKey = convertMajorKey(key);
            for (let [key, value] of Object.entries(majorValue)) {
                dataset[formattedKey].push(value.count);
            }
        }
        setHistogramDataset(dataset);
        
        const data = {
            labels: historgramLabels,
            datasets: [
                {
                    label: "Individuals",
                    data: histogramDataset.Individuals,
                    backgroundColor: "#0B3954"
                },
                {
                    label: "PACs",
                    data: histogramDataset["PACs"],
                    backgroundColor: "#FF4B3E"
                },
                {
                    label: "Other Committees",
                    data: histogramDataset["OtherCommittees"],
                    backgroundColor: "#FFC857"
                },
                {
                    label: "Candidate",
                    data: histogramDataset["Candidate"],
                    backgroundColor: "#A60067"
                },
            ],
        };
        
        const options = {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Donation Amount",
                        color: "white",
                        font: {
                            size: "16px",
                        }
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Quantity",
                        color: "white",
                        font: {
                            size: "16px",
                        }
                    },
                },
            },
        };
        
        setHistogramData(data);
        setHistogramOptions(options);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [props])

    return (
        <>
            { shouldRender ? 
            <div className="histogramContainer">
                <Bar data={histogramData} options={histogramOptions}></Bar>
            </div>
            : null }
        </>
    )
}

export default DonationsHistogram;