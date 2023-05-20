import { useState, useEffect } from 'react';

import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import USStates from "../../data/USStates.json";


function StateLayer(props) {
    const [ displayDistricts, setDisplayDistricts ] = useState(props.displayDistricts);

    useEffect(() => {
        setDisplayDistricts(props.displayDistricts);
    }, [props]);

    const setFillColor = (state) => {
        let stateColor = 0;
        state.properties.senators.forEach(senator => {
            if (senator.party === "Republican") {
                stateColor -= 1;
            } else if (senator.party === "Democratic") {
                stateColor += 1;
            }
        });

        if (stateColor > 0) {
            return "#186CEA";
        } else if (stateColor < 0) {
            return "#E60606";
        } else {
            return "#A70DC6";  
        }
    };


    const onEachState = (state, layer) => {
        layer.setStyle({
            fillColor: setFillColor(state),
            fillOpacity: .75,
            color: "black",
            weight: .5
        });

        layer.on({
            mouseover: (event) => {
                props.setCurrentHover(state.properties);
            }
        });
    };

    return (
        <>
            { !displayDistricts ? <GeoJSON data={USStates.features} onEachFeature={onEachState} /> : null }
        </>
    );
};  

export default StateLayer;