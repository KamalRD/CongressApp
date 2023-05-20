import { useState, useEffect } from 'react';

import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import CongressionalDistricts from "../../data/117thCongressionalDistricts.json";


function DistrictLayer(props) {
    const [ displayDistricts, setDisplayDistricts ] = useState(props.displayDistricts);

    useEffect(() => {
        setDisplayDistricts(props.displayDistricts);
    }, [props]);

    const setFillColor = (district) => {
        let representativeParty = district.properties.member.party;
        if (representativeParty === "Democratic") {
            return "#186CEA";
        } else if (representativeParty === "Republican") {
            return "#E60606";
        } else {
            return "#A70DC6";  
        }
    }

    const onEachDistrict = (district, layer) => {
        layer.setStyle({
            fillColor: setFillColor(district),
            fillOpacity: .75,
            color: "rgb(2, 2, 2)",
            weight: 2,
            dashArray: 5
        });

        layer.on({
            mouseover: (event) => {
                props.setCurrentHover(district.properties);
            }
        })
    };

    return (
        <>
            { displayDistricts ? <GeoJSON data={CongressionalDistricts.features} onEachFeature={onEachDistrict} /> : null }
        </>
    );
};  

export default DistrictLayer;