import React, { useEffect, useState } from "react";

import "./sponsoredBillHistogram.css";

function SponsoredBillHistogram(props) {
    const [ billFrequencies, setBillFrequencies ] = useState([]);
    const [ billSubjects, setBillSubjects ] = useState([]);
    const [ maxValue, setMaxValue ] = useState(0);
    const [ barWidth, setBarWidth ] = useState(0);
    const [ yAxisValues, setYAxisValues ] = useState([]);
    const [ sponsoredPopupText, setSponsoredPopupText ] = useState("");

    useEffect(() => {
        const billValues = [];
        const billSubjects = [];
       
        for (let [key, value] of Object.entries(props.data)) {
            billSubjects.push(key);
            billValues.push(value);
        }

        setBillFrequencies(billValues);
        setBillSubjects(billSubjects);
        
        setMaxValue(Math.max(...billFrequencies));
        setBarWidth(props.width / billFrequencies.length);
        setYAxisValues([maxValue, 3 * maxValue / 4, maxValue / 2, maxValue / 4, 0]);
    }, [props, billFrequencies, maxValue]);

    
    const handleMouseEnter = (event) => {
        setSponsoredPopupText(`${event.target.getAttribute("title")}: ${event.target.getAttribute("value")}`);
    }


    return (
        <div className="sponsoredContainer">
            <div className="sponsoredGraph">
                <div className="sponsoredHeader">
                    <h3>Sponsored Bills</h3>
                </div>
                <div className="sponsoredBody">
                    <svg width={props.width} height={props.height}>
                        {yAxisValues.map((value, i) => {
                            const y = (i / 4) * props.height;
                            
                            return (
                                <g key={i}>
                                    <line x1="0" y1={y} x2={props.width} y2={y} stroke="gray" />
                                    <text x="-30" y={y + 5} textAnchor="end" fill="gray">
                                    {value}
                                    </text>
                                </g>
                            );
                        })}
                        {billFrequencies.map((value, i) => {
                            const barHeight = (value / maxValue) * props.height;
                            const x = i * barWidth;
                            const y = props.height - barHeight;
                            
                            return (
                                <g key={i}>
                                    <rect onMouseEnter={handleMouseEnter} value={value} key={i} x={x + 2} y={y} width={barWidth - 4} height={barHeight} fill={props.barColor} stroke="black" title={billSubjects[i]}></rect>
                                </g>
                            )
                        })}
                    </svg>
                </div>
            </div>
            <div className="sponsoredPopup">
                <h3>{sponsoredPopupText}</h3>
            </div>
        </div>
    )
}

export default SponsoredBillHistogram;